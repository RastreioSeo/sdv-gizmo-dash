import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, TrendingUp, Users, Calendar } from "lucide-react";

const Relatorios = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">Visualize e exporte relatórios sobre suas atividades legislativas</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos Apresentados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% comparado ao período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Participadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">100% de presença</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eleitores Atendidos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+127 este mês</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projetos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projetos">Projetos de Lei</TabsTrigger>
            <TabsTrigger value="sessoes">Sessões</TabsTrigger>
            <TabsTrigger value="comunicacao">Comunicação</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="projetos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Projetos de Lei - Análise Detalhada</CardTitle>
                <CardDescription>Estatísticas sobre todos os projetos de lei apresentados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Distribuição por Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span className="text-sm">Aprovados</span>
                        </div>
                        <span className="text-sm font-semibold">15 (62.5%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Em análise</span>
                        </div>
                        <span className="text-sm font-semibold">6 (25%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">Em votação</span>
                        </div>
                        <span className="text-sm font-semibold">3 (12.5%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Áreas Temáticas</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="text-2xl font-bold mb-1">8</div>
                        <div className="text-sm text-muted-foreground">Educação</div>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="text-2xl font-bold mb-1">6</div>
                        <div className="text-sm text-muted-foreground">Saúde</div>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="text-2xl font-bold mb-1">5</div>
                        <div className="text-sm text-muted-foreground">Infraestrutura</div>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="text-2xl font-bold mb-1">5</div>
                        <div className="text-sm text-muted-foreground">Meio Ambiente</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessoes">
            <Card>
              <CardHeader>
                <CardTitle>Participação em Sessões</CardTitle>
                <CardDescription>Análise de presença e participação nas sessões legislativas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Dados de participação em sessões</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comunicacao">
            <Card>
              <CardHeader>
                <CardTitle>Comunicação com Eleitores</CardTitle>
                <CardDescription>Estatísticas sobre atendimento e comunicação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Canais de Comunicação</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Mensagens diretas</span>
                        <span className="text-sm font-semibold">427</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Reuniões presenciais</span>
                        <span className="text-sm font-semibold">156</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Audiências públicas</span>
                        <span className="text-sm font-semibold">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Geral</CardTitle>
                <CardDescription>Análise completa de desempenho no mandato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">95%</div>
                        <div className="text-sm text-muted-foreground">Índice de Produtividade</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                        <div className="text-sm text-muted-foreground">Avaliação Média</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Relatorios;
