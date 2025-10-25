import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Send, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Comunicacao = () => {
  const mensagensRecentes = [
    {
      id: 1,
      remetente: "João Silva",
      assunto: "Solicitação de reunião",
      mensagem: "Gostaria de agendar uma reunião sobre o projeto de mobilidade...",
      data: "Hoje, 14:30",
      lida: false
    },
    {
      id: 2,
      remetente: "Maria Santos",
      assunto: "Agradecimento",
      mensagem: "Obrigada pelo apoio ao projeto de educação ambiental...",
      data: "Ontem, 16:20",
      lida: true
    },
    {
      id: 3,
      remetente: "Pedro Costa",
      assunto: "Dúvida sobre projeto",
      mensagem: "Tenho algumas dúvidas sobre o PL 003/2024...",
      data: "22/12/2024",
      lida: true
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comunicação com Eleitores</h1>
          <p className="text-muted-foreground">Gerencie toda a comunicação com seus eleitores</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Recebidas</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+15 esta semana</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+8 esta semana</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+52 este mês</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inbox" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inbox">Caixa de Entrada</TabsTrigger>
            <TabsTrigger value="sent">Enviadas</TabsTrigger>
            <TabsTrigger value="compose">Nova Mensagem</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens Recebidas</CardTitle>
                <CardDescription>Todas as mensagens dos seus eleitores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mensagensRecentes.map((msg) => (
                    <Card key={msg.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!msg.lida ? 'border-primary/50 bg-primary/5' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3 flex-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <MessageSquare className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{msg.remetente}</p>
                                {!msg.lida && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                              </div>
                              <p className="text-sm font-medium mb-1">{msg.assunto}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{msg.mensagem}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.data}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens Enviadas</CardTitle>
                <CardDescription>Histórico de mensagens enviadas aos eleitores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Nenhuma mensagem enviada ainda</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Nova Mensagem</CardTitle>
                <CardDescription>Envie uma mensagem para seus eleitores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="destinatario">Destinatário</Label>
                  <Input id="destinatario" placeholder="Digite o nome ou email do eleitor" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input id="assunto" placeholder="Assunto da mensagem" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea id="mensagem" placeholder="Digite sua mensagem..." rows={6} />
                </div>
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline">Salvar Rascunho</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Comunicacao;
