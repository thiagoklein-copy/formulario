"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefingResponse,
  defaultBriefingResponse,
  requiredFieldsByStep,
} from "@/lib/briefing-schema";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const STORAGE_KEY = "dna-reino-briefing";
const SESSION_KEY = "dna-reino-session-id";

export function useBriefing() {
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<BriefingResponse>(defaultBriefingResponse);
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  const getSessionId = useCallback(() => {
    const saved = window.localStorage.getItem(SESSION_KEY);
    if (saved) return saved;
    const created = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, created);
    return created;
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const sid = getSessionId();
      setSessionId(sid);
      const local = window.localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local) as {
          responses?: BriefingResponse;
          currentStep?: number;
        };
        setResponses({ ...defaultBriefingResponse, ...(parsed.responses ?? {}) });
        setCurrentStep(parsed.currentStep ?? 1);
      }
      const { data } = await supabase
        .from("briefing_responses")
        .select("*")
        .eq("session_id", sid)
        .single();
      if (data) {
        setResponses({ ...defaultBriefingResponse, ...(data as BriefingResponse) });
        setCurrentStep(data.current_step ?? 1);
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            responses: { ...defaultBriefingResponse, ...(data as BriefingResponse) },
            currentStep: data.current_step ?? 1,
          }),
        );
      }
      setLoading(false);
    };
    void bootstrap();
  }, [getSessionId, supabase]);

  const persistLocal = useCallback((next: BriefingResponse, step: number) => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ responses: next, currentStep: step }),
    );
  }, []);

  const saveStep = useCallback(
    async (step: number, stepData: Partial<BriefingResponse>) => {
      if (!sessionId) return false;
      const next = { ...responses, ...stepData };
      setResponses(next);
      setCurrentStep(step);
      persistLocal(next, step);

      const payload = {
        ...stepData,
        session_id: sessionId,
        current_step: step,
        completed: false,
      };

      const { error } = await supabase
        .from("briefing_responses")
        .upsert(payload, { onConflict: "session_id" });
      return !error;
    },
    [persistLocal, responses, sessionId, supabase],
  );

  const markCompleted = useCallback(async () => {
    if (!sessionId) return false;
    const { error } = await supabase
      .from("briefing_responses")
      .upsert(
        {
          ...responses,
          session_id: sessionId,
          current_step: 7,
          completed: true,
        },
        { onConflict: "session_id" },
      );
    if (!error) {
      persistLocal(responses, 7);
      return true;
    }
    return false;
  }, [persistLocal, responses, sessionId, supabase]);

  const validateStep = useCallback(
    (step: number) => {
      const fields = requiredFieldsByStep[step] ?? [];
      return fields.filter((field) => {
        const value = responses[field];
        if (Array.isArray(value)) return value.length === 0;
        return !String(value ?? "").trim();
      });
    },
    [responses],
  );

  return {
    loading,
    responses,
    setResponses,
    currentStep,
    setCurrentStep,
    saveStep,
    validateStep,
    markCompleted,
    getSessionId,
  };
}
