import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const projetoSchema = z.object({
  titulo: z.string().trim().min(1, "Título é obrigatório").max(200, "Título muito longo"),
  descricao: z.string().trim().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
  justificativa: z.string().trim().min(1, "Justificativa é obrigatória"),
  texto_completo: z.string().trim().min(1, "Texto completo é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
});

type ProjetoFormData = z.infer<typeof projetoSchema>;

const NovoProjeto = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anexos, setAnexos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      justificativa: "",
      texto_completo: "",
      categoria: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAnexos((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAnexo = (index: number) => {
    setAnexos((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAnexos = async (projetoId: string): Promise<string[]> => {
    if (anexos.length === 0) return [];

    setIsUploading(true);
    const uploadedFiles: string[] = [];

    try {
      for (const file of anexos) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}/${projetoId}/${Date.now()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("project-attachments")
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        uploadedFiles.push(fileName);
      }
    } finally {
      setIsUploading(false);
    }

    return uploadedFiles;
  };

  const onSubmit = async (data: ProjetoFormData) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar autenticado para criar um projeto",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First, insert the project
      const { data: projeto, error: projetoError } = await supabase
        .from("projetos")
        .insert({
          user_id: user.id,
          titulo: data.titulo,
          descricao: data.descricao,
          justificativa: data.justificativa,
          texto_completo: data.texto_completo,
          categoria: data.categoria,
          status: "rascunho",
        })
        .select()
        .single();

      if (projetoError) throw projetoError;

      // Then upload attachments if any
      if (anexos.length > 0 && projeto) {
        const uploadedFiles = await uploadAnexos(projeto.id);

        // Update project with attachment references
        const { error: updateError } = await supabase
          .from("projetos")
          .update({ anexos: uploadedFiles })
          .eq("id", projeto.id);

        if (updateError) throw updateError;
      }

      toast({
        title: "Sucesso!",
        description: "Projeto criado com sucesso",
      });

      navigate("/projetos");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar projeto",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Novo Projeto de Lei</h1>
          <p className="text-muted-foreground mt-2">
            Preencha os campos abaixo para criar um novo projeto de lei
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
            <CardDescription>
              Todos os campos são obrigatórios, exceto anexos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o título do projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="transporte">Transporte</SelectItem>
                          <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                          <SelectItem value="seguranca">Segurança</SelectItem>
                          <SelectItem value="cultura">Cultura</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
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
                          placeholder="Digite uma breve descrição do projeto"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Máximo 500 caracteres</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="justificativa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Justificativa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Justifique a necessidade deste projeto"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="texto_completo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto Completo</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite o texto completo do projeto de lei"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Anexos (Opcional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {anexos.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {anexos.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted rounded-md"
                        >
                          <span className="text-sm truncate flex-1">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAnexo(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="flex-1"
                  >
                    {isSubmitting || isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isUploading ? "Enviando anexos..." : "Salvando..."}
                      </>
                    ) : (
                      "Criar Projeto"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/projetos")}
                    disabled={isSubmitting || isUploading}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NovoProjeto;
