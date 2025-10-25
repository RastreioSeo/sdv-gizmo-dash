import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { SessionsList } from "@/components/SessionsList";
import { ProjectsList } from "@/components/ProjectsList";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { FileText, Calendar, ClipboardList, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao Sistema de Gestão Legislativa</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Projetos Ativos"
            value={24}
            icon={FileText}
            trend={{ value: "+3 este mês", positive: true }}
            variant="primary"
          />
          <StatCard
            title="Sessões Esta Semana"
            value={5}
            icon={Calendar}
            trend={{ value: "2 concluídas", positive: true }}
            variant="default"
          />
          <StatCard
            title="Demandas Pendentes"
            value={18}
            icon={ClipboardList}
            trend={{ value: "-4 esta semana", positive: true }}
            variant="warning"
          />
          <StatCard
            title="Taxa de Presença"
            value="87%"
            icon={UserCheck}
            trend={{ value: "+5%", positive: true }}
            variant="success"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProjectsList />
            <SessionsList />
          </div>
          
          <div className="space-y-6">
            <NotificationsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
