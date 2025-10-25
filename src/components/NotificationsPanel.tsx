import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, Calendar, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "projeto",
    title: "Novo projeto adicionado",
    message: "PL 127/2025 sobre Transporte Público foi cadastrado",
    time: "há 10 min",
    icon: FileText,
    unread: true,
  },
  {
    id: 2,
    type: "sessao",
    title: "Sessão agendada",
    message: "Sessão Extraordinária marcada para 29/10/2025",
    time: "há 2 horas",
    icon: Calendar,
    unread: true,
  },
  {
    id: 3,
    type: "alerta",
    title: "Prazo se aproximando",
    message: "PL 123/2025 precisa de parecer até 30/10/2025",
    time: "há 5 horas",
    icon: AlertCircle,
    unread: false,
  },
];

export function NotificationsPanel() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notificações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`flex gap-3 rounded-lg p-3 transition-smooth hover:bg-muted/50 ${
                notification.unread ? "bg-primary/5 border-l-2 border-l-primary" : ""
              }`}
            >
              <div className={`rounded-lg p-2 ${notification.unread ? "bg-primary/10" : "bg-muted"}`}>
                <Icon className={`h-4 w-4 ${notification.unread ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              
              {notification.unread && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
