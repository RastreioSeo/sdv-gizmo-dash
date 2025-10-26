import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, X, Minus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Projeto {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string | null;
  created_at: string;
}

interface Votacao {
  id: string;
  voto: string;
  justificativa: string | null;
}

interface ResultadosVotacao {
  favor: number;
  contra: number;
  abstencao: number;
}

const ProjetoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [meuVoto, setMeuVoto] = useState<Votacao | null>(null);
  const [justificativa, setJustificativa] = useState("");
  const [resultados, setResultados] = useState<ResultadosVotacao>({
    favor: 0,
    contra: 0,
    abstencao: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProjeto();
    fetchMeuVoto();
    fetchResultados();

    // Realtime para votações
    const channel = supabase
      .channel('votacoes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votacoes',
          filter: `projeto_id=eq.${id}`,
        },
        () => {
          fetchResultados();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const fetchProjeto = async () => {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProjeto(data);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar o projeto',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMeuVoto = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('votacoes' as any)
        .select('*')
        .eq('projeto_id', id)
        .eq('vereador_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setMeuVoto(data as unknown as Votacao);
        setJustificativa((data as any).justificativa || '');
      }
    } catch (error: any) {
      console.error('Erro ao buscar voto:', error);
    }
  };

  const fetchResultados = async () => {
    try {
      const { data, error } = await supabase
        .from('votacoes' as any)
        .select('voto')
        .eq('projeto_id', id);

      if (error) throw error;

      const votos = ((data || []) as unknown) as { voto: string }[];
      const resultados = {
        favor: votos.filter(v => v.voto === 'favor').length,
        contra: votos.filter(v => v.voto === 'contra').length,
        abstencao: votos.filter(v => v.voto === 'abstencao').length,
      };

      setResultados(resultados);
    } catch (error: any) {
      console.error('Erro ao buscar resultados:', error);
    }
  };

  const registrarVoto = async (tipoVoto: 'favor' | 'contra' | 'abstencao') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Erro',
          description: 'Você precisa estar autenticado',
          variant: 'destructive',
        });
        return;
      }

      if (meuVoto) {
        // Atualizar voto existente
        const { error } = await supabase
          .from('votacoes' as any)
          .update({
            voto: tipoVoto,
            justificativa: justificativa || null,
          })
          .eq('id', meuVoto.id);

        if (error) throw error;
      } else {
        // Criar novo voto
        const { error } = await supabase
          .from('votacoes' as any)
          .insert({
            projeto_id: id,
            vereador_id: user.id,
            voto: tipoVoto,
            justificativa: justificativa || null,
          });

        if (error) throw error;
      }

      toast({
        title: 'Voto registrado',
        description: 'Seu voto foi registrado com sucesso',
      });

      fetchMeuVoto();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível registrar o voto',
        variant: 'destructive',
      });
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'default';
      case 'em_analise':
        return 'secondary';
      case 'rejeitado':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em_analise':
        return 'Em Análise';
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <p>Carregando...</p>
        </main>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <p>Projeto não encontrado</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/projetos')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{projeto.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Criado em {new Date(projeto.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Badge variant={getStatusVariant(projeto.status || '')}>
                {getStatusLabel(projeto.status || '')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {projeto.descricao && (
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{projeto.descricao}</p>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Registrar Voto</h3>
              
              {meuVoto && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    Você já votou: <strong>{meuVoto.voto === 'favor' ? 'A Favor' : meuVoto.voto === 'contra' ? 'Contra' : 'Abstenção'}</strong>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Button
                  size="lg"
                  className="h-20 gap-3 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => registrarVoto('favor')}
                >
                  <Check className="h-6 w-6" />
                  A Favor
                </Button>
                <Button
                  size="lg"
                  className="h-20 gap-3 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => registrarVoto('contra')}
                >
                  <X className="h-6 w-6" />
                  Contra
                </Button>
                <Button
                  size="lg"
                  className="h-20 gap-3 bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => registrarVoto('abstencao')}
                >
                  <Minus className="h-6 w-6" />
                  Abstenção
                </Button>
              </div>

              <div>
                <Label htmlFor="justificativa">Justificativa (opcional)</Label>
                <Textarea
                  id="justificativa"
                  placeholder="Digite a justificativa do seu voto..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Resultado da Votação</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      A Favor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{resultados.favor}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Contra
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">{resultados.contra}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Abstenção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{resultados.abstencao}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjetoDetalhes;
