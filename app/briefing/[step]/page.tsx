"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useBriefing } from "@/hooks/useBriefing";
import { BriefingResponse, stepMeta, TOTAL_STEPS } from "@/lib/briefing-schema";
import { NavigationButtons } from "@/components/briefing/NavigationButtons";
import { ProgressBar } from "@/components/briefing/ProgressBar";
import { QuestionCheckbox } from "@/components/briefing/QuestionCheckbox";
import { QuestionRadio } from "@/components/briefing/QuestionRadio";
import { QuestionText } from "@/components/briefing/QuestionText";
import { QuestionTextarea } from "@/components/briefing/QuestionTextarea";
import { StepWrapper } from "@/components/briefing/StepWrapper";

type FieldKey = keyof BriefingResponse;

export default function BriefingStepPage() {
  const params = useParams<{ step: string }>();
  const router = useRouter();
  const step = Number(params.step);
  const [errors, setErrors] = useState<FieldKey[]>([]);
  const { loading, responses, setResponses, currentStep, saveStep, validateStep, markCompleted } =
    useBriefing();

  useEffect(() => {
    if (!loading && currentStep > step) router.replace(`/briefing/${currentStep}`);
  }, [currentStep, loading, router, step]);

  const update = (field: FieldKey, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = async () => {
    const missing = validateStep(step);
    if (missing.length) {
      setErrors(missing);
      return;
    }
    setErrors([]);
    if (step === TOTAL_STEPS) {
      const ok = await markCompleted();
      if (ok) {
        router.push("/briefing/done");
        return;
      }
      window.alert("Não foi possível finalizar agora. Tente novamente em alguns segundos.");
      return;
    }
    const ok = await saveStep(step + 1, responses);
    if (ok) {
      router.push(`/briefing/${step + 1}`);
      return;
    }
    window.alert("Não foi possível salvar esta etapa. Verifique a conexão e tente novamente.");
  };

  const goBack = async () => {
    if (step <= 1) return;
    await saveStep(step - 1, responses);
    router.push(`/briefing/${step - 1}`);
  };

  const hasError = (field: FieldKey) => (errors.includes(field) ? "Campo obrigatório." : undefined);
  const meta = useMemo(() => stepMeta[step as keyof typeof stepMeta], [step]);

  if (loading || !meta) {
    return <main className="flex min-h-screen items-center justify-center">Carregando...</main>;
  }

  return (
    <div>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          <StepWrapper title={meta.title} description={meta.description}>
            {step === 1 && (
              <>
                <QuestionText label="Qual é o seu nome completo?" value={responses.nome_completo} onChange={(value) => update("nome_completo", value)} error={hasError("nome_completo")} />
                <QuestionText label="Como você se define profissionalmente hoje?" hint="Ex: empresário, mentor, corretor, líder cristão..." value={responses.profissao} onChange={(value) => update("profissao", value)} error={hasError("profissao")} />
                <QuestionTextarea label="Conta um pouco da sua história." hint="De onde você veio, o que viveu, qual foi o ponto de virada." value={responses.historia} onChange={(value) => update("historia", value)} error={hasError("historia")} />
                <QuestionTextarea label="O que era o DNA de Vendas e por que você decidiu mudar?" value={responses.dna_vendas_contexto} onChange={(value) => update("dna_vendas_contexto", value)} error={hasError("dna_vendas_contexto")} />
                <QuestionTextarea label="Como a fé entrou na sua história profissional?" value={responses.virada_fe} onChange={(value) => update("virada_fe", value)} error={hasError("virada_fe")} />
              </>
            )}
            {step === 2 && (
              <>
                <QuestionTextarea label="O que é o DNA do Reino, na sua visão?" value={responses.dna_o_que} onChange={(value) => update("dna_o_que", value)} error={hasError("dna_o_que")} />
                <QuestionTextarea label="Qual é a sua missão?" value={responses.missao} onChange={(value) => update("missao", value)} error={hasError("missao")} />
                <QuestionTextarea label="Para quem é o DNA do Reino?" value={responses.para_quem} onChange={(value) => update("para_quem", value)} error={hasError("para_quem")} />
                <QuestionTextarea label="Qual é a transformação que você entrega?" value={responses.transformacao} onChange={(value) => update("transformacao", value)} error={hasError("transformacao")} />
                <QuestionTextarea label="Quais são os pilares do seu método?" value={responses.pilares} onChange={(value) => update("pilares", value)} error={hasError("pilares")} />
                <QuestionRadio label="Qual será o produto/formato principal?" value={responses.produto_principal} onChange={(value) => update("produto_principal", value)} options={["Evento presencial (imersão, conferência)", "Mentoria em grupo", "Curso online", "Programa dentro de empresas", "Ainda não definido - vamos decidir juntos"]} error={hasError("produto_principal")} />
              </>
            )}
            {step === 3 && (
              <>
                <QuestionRadio label="Com qual voz você mais se identifica?" value={responses.voz} onChange={(value) => update("voz", value)} options={["Apostólica e de autoridade", "Pastoral e acolhedora", "Empresarial com fé", "Ainda não tenho certeza"]} error={hasError("voz")} />
                <QuestionTextarea label="O que te diferencia no mercado?" value={responses.diferenciais} onChange={(value) => update("diferenciais", value)} error={hasError("diferenciais")} />
                <QuestionTextarea label="O que você definitivamente NÃO é?" value={responses.nao_sou} onChange={(value) => update("nao_sou", value)} />
                <QuestionCheckbox label="Como você quer que descrevam sua comunicação?" values={responses.tom_comunicacao} onChange={(value) => update("tom_comunicacao", value)} options={["Direto e incisivo", "Acolhedor e próximo", "Inspirador e motivacional", "Profético e com autoridade", "Prático e aplicável", "Intelectual e profundo", "Leve e bem-humorado", "Austero e sério", "Energético e intenso"]} maxSelections={4} error={hasError("tom_comunicacao")} />
                <QuestionTextarea label="Se você tivesse que se apresentar em 1 frase, qual seria?" value={responses.frase_posicionamento} onChange={(value) => update("frase_posicionamento", value)} />
              </>
            )}
            {step === 4 && (
              <>
                <QuestionCheckbox label="Quais temas você quer abordar no conteúdo?" values={responses.temas_principais} onChange={(value) => update("temas_principais", value)} options={["Fé e negócios", "Espiritualidade prática", "Gestão e processos", "Liderança cristã", "Mercado imobiliário", "Família e equilíbrio", "Vendas com propósito", "Riqueza e prosperidade bíblica", "Propósito e chamado", "Inteligência emocional", "Mentalidade e comportamento", "Testemunhos e histórias reais"]} error={hasError("temas_principais")} />
                <QuestionCheckbox label="Com quais formatos você se sente mais à vontade?" values={responses.formatos_preferidos} onChange={(value) => update("formatos_preferidos", value)} options={["Vídeos longos (YouTube)", "Reels e vídeos curtos", "Cards e carrosséis no Instagram", "Lives", "Podcast / áudio", "Stories", "Texto / legendas longas"]} error={hasError("formatos_preferidos")} />
                <QuestionRadio label="Com qual frequência de produção você consegue se comprometer?" value={responses.frequencia_conteudo} onChange={(value) => update("frequencia_conteudo", value)} options={["Diariamente", "3-4x por semana", "1-2x por semana", "Quinzenal", "Ainda não sei"]} error={hasError("frequencia_conteudo")} />
                <QuestionTextarea label="Como você se sente falando para a câmera?" value={responses.estilo_video} onChange={(value) => update("estilo_video", value)} error={hasError("estilo_video")} />
                <QuestionTextarea label="Existe algum tema que você NÃO quer?" value={responses.conteudo_evitar} onChange={(value) => update("conteudo_evitar", value)} />
                <QuestionTextarea label="Tem criadores que você admira no conteúdo?" value={responses.inspiracoes_conteudo} onChange={(value) => update("inspiracoes_conteudo", value)} />
              </>
            )}
            {step === 5 && (
              <>
                <QuestionTextarea label="Como está seu Instagram hoje?" value={responses.situacao_instagram} onChange={(value) => update("situacao_instagram", value)} error={hasError("situacao_instagram")} />
                <QuestionCheckbox label="Em quais canais você já tem conta ativa?" values={responses.canais_ativos} onChange={(value) => update("canais_ativos", value)} options={["Instagram", "YouTube", "TikTok", "Spotify (podcast)", "LinkedIn", "WhatsApp Business", "Telegram"]} error={hasError("canais_ativos")} />
                <QuestionRadio label="Qual canal você quer priorizar primeiro?" value={responses.canal_principal} onChange={(value) => update("canal_principal", value)} options={["Instagram (hub principal)", "YouTube (conteúdo longo)", "TikTok (jovem cristão)", "Todos ao mesmo tempo", "Não sei - me orientem"]} error={hasError("canal_principal")} />
                <QuestionRadio label="Meta de seguidores em 6 meses?" value={responses.meta_seguidores} onChange={(value) => update("meta_seguidores", value)} options={["1.000 a 5.000", "5.000 a 20.000", "20.000 a 50.000", "Mais de 50.000", "Número não é prioridade"]} error={hasError("meta_seguidores")} />
              </>
            )}
            {step === 6 && (
              <>
                <QuestionTextarea label="Quais produtos ou serviços você oferece?" value={responses.produtos_atuais} onChange={(value) => update("produtos_atuais", value)} error={hasError("produtos_atuais")} />
                <QuestionRadio label="Qual é o ticket médio do produto principal?" value={responses.ticket_medio} onChange={(value) => update("ticket_medio", value)} options={["Até R$ 500", "R$ 500 a R$ 2.000", "R$ 2.000 a R$ 5.000", "R$ 5.000 a R$ 15.000", "Acima de R$ 15.000"]} error={hasError("ticket_medio")} />
                <QuestionTextarea label="Já tem empresas parceiras em mente?" value={responses.empresas_parceiras} onChange={(value) => update("empresas_parceiras", value)} />
                <QuestionRadio label="Meta de faturamento em 12 meses?" value={responses.meta_faturamento} onChange={(value) => update("meta_faturamento", value)} options={["Até R$ 100 mil", "R$ 100k a R$ 300k", "R$ 300k a R$ 500k", "R$ 500k a R$ 1 milhão", "Mais de R$ 1 milhão"]} error={hasError("meta_faturamento")} />
              </>
            )}
            {step === 7 && (
              <>
                <QuestionCheckbox label="Quais paletas de cor te atraem?" values={responses.cores_preferidas} onChange={(value) => update("cores_preferidas", value)} options={["Escuro (preto, navy, chumbo)", "Roxo/violeta", "Dourado/ouro", "Branco e neutros", "Verde", "Escuro + dourado"]} error={hasError("cores_preferidas")} />
                <QuestionTextarea label="Tem referências visuais que te inspiram?" value={responses.referencias_visuais} onChange={(value) => update("referencias_visuais", value)} />
                <QuestionRadio label="Como você se vê em fotos e vídeos?" value={responses.estilo_foto_video} onChange={(value) => update("estilo_foto_video", value)} options={["Social e casual", "Semiprofissional", "Executivo e premium", "Eclesiástico"]} error={hasError("estilo_foto_video")} />
                <QuestionRadio label="Como você quer assinar o conteúdo?" value={responses.assinatura_marca} onChange={(value) => update("assinatura_marca", value)} options={["Rafael Pulheiro", "DNA do Reino", "Rafael Pulheiro | DNA do Reino", "Ainda não decidi"]} error={hasError("assinatura_marca")} />
                <QuestionTextarea label="Tem mais alguma informação importante?" value={responses.observacoes_finais} onChange={(value) => update("observacoes_finais", value)} />
              </>
            )}
          </StepWrapper>
        </motion.div>
      </AnimatePresence>
      <NavigationButtons
        onBack={step > 1 ? goBack : undefined}
        onNext={goNext}
        nextLabel={step === TOTAL_STEPS ? "Finalizar formulário" : "Próxima etapa"}
      />
    </div>
  );
}
