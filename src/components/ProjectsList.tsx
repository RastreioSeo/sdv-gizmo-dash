import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, User } from "lucide-react";

const projects = [
  {
    id: "PL 123/2025",
    title: "Projeto de Lei sobre Mobilidade Urbana",
    author: "Vereador João Silva",
    status: "em_analise",
    priority: "alta",
    date: "2025-10-20",
  },
  {
    id: "PL 124/2025",
    title: "Alteração no Plano Diretor",
    author: "Vereadora Maria Santos",
    status: "aprovado",
    priority: "media",
    date: "2025-10-18",
  },
  {
    id: "PL 125/2025",
    title: "Criação de Área de Preservação",
    author: "Vereador Carlos Mendes",
    status: "em_votacao",
    priority: "alta",
    date: "2025-10-15",
  },
  {
    id: "PL 126/2025",
    title: "Incentivos Fiscais para Empresas",
    author: "Vereadora Ana Costa",
    status: "em_analise",
    priority: "baixa",
    date: "2025-10-12",
  },
];

const statusConfig = {
  em_analise: { label: "Em Análise", variant: "secondary" as const, className: "" },
  em_votacao: { label: "Em Votação", variant: "default" as const, className: "" },
  aprovado: { label: "Aprovado", variant: "default" as const, className: "bg-green-100 text-green-700 hover:bg-green-100" },
  rejeitado: { label: "Rejeitado", variant: "destructive" as const, className: "" },
};

const priorityConfig = {
  alta: { label: "Alta", className: "bg-red-100 text-red-700" },
  media: { label: "Média", className: "bg-amber-100 text-amber-700" },
  baixa: { label: "Baixa", className: "bg-blue-100 text-blue-700" },
};

export function ProjectsList() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Projetos Ativos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-smooth hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{project.id}</p>
                  <h4 className="font-semibold leading-tight">{project.title}</h4>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant={statusConfig[project.status as keyof typeof statusConfig].variant}
                    className={statusConfig[project.status as keyof typeof statusConfig].className}
                  >
                    {statusConfig[project.status as keyof typeof statusConfig].label}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={priorityConfig[project.priority as keyof typeof priorityConfig].className}
                  >
                    {priorityConfig[project.priority as keyof typeof priorityConfig].label}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {project.author}
                <span className="ml-2">•</span>
                <span>{new Date(project.date).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
