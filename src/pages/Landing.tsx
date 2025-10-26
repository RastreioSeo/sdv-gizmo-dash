import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, Play, Sparkles, BarChart3, MessageCircle, Map, Calendar, TrendingUp, Lock, Check, Star, Facebook, Twitter, Instagram, Linkedin, Mail, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import logoPlenario from "@/assets/logo-plenario.png";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with data-animate class
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logoPlenario} alt="Plenário" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">Plenário</span>
          </div>
          
          {/* Desktop Menu */}
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
            <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Depoimentos
            </a>
          </div>
          
          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link to="/auth">
              <Button className="shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300">
                Começar Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <a 
                  href="#funcionalidades" 
                  className="text-lg font-medium hover:text-primary transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Funcionalidades
                </a>
                <a 
                  href="#beneficios" 
                  className="text-lg font-medium hover:text-primary transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benefícios
                </a>
                <a 
                  href="#precos" 
                  className="text-lg font-medium hover:text-primary transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preços
                </a>
                <a 
                  href="#depoimentos" 
                  className="text-lg font-medium hover:text-primary transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Depoimentos
                </a>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full shadow-elegant mt-4" size="lg">
                    Começar Grátis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-white space-y-6 sm:space-y-8 animate-fade-in" data-animate>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-smooth">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">Tecnologia de IA Avançada</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Gerencie seu mandato com{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Inteligência Artificial
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
                A plataforma completa para vereadores que economiza até 15 horas por semana automatizando tarefas administrativas e otimizando sua gestão legislativa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-elegant hover:scale-105 hover:shadow-glow transition-all duration-300 bg-white text-primary hover:bg-white/90 animate-pulse"
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
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">15h</div>
                  <div className="text-xs sm:text-sm text-white/60">economizadas/semana</div>
                </div>
                <div className="h-8 sm:h-12 w-px bg-white/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">98%</div>
                  <div className="text-xs sm:text-sm text-white/60">satisfação</div>
                </div>
                <div className="h-8 sm:h-12 w-px bg-white/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">500+</div>
                  <div className="text-xs sm:text-sm text-white/60">vereadores ativos</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Dashboard mockup */}
            <div className="relative animate-fade-in mt-8 lg:mt-0" style={{ animationDelay: "0.2s" }} data-animate>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-20 blur-3xl rounded-3xl" />
                <img 
                  src={dashboardMockup} 
                  alt="Dashboard do Plenário" 
                  className="relative rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-all duration-500"
                />
              </div>
              
              {/* Floating cards - hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-elegant animate-fade-in hover:scale-110 transition-all duration-300" style={{ animationDelay: "0.4s" }}>
                <div className="text-xs sm:text-sm text-muted-foreground">Projetos concluídos</div>
                <div className="text-xl sm:text-2xl font-bold text-primary">+47%</div>
              </div>
              
              <div className="hidden sm:block absolute -top-6 sm:-top-8 -right-4 sm:-right-8 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-elegant animate-fade-in hover:scale-110 transition-all duration-300" style={{ animationDelay: "0.6s" }}>
                <div className="text-xs sm:text-sm text-muted-foreground">Tempo economizado</div>
                <div className="text-xl sm:text-2xl font-bold text-accent">15h/sem</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background" id="beneficios">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-animate>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Resultados que{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transformam
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Veja o impacto real que nossa plataforma gera no dia a dia dos vereadores
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-6 sm:p-8 text-center hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50" data-animate>
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
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30" id="funcionalidades">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-animate>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Funcionalidades{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Poderosas
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Tudo o que você precisa para uma gestão legislativa de excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Dashboard Inteligente */}
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50 gradient-card" data-animate>
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
      <section className="py-12 sm:py-16 lg:py-20 bg-background" id="precos">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-animate>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Planos que{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cabem no seu Bolso
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50" data-animate>
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
            <Card className="p-6 sm:p-8 relative glow-border transition-all duration-300 border-2 border-primary hover:scale-110 scale-105 shadow-glow" data-animate>
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-3 sm:px-4 py-1 shadow-elegant animate-pulse text-xs sm:text-sm">
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
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300 border-border/50" data-animate>
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

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30" id="depoimentos">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-animate>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              O que dizem nossos{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vereadores
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Veja como o Plenário está transformando mandatos em todo o Brasil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Depoimento 1 */}
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300" data-animate>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                "Economizei 20h por semana e meu engajamento triplicou! A plataforma mudou completamente minha forma de trabalhar."
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">João Silva</div>
                  <div className="text-sm text-muted-foreground">Vereador • São Paulo, SP</div>
                </div>
              </div>
            </Card>

            {/* Depoimento 2 */}
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300" data-animate>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                "O melhor investimento do meu mandato. Indispensável! Não consigo mais imaginar minha rotina sem o Plenário."
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                    MS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">Maria Santos</div>
                  <div className="text-sm text-muted-foreground">Vereadora • Rio de Janeiro, RJ</div>
                </div>
              </div>
            </Card>

            {/* Depoimento 3 */}
            <Card className="p-6 sm:p-8 hover:scale-105 hover:shadow-glow shadow-card transition-all duration-300" data-animate>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                "A IA realmente funciona. Impressionante! Os relatórios automáticos economizam horas de trabalho manual."
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    CO
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">Carlos Oliveira</div>
                  <div className="text-sm text-muted-foreground">Vereador • Belo Horizonte, MG</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8" data-animate>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Pronto para transformar seu mandato?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed px-4">
              Junte-se a centenas de vereadores que já economizam tempo e aumentam impacto
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 h-auto shadow-elegant hover:scale-105 hover:shadow-glow transition-all duration-300 bg-white text-primary hover:bg-white/90 animate-pulse"
                asChild
              >
                <Link to="/auth">
                  Começar Teste Grátis de 14 Dias
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </Button>
              <p className="text-xs sm:text-sm text-white/70">
                Sem cartão de crédito • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar-background text-sidebar-foreground py-8 sm:py-12 border-t border-sidebar-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={logoPlenario} alt="Plenário" className="h-10 w-10" />
                <span className="text-2xl font-bold">Plenário</span>
              </div>
              <p className="text-sidebar-foreground/70 mb-4 max-w-md">
                A plataforma completa de gestão legislativa com inteligência artificial para vereadores modernos.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#funcionalidades" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#precos" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="text-sidebar-foreground/70 hover:text-primary transition-smooth">
                    Depoimentos
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contato@plenario.com.br" className="text-sidebar-foreground/70 hover:text-primary transition-smooth flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    contato@plenario.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sidebar-border pt-8 text-center text-sidebar-foreground/70 text-sm">
            <p>© 2024 Plenário. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
