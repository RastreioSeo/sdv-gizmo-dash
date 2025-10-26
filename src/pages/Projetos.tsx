import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  status: z.enum(["em_analise", "aprovado", "rejeitado"]),
});

type FormData = z.infer<typeof formSchema>;

interface Projeto {
  id: string;
  titulo: string;
  status: string | null;
  created_at: string;
}

const Projetos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      status: "em_analise",
    },
  });

  useEffect(() => {
    fetchProjetos();
  }, []);

  const fetchProjetos = async () => {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjetos(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os projetos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: FormData) => {
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

      const { error } = await supabase
        .from('projetos')
        .insert({
          titulo: values.titulo,
          descricao: values.descricao || null,
          status: values.status,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Projeto criado com sucesso',
      });

      setDialogOpen(false);
      form.reset();
      fetchProjetos();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível criar o projeto',
        variant: 'destructive',
      });
    }
  };

  const filteredProjetos = projetos.filter(projeto => {
    const matchesSearch = projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projeto.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || projeto.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "aprovado":
        return "default";
      case "em_analise":
        return "secondary";
      case "rejeitado":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em_analise":
        return "Em Análise";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      default:
        return status;
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Projeto de Lei</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o título do projeto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite a descrição do projeto" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="em_analise">Em Análise</SelectItem>
                            <SelectItem value="aprovado">Aprovado</SelectItem>
                            <SelectItem value="rejeitado">Rejeitado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Criar Projeto</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
                  <SelectItem value="em_analise">Em Análise</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : filteredProjetos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhum projeto encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProjetos.map((projeto) => (
                      <TableRow 
                        key={projeto.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/projetos/${projeto.id}`)}
                      >
                        <TableCell className="font-medium">{projeto.titulo}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(projeto.status || '')}>
                            {getStatusLabel(projeto.status || '')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(projeto.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projetos/${projeto.id}`);
                            }}
                          >
                            Ver Detalhes
                          </Button>
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
