import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, BarChart3, MessageCircle, Map, Calendar, TrendingUp, Lock, Check } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-foreground">GestorLegis</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Funcionalidades
            </a>
            <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Benefícios
            </a>
            <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Preços
            </a>
            <a href="#contato" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Contato
            </a>
          </div>
          
          <Link to="/auth">
            <Button className="shadow-elegant">
              Começar Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Tecnologia de IA Avançada</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Gerencie seu mandato com{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Inteligência Artificial
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                A plataforma completa para vereadores que economiza até 15 horas por semana automatizando tarefas administrativas e otimizando sua gestão legislativa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 shadow-elegant hover:scale-105 transition-smooth bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link to="/auth">
                    Teste Grátis por 14 Dias
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-smooth"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">15h</div>
                  <div className="text-sm text-white/60">economizadas/semana</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-white/60">satisfação</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-white/60">vereadores ativos</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Dashboard mockup */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-20 blur-3xl rounded-3xl" />
                <img 
                  src={dashboardMockup} 
                  alt="Dashboard do GestorLegis" 
                  className="relative rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-smooth duration-500"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-4 shadow-elegant animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="text-sm text-muted-foreground">Projetos concluídos</div>
                <div className="text-2xl font-bold text-primary">+47%</div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-white rounded-xl p-4 shadow-elegant animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-sm text-muted-foreground">Tempo economizado</div>
                <div className="text-2xl font-bold text-accent">15h/sem</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-background" id="beneficios">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Resultados que{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transformam
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja o impacto real que nossa plataforma gera no dia a dia dos vereadores
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-8 text-center hover-scale shadow-card transition-smooth border-border/50">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">Vereadores Ativos</div>
              <div className="text-sm text-muted-foreground">Em todo Brasil</div>
            </Card>

            <Card className="p-8 text-center hover-scale shadow-card transition-smooth border-border/50">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                15h
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">Economizadas/Semana</div>
              <div className="text-sm text-muted-foreground">Automação inteligente</div>
            </Card>

            <Card className="p-8 text-center hover-scale shadow-card transition-smooth border-border/50">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                300%
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">↑ Engajamento</div>
              <div className="text-sm text-muted-foreground">Com a população</div>
            </Card>

            <Card className="p-8 text-center hover-scale shadow-card transition-smooth border-border/50">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">Satisfação</div>
              <div className="text-sm text-muted-foreground">Usuários satisfeitos</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30" id="funcionalidades">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Funcionalidades{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Poderosas
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para uma gestão legislativa de excelência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Inteligente */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dashboard Inteligente</h3>
                <p className="text-muted-foreground mb-4">
                  Visualize todas as suas métricas em tempo real com análises preditivas
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>KPIs personalizados e dashboards customizáveis</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Relatórios automáticos gerados por IA</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Alertas inteligentes de prioridades</span>
                </li>
              </ul>
            </Card>

            {/* CRM de Cidadãos */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">CRM de Cidadãos</h3>
                <p className="text-muted-foreground mb-4">
                  Gerencie relacionamentos e demandas dos cidadãos em um só lugar
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Histórico completo de interações</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Categorização automática de demandas</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Follow-up automatizado via WhatsApp</span>
                </li>
              </ul>
            </Card>

            {/* Mapa de Demandas */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Map className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mapa de Demandas</h3>
                <p className="text-muted-foreground mb-4">
                  Visualize geograficamente as demandas do seu distrito
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mapa de calor de demandas por região</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Filtros por categoria e urgência</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Rotas otimizadas para visitas</span>
                </li>
              </ul>
            </Card>

            {/* Agenda Sincronizada */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Agenda Sincronizada</h3>
                <p className="text-muted-foreground mb-4">
                  Sincronize automaticamente com Google Calendar e Outlook
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Sincronização bidirecional em tempo real</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Lembretes automáticos de sessões</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gestão de conflitos de horário</span>
                </li>
              </ul>
            </Card>

            {/* Analytics Avançado */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Analytics Avançado</h3>
                <p className="text-muted-foreground mb-4">
                  Análises profundas com inteligência artificial
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Previsão de tendências legislativas</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Análise de sentimento populacional</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Benchmarking com outras câmaras</span>
                </li>
              </ul>
            </Card>

            {/* Segurança Total */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50 gradient-card">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Segurança Total</h3>
                <p className="text-muted-foreground mb-4">
                  Proteção de dados com criptografia de ponta a ponta
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Conformidade com LGPD e ISO 27001</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Backups automáticos diários</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Autenticação multi-fator (MFA)</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background" id="precos">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Planos que{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cabem no seu Bolso
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Básico</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">R$ 197</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">Para vereadores iniciantes</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gestão de agenda</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>CRM básico</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Até 100 contatos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Suporte por email</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link to="/auth">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            {/* Plano Profissional - DESTAQUE */}
            <Card className="p-8 relative shadow-elegant transition-smooth border-2 border-primary hover-scale">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                Mais Escolhido
              </Badge>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Profissional</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    R$ 397
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">Para vereadores ativos</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Tudo do Básico</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>IA para análise de projetos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Chatbot inteligente</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Contatos ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Analytics avançado</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>

              <Button className="w-full gradient-primary text-white shadow-elegant" size="lg" asChild>
                <Link to="/auth">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            {/* Plano Institucional */}
            <Card className="p-8 hover-scale shadow-card transition-smooth border-border/50">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Institucional</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">R$ 2.997</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">Para toda a câmara</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Tudo do Profissional</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Até 15 vereadores</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>White-label</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Treinamento personalizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gerente de conta dedicado</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link to="/auth">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Todos os planos incluem 14 dias de teste grátis. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
