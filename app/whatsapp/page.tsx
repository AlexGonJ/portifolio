"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePixelCustomEvent } from "@/hooks/usePixelCustomEvent";

function RedirectLogic() {
  const searchParams = useSearchParams();

  // Dispara o evento CliqueWhatsApp se o usuário tiver consentido previamente com cookies de marketing
  usePixelCustomEvent('CliqueWhatsApp');

  useEffect(() => {
    // Pega o texto da URL caso exista (ex: /whatsapp?text=Olá)
    const text = searchParams.get('text');
    const baseUrl = "https://wa.me/5538999023012";
    const finalUrl = text ? `${baseUrl}?text=${encodeURIComponent(text)}` : baseUrl;

    // Aguarda 1.2 segundos para dar tempo do Pixel registrar e depois redireciona
    const timer = setTimeout(() => {
      window.location.href = finalUrl;
    }, 1200);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Redirecionando para o WhatsApp...
      </h1>
      <p className="text-slate-400">
        Aguarde um momento. Se não for redirecionado automaticamente,{" "}
        <a href="https://wa.me/5538999023012" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
          clique aqui
        </a>.
      </p>
    </div>
  );
}

export default function WhatsAppRedirectPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      <Suspense fallback={
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      }>
        <RedirectLogic />
      </Suspense>
    </div>
  );
}

