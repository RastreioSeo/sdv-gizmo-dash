import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const sessions = [
  {
    id: 1,
    title: "Sessão Ordinária",
    date: "2025-10-28",
    time: "14:00",
    location: "Plenário Principal",
    status: "confirmada",
  },
  {
    id: 2,
    title: "Sessão Extraordinária",
    date: "2025-10-29",
    time: "09:00",
    location: "Sala de Reuniões",
    status: "pendente",
  },
  {
    id: 3,
    title: "Audiência Pública",
    date: "2025-11-02",
    time: "16:00",
    location: "Auditório",
    status: "confirmada",
  },
];

const statusConfig = {
  confirmada: { label: "Confirmada", variant: "default" as const },
  pendente: { label: "Pendente", variant: "secondary" as const },
  cancelada: { label: "Cancelada", variant: "destructive" as const },
};

export function SessionsList() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Próximas Sessões
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-smooth hover:shadow-md"
          >
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="text-xs font-medium">
                {new Date(session.date).toLocaleDateString("pt-BR", { day: "2-digit" })}
              </span>
              <span className="text-[10px] uppercase">
                {new Date(session.date).toLocaleDateString("pt-BR", { month: "short" })}
              </span>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold">{session.title}</h4>
                <Badge variant={statusConfig[session.status as keyof typeof statusConfig].variant}>
                  {statusConfig[session.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {session.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {session.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
