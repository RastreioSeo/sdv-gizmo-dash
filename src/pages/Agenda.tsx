import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Filter, Download, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Evento {
  id: string | number;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  tipo: string;
  status: string;
  descricao?: string;
  link?: string;
}

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      titulo: "Sessão Ordinária",
      data: "23/12/2024",
      hora: "09:00",
      local: "Plenário Principal",
      tipo: "Sessão",
      status: "Confirmado"
    },
    {
      id: 2,
      titulo: "Reunião com Secretário de Obras",
      data: "24/12/2024",
      hora: "14:00",
      local: "Sala de Reuniões",
      tipo: "Reunião",
      status: "Pendente"
    },
    {
      id: 3,
      titulo: "Audiência Pública - Mobilidade",
      data: "27/12/2024",
      hora: "10:00",
      local: "Auditório",
      tipo: "Audiência",
      status: "Confirmado"
    },
    {
      id: 4,
      titulo: "Visita ao Bairro São José",
      data: "28/12/2024",
      hora: "15:00",
      local: "Bairro São José",
      tipo: "Visita",
      status: "Confirmado"
    }
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  const tipoColors = {
    "Sessão": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    "Reunião": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    "Audiência": "bg-green-500/10 text-green-700 dark:text-green-400",
    "Visita": "bg-orange-500/10 text-orange-700 dark:text-orange-400"
  };

  const statusColors = {
    "Confirmado": "bg-green-500/10 text-green-700 dark:text-green-400",
    "Pendente": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
  };

  // Função para sincronizar com Google Calendar
  const handleGoogleCalendarSync = async () => {
    setIsSyncing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('sync-google-calendar');
      
      if (error) {
        console.error("Erro ao sincronizar:", error);
        toast({
          title: "Erro na sincronização",
          description: "Não foi possível sincronizar com Google Calendar. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      if (data?.success && data?.eventos) {
        setEventos(data.eventos);
        toast({
          title: "Sincronização concluída",
          description: `${data.eventos.length} eventos foram sincronizados do Google Calendar.`,
        });
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
      toast({
        title: "Erro na sincronização",
        description: "Ocorreu um erro ao sincronizar com Google Calendar.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Filtra eventos pela data selecionada
  const eventosDoDia = selectedDate
    ? eventos.filter((evento) => {
        const [dia, mes, ano] = evento.data.split("/");
        const eventoDate = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        return (
          eventoDate.getDate() === selectedDate.getDate() &&
          eventoDate.getMonth() === selectedDate.getMonth() &&
          eventoDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : eventos;

  // Destaca datas com eventos no calendário
  const datasComEventos = eventos.map((evento) => {
    const [dia, mes, ano] = evento.data.split("/");
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  });

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Agenda</h1>
            <p className="text-muted-foreground">Gerencie suas sessões, reuniões e compromissos</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={handleGoogleCalendarSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Sincronizar Google Calendar
                </>
              )}
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Evento
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Calendário</CardTitle>
              <CardDescription>
                Selecione uma data para ver os eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ptBR}
                className="rounded-md border"
                modifiers={{
                  evento: datasComEventos,
                }}
                modifiersStyles={{
                  evento: {
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="todos" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="sessoes">Sessões</TabsTrigger>
                  <TabsTrigger value="reunioes">Reuniões</TabsTrigger>
                  <TabsTrigger value="eventos">Eventos</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </div>

              <TabsContent value="todos" className="space-y-4">
                {eventosDoDia.length === 0 ? (
                  <Card>
                    <CardContent className="p-12">
                      <p className="text-center text-muted-foreground">
                        Nenhum evento agendado para{" "}
                        {selectedDate?.toLocaleDateString("pt-BR")}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  eventosDoDia.map((evento) => (
                  <Card key={evento.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{evento.titulo}</h3>
                              <Badge className={tipoColors[evento.tipo as keyof typeof tipoColors]}>
                                {evento.tipo}
                              </Badge>
                              <Badge className={statusColors[evento.status as keyof typeof statusColors]}>
                                {evento.status}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{evento.data}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{evento.hora}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{evento.local}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="sessoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Sessões Agendadas</CardTitle>
                    <CardDescription>Todas as sessões legislativas programadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">Filtro aplicado: Sessões</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reunioes">
                <Card>
                  <CardHeader>
                    <CardTitle>Reuniões Agendadas</CardTitle>
                    <CardDescription>Todas as reuniões programadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">Filtro aplicado: Reuniões</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eventos">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Especiais</CardTitle>
                    <CardDescription>Audiências públicas, visitas e eventos especiais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">Filtro aplicado: Eventos</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Agenda;
