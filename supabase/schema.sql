-- Tabela principal de respostas
create table briefing_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  session_id uuid default gen_random_uuid() unique,
  completed boolean default false,
  current_step integer default 1,
  nome_completo text,
  profissao text,
  historia text,
  dna_vendas_contexto text,
  virada_fe text,
  dna_o_que text,
  missao text,
  para_quem text,
  transformacao text,
  pilares text,
  produto_principal text,
  voz text,
  diferenciais text,
  nao_sou text,
  tom_comunicacao text[],
  frase_posicionamento text,
  temas_principais text[],
  formatos_preferidos text[],
  frequencia_conteudo text,
  estilo_video text,
  conteudo_evitar text,
  inspiracoes_conteudo text,
  situacao_instagram text,
  canais_ativos text[],
  canal_principal text,
  meta_seguidores text,
  estrutura_equipe text,
  produtos_atuais text,
  ticket_medio text,
  empresas_parceiras text,
  meta_faturamento text,
  orcamento_marketing text,
  prazo_lancamento text,
  cores_preferidas text[],
  referencias_visuais text,
  estilo_foto_video text,
  assinatura_marca text,
  observacoes_finais text
);

alter table briefing_responses enable row level security;

create policy "Anyone can insert" on briefing_responses
  for insert with check (true);

create policy "Anyone can update own session" on briefing_responses
  for update using (true);

create policy "Authenticated users can read all" on briefing_responses
  for select using (auth.role() = 'authenticated');

create index on briefing_responses (session_id);
create index on briefing_responses (completed);
create index on briefing_responses (created_at desc);
