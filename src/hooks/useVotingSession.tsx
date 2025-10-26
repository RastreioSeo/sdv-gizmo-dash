import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VotingSession {
  id: string;
  titulo: string;
  descricao: string | null;
  projeto_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  encerrada_em: string | null;
}

export interface Vote {
  id: string;
  sessao_id: string;
  user_id: string;
  voto: 'favor' | 'contra' | 'abstencao';
  created_at: string;
  updated_at: string;
}

export interface VoteResults {
  favor: number;
  contra: number;
  abstencao: number;
  total: number;
}

export const useVotingSession = (sessionId: string | null) => {
  const [session, setSession] = useState<VotingSession | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<VoteResults>({
    favor: 0,
    contra: 0,
    abstencao: 0,
    total: 0,
  });
  const { toast } = useToast();

  // Calcular resultados
  useEffect(() => {
    const newResults = {
      favor: votes.filter(v => v.voto === 'favor').length,
      contra: votes.filter(v => v.voto === 'contra').length,
      abstencao: votes.filter(v => v.voto === 'abstencao').length,
      total: votes.length,
    };
    setResults(newResults);
  }, [votes]);

  // Carregar dados iniciais
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // Buscar sessão
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessoes_votacao')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (sessionError) throw sessionError;
        setSession(sessionData);

        // Buscar votos
        const { data: votesData, error: votesError } = await supabase
          .from('votos')
          .select('*')
          .eq('sessao_id', sessionId);

        if (votesError) throw votesError;
        setVotes((votesData || []) as Vote[]);

        // Buscar voto do usuário
        if (user) {
          const myVote = votesData?.find(v => v.user_id === user.id);
          setUserVote((myVote || null) as Vote | null);
        }
      } catch (error) {
        console.error('Error fetching voting data:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados da votação',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, toast]);

  // Realtime subscriptions
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel('voting-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votos',
          filter: `sessao_id=eq.${sessionId}`,
        },
        async (payload) => {
          console.log('Vote change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setVotes(prev => [...prev, payload.new as Vote]);
          } else if (payload.eventType === 'UPDATE') {
            setVotes(prev => prev.map(v => v.id === payload.new.id ? payload.new as Vote : v));
          } else if (payload.eventType === 'DELETE') {
            setVotes(prev => prev.filter(v => v.id !== payload.old.id));
          }

          // Atualizar voto do usuário
          const { data: { user } } = await supabase.auth.getUser();
          if (user && (payload.new as Vote)?.user_id === user.id) {
            setUserVote(payload.new as Vote);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sessoes_votacao',
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          console.log('Session change:', payload);
          setSession(payload.new as VotingSession);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const castVote = async (voto: 'favor' | 'contra' | 'abstencao') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      if (userVote) {
        // Atualizar voto existente
        const { error } = await supabase
          .from('votos')
          .update({ voto })
          .eq('id', userVote.id);

        if (error) throw error;
      } else {
        // Criar novo voto
        const { error } = await supabase
          .from('votos')
          .insert({
            sessao_id: sessionId,
            user_id: user.id,
            voto,
          });

        if (error) throw error;
      }

      toast({
        title: 'Voto registrado',
        description: 'Seu voto foi registrado com sucesso',
      });
    } catch (error: any) {
      console.error('Error casting vote:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível registrar seu voto',
        variant: 'destructive',
      });
    }
  };

  return {
    session,
    votes,
    userVote,
    results,
    loading,
    castVote,
  };
};
