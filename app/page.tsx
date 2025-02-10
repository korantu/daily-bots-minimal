"use client";

import { useEffect, useState } from "react";
import { DailyVoiceClient } from "realtime-ai-daily";
import { VoiceClientAudio, VoiceClientProvider } from "realtime-ai-react";

import App from "./App";
import { botConfig } from "@/config/botConfig";
import {LLMHelper} from "realtime-ai";

export default function Home() {
  const [dailyVoiceClient, setDailyVoiceClient] =
    useState<DailyVoiceClient | null>(null);

  useEffect(() => {
    if (dailyVoiceClient) {
      return;
    }

    const voiceClient = new DailyVoiceClient(botConfig);

  // Below the RTVIClient instance you created
  const llmHelper = voiceClient.registerHelper(
    "llm",
    new LLMHelper({
      callbacks: {},
    })
  ) as LLMHelper;

  llmHelper.handleFunctionCall(async (fn) => {
  const args = fn.arguments as any;
  console.log(args);
  console.log("Photo taken");
  return {photo: "Taken"};
});

    setDailyVoiceClient(voiceClient);
  }, [dailyVoiceClient]);

  return (
    <VoiceClientProvider voiceClient={dailyVoiceClient!}>
      <>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-bold">PSBU Experience Center</h1>
            <App />
          </div>
        </main>
        <VoiceClientAudio />
      </>
    </VoiceClientProvider>
  );
}
