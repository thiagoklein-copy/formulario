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
  5: ["situacao_instagram", "canais_ativos", "canal_principal", "meta_seguidores", "estrutura_equipe"],
  6: ["produtos_atuais", "ticket_medio", "meta_faturamento", "orcamento_marketing", "prazo_lancamento"],
  7: ["cores_preferidas", "estilo_foto_video", "assinatura_marca"],
};

export const stepMeta = {
  1: { title: "Identidade: Quem e voce?", description: "Queremos entender sua historia antes de falar sobre o que voce faz. Essas informacoes sao a base de tudo." },
  2: { title: "DNA do Reino: Seu metodo e proposito", description: "Agora queremos entender o DNA do Reino em profundidade - o que e, para quem e e qual transformacao ele entrega." },
  3: { title: "Posicionamento: Como voce quer ser visto", description: "Seu posicionamento e a impressao que fica na cabeca das pessoas quando elas pensam em voce." },
  4: { title: "Conteudo: Sua estrategia de conteudo", description: "Aqui vamos entender os temas, formatos e a frequencia que farao sentido para a sua rotina." },
  5: { title: "Canais: Presenca digital", description: "Onde voce esta hoje e onde quer chegar. Vamos mapear sua presenca atual e as prioridades." },
  6: { title: "Negocio: Produtos, precos e metas", description: "Para criar funis eficientes, precisamos entender o modelo de negocio e os numeros." },
  7: { title: "Referencias: Identidade visual e marca", description: "Vamos definir a identidade visual e o estilo de comunicacao do DNA do Reino." },
} as const;
