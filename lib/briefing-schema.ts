export type BriefingResponse = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  session_id?: string;
  completed?: boolean;
  current_step?: number;
  nome_completo: string;
  profissao: string;
  historia: string;
  dna_vendas_contexto: string;
  virada_fe: string;
  dna_o_que: string;
  missao: string;
  para_quem: string;
  transformacao: string;
  pilares: string;
  produto_principal: string;
  voz: string;
  diferenciais: string;
  nao_sou: string;
  tom_comunicacao: string[];
  frase_posicionamento: string;
  temas_principais: string[];
  formatos_preferidos: string[];
  frequencia_conteudo: string;
  estilo_video: string;
  conteudo_evitar: string;
  inspiracoes_conteudo: string;
  situacao_instagram: string;
  canais_ativos: string[];
  canal_principal: string;
  meta_seguidores: string;
  estrutura_equipe: string;
  produtos_atuais: string;
  ticket_medio: string;
  empresas_parceiras: string;
  meta_faturamento: string;
  orcamento_marketing: string;
  prazo_lancamento: string;
  cores_preferidas: string[];
  referencias_visuais: string;
  estilo_foto_video: string;
  assinatura_marca: string;
  observacoes_finais: string;
};

export const TOTAL_STEPS = 7;

export const defaultBriefingResponse: BriefingResponse = {
  nome_completo: "",
  profissao: "",
  historia: "",
  dna_vendas_contexto: "",
  virada_fe: "",
  dna_o_que: "",
  missao: "",
  para_quem: "",
  transformacao: "",
  pilares: "",
  produto_principal: "",
  voz: "",
  diferenciais: "",
  nao_sou: "",
  tom_comunicacao: [],
  frase_posicionamento: "",
  temas_principais: [],
  formatos_preferidos: [],
  frequencia_conteudo: "",
  estilo_video: "",
  conteudo_evitar: "",
  inspiracoes_conteudo: "",
  situacao_instagram: "",
  canais_ativos: [],
  canal_principal: "",
  meta_seguidores: "",
  estrutura_equipe: "",
  produtos_atuais: "",
  ticket_medio: "",
  empresas_parceiras: "",
  meta_faturamento: "",
  orcamento_marketing: "",
  prazo_lancamento: "",
  cores_preferidas: [],
  referencias_visuais: "",
  estilo_foto_video: "",
  assinatura_marca: "",
  observacoes_finais: "",
};

export const requiredFieldsByStep: Record<number, Array<keyof BriefingResponse>> = {
  1: ["nome_completo", "profissao", "historia", "dna_vendas_contexto", "virada_fe"],
  2: ["dna_o_que", "missao", "para_quem", "transformacao", "pilares", "produto_principal"],
  3: ["voz", "diferenciais", "tom_comunicacao"],
  4: ["temas_principais", "formatos_preferidos", "frequencia_conteudo", "estilo_video"],
  5: ["situacao_instagram", "canais_ativos", "canal_principal", "meta_seguidores"],
  6: ["produtos_atuais", "ticket_medio", "meta_faturamento"],
  7: ["cores_preferidas", "estilo_foto_video", "assinatura_marca"],
};

export const stepMeta = {
  1: { title: "Identidade: Quem é você?", description: "Queremos entender sua história antes de falar sobre o que você faz. Essas informações são a base de tudo." },
  2: { title: "DNA do Reino: Seu método e propósito", description: "Agora queremos entender o DNA do Reino em profundidade - o que é, para quem é e qual transformação ele entrega." },
  3: { title: "Posicionamento: Como você quer ser visto", description: "Seu posicionamento é a impressão que fica na cabeça das pessoas quando elas pensam em você." },
  4: { title: "Conteúdo: Sua estratégia de conteúdo", description: "Aqui vamos entender os temas, formatos e a frequência que farão sentido para a sua rotina." },
  5: { title: "Canais: Presença digital", description: "Onde você está hoje e onde quer chegar. Vamos mapear sua presença atual e as prioridades." },
  6: { title: "Negócio: Produtos, preços e metas", description: "Para criar funis eficientes, precisamos entender o modelo de negócio e os números." },
  7: { title: "Referências: Identidade visual e marca", description: "Vamos definir a identidade visual e o estilo de comunicação do DNA do Reino." },
} as const;
