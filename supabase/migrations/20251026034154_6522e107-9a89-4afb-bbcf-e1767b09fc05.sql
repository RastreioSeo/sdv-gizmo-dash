-- Criar tabela de sessões de votação
CREATE TABLE public.sessoes_votacao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  projeto_id UUID REFERENCES public.projetos(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'aberta',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  encerrada_em TIMESTAMP WITH TIME ZONE
);

-- Criar tabela de votos
CREATE TABLE public.votos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sessao_id UUID NOT NULL REFERENCES public.sessoes_votacao(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  voto TEXT NOT NULL CHECK (voto IN ('favor', 'contra', 'abstencao')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(sessao_id, user_id)
);

-- Habilitar RLS
ALTER TABLE public.sessoes_votacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votos ENABLE ROW LEVEL SECURITY;

-- Políticas para sessoes_votacao
CREATE POLICY "Vereadores podem ver todas as sessões"
  ON public.sessoes_votacao FOR SELECT
  USING (has_role(auth.uid(), 'vereador') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem criar sessões"
  ON public.sessoes_votacao FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar sessões"
  ON public.sessoes_votacao FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Políticas para votos
CREATE POLICY "Vereadores podem ver todos os votos"
  ON public.votos FOR SELECT
  USING (has_role(auth.uid(), 'vereador') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Vereadores podem criar seus votos"
  ON public.votos FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND 
    (has_role(auth.uid(), 'vereador') OR has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Vereadores podem atualizar seus votos"
  ON public.votos FOR UPDATE
  USING (
    auth.uid() = user_id AND 
    (has_role(auth.uid(), 'vereador') OR has_role(auth.uid(), 'admin'))
  );

-- Trigger para updated_at em sessoes_votacao
CREATE TRIGGER update_sessoes_votacao_updated_at
  BEFORE UPDATE ON public.sessoes_votacao
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para updated_at em votos
CREATE TRIGGER update_votos_updated_at
  BEFORE UPDATE ON public.votos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar realtime para as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessoes_votacao;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votos;

-- Configurar REPLICA IDENTITY FULL para realtime
ALTER TABLE public.sessoes_votacao REPLICA IDENTITY FULL;
ALTER TABLE public.votos REPLICA IDENTITY FULL;