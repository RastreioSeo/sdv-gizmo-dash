import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Projetos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const projetos = [
    {
      id: "PL 001/2024",
      titulo: "Projeto de Mobilidade Urbana",
      autor: "Vereador Silva",
      dataApresentacao: "15/03/2024",
      prazo: "30/04/2024",
      status: "Em análise"
    },
    {
      id: "PL 002/2024",
      titulo: "Programa de Educação Ambiental",
      autor: "Vereadora Santos",
      dataApresentacao: "10/03/2024",
      prazo: "25/04/2024",
      status: "Aprovado"
    },
    {
      id: "PL 003/2024",
      titulo: "Reforma da Praça Central",
      autor: "Vereador Costa",
      dataApresentacao: "05/03/2024",
      prazo: "20/04/2024",
      status: "Em votação"
    },
    {
      id: "PL 004/2024",
      titulo: "Ampliação da Rede de Saúde",
      autor: "Vereadora Lima",
      dataApresentacao: "01/03/2024",
      prazo: "15/04/2024",
      status: "Em análise"
    },
    {
      id: "PL 005/2024",
      titulo: "Incentivo ao Esporte Juvenil",
      autor: "Vereador Mendes",
      dataApresentacao: "28/02/2024",
      prazo: "10/04/2024",
      status: "Rejeitado"
    }
  ];

  const filteredProjetos = projetos.filter(projeto => {
    const matchesSearch = projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projeto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projeto.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || projeto.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "default";
      case "Em análise":
        return "secondary";
      case "Em votação":
        return "outline";
      case "Rejeitado":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos de Lei</h1>
            <p className="text-muted-foreground">Gerencie todos os projetos de lei em tramitação</p>
          </div>
          <Button className="gap-2" onClick={() => navigate("/projetos/novo")}>
            <Plus className="h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Projetos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por título, ID ou autor..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="Em análise">Em análise</SelectItem>
                  <SelectItem value="Em votação">Em votação</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Data Apresentação</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjetos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        Nenhum projeto encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProjetos.map((projeto) => (
                      <TableRow key={projeto.id}>
                        <TableCell className="font-medium">{projeto.id}</TableCell>
                        <TableCell>{projeto.titulo}</TableCell>
                        <TableCell>{projeto.autor}</TableCell>
                        <TableCell>{projeto.dataApresentacao}</TableCell>
                        <TableCell>{projeto.prazo}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(projeto.status)}>
                            {projeto.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Projetos;
