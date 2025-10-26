import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, MinusCircle, Vote } from 'lucide-react';
import { useVotingSession } from '@/hooks/useVotingSession';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface VotingSessionProps {
  sessionId: string;
}

const COLORS = {
  favor: 'hsl(var(--chart-1))',
  contra: 'hsl(var(--chart-2))',
  abstencao: 'hsl(var(--chart-3))',
};

export function VotingSession({ sessionId }: VotingSessionProps) {
  const { session, userVote, results, loading, castVote } = useVotingSession(sessionId);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Carregando...</p>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Sessão não encontrada</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { name: 'A Favor', value: results.favor, color: COLORS.favor },
    { name: 'Contra', value: results.contra, color: COLORS.contra },
    { name: 'Abstenção', value: results.abstencao, color: COLORS.abstencao },
  ].filter(item => item.value > 0);

  const isSessionOpen = session.status === 'aberta';

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                {session.titulo}
              </CardTitle>
              {session.descricao && (
                <p className="text-sm text-muted-foreground mt-2">{session.descricao}</p>
              )}
            </div>
            <Badge variant={isSessionOpen ? 'default' : 'secondary'}>
              {isSessionOpen ? 'Aberta' : 'Encerrada'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Botões de Votação */}
          {isSessionOpen && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => castVote('favor')}
                variant={userVote?.voto === 'favor' ? 'default' : 'outline'}
                className="flex-1 gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                A Favor
              </Button>
              <Button
                onClick={() => castVote('contra')}
                variant={userVote?.voto === 'contra' ? 'default' : 'outline'}
                className="flex-1 gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                Contra
              </Button>
              <Button
                onClick={() => castVote('abstencao')}
                variant={userVote?.voto === 'abstencao' ? 'default' : 'outline'}
                className="flex-1 gap-2"
              >
                <MinusCircle className="h-4 w-4" />
                Abstenção
              </Button>
            </div>
          )}

          {userVote && (
            <div className="text-center text-sm text-muted-foreground">
              Seu voto: <span className="font-semibold capitalize">{userVote.voto.replace('_', ' ')}</span>
            </div>
          )}

          {/* Resultados em Números */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1 p-4 rounded-lg bg-card border">
              <div className="text-2xl font-bold text-chart-1">{results.favor}</div>
              <div className="text-xs text-muted-foreground">A Favor</div>
            </div>
            <div className="text-center space-y-1 p-4 rounded-lg bg-card border">
              <div className="text-2xl font-bold text-chart-2">{results.contra}</div>
              <div className="text-xs text-muted-foreground">Contra</div>
            </div>
            <div className="text-center space-y-1 p-4 rounded-lg bg-card border">
              <div className="text-2xl font-bold text-chart-3">{results.abstencao}</div>
              <div className="text-xs text-muted-foreground">Abstenção</div>
            </div>
          </div>

          {/* Gráfico de Pizza */}
          {results.total > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum voto registrado ainda
            </div>
          )}

          {/* Total de Votos */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Total de votos: <span className="font-semibold">{results.total}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
