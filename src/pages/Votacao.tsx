import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { VotingSession } from '@/components/VotingSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VotingSessionData {
  id: string;
  titulo: string;
  status: string;
  created_at: string;
}

const Votacao = () => {
  const [sessions, setSessions] = useState<VotingSessionData[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessoes_votacao')
        .select('id, titulo, status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSessions(data || []);
      
      // Selecionar primeira sessão aberta ou a mais recente
      if (data && data.length > 0) {
        const openSession = data.find(s => s.status === 'aberta');
        setSelectedSession(openSession?.id || data[0].id);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as sessões de votação',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Votação</h1>
          <p className="text-muted-foreground">
            Participe das votações e acompanhe os resultados em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lista de Sessões */}
          <Card className="lg:col-span-1 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Sessões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma sessão disponível</p>
              ) : (
                sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                      selectedSession === session.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card hover:bg-accent border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.titulo}</p>
                        <p className="text-xs opacity-80 mt-1">
                          {new Date(session.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {session.status === 'aberta' && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                          Aberta
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Sessão Selecionada */}
          <div className="lg:col-span-3">
            {selectedSession ? (
              <VotingSession sessionId={selectedSession} />
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Vote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione uma sessão para visualizar e votar</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Votacao;
