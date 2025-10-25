import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
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
    </div>
  );
};

export default Landing;
