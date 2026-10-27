"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
  /** Quando false, o carrossel fica estático (sem keyframes, sem custo de animação) */
  animated?: boolean;
}

const DEFAULT_CARDS: CardItem[] = [
  { id: "1", url: "/projects/next.webp", title: "Next.js Platform" },
  { id: "2", url: "/projects/via.webp", title: "Via Express" },
  { id: "3", url: "/projects/bag.webp", title: "Branding & Design" },
  { id: "4", url: "/projects/work1.webp", title: "Web Application" },
  { id: "5", url: "/projects/post.webp", title: "Social Media" },
  { id: "6", url: "/projects/localiza.webp", title: "Localiza Multas" },
  { id: "7", url: "/projects/mockup.webp", title: "UI/UX Mockup" },
  { id: "8", url: "/projects/sport.webp", title: "Marketing Digital" },
  { id: "9", url: "/projects/golde.webp", title: "Alta Conversão" },
  { id: "10", url: "/projects/PlacaAline.webp", title: "Aline Gonçalves" },
  { id: "11", url: "/projects/enge.webp", title: "Engenharia Web" },
  { id: "12", url: "/projects/dental.webp", title: "Clínica Dental" },
];

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[150px] w-[225px] sm:h-[240px] sm:w-[360px] md:h-[340px] md:w-[510px] lg:h-[400px] lg:w-[600px] shrink-0 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl transition-all duration-300",
        className,
      )}
      style={{ backgroundColor: "#14171d" }}
    >
      <img
        src={card.url}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/15" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0",
          animationClass,
        )}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-7 sm:pr-7 md:gap-9 md:pr-9">
          {cards.map((card, idx) => (
            <Card
              key={`${card.id}-${idx}`}
              card={card}
              className={cardClassName}
            />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-7 sm:pr-7 md:gap-9 md:pr-9">
          {cards.map((card, idx) => (
            <Card
              key={`${card.id}-${idx}-copy`}
              card={card}
              className={cardClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -22,
  baseSpeed = 60, // Velocidade suave e elegante, muito mais lenta e majestosa
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
  animated = true,
}: DiagonalMarqueeCarouselProps) {
  const rotationStyle: React.CSSProperties = {
    transform: `rotate(${angle}deg)`,
    transformOrigin: "center center",
  };

  const rowCards = cards;
  const rowCardsReverse = [...cards].reverse();

  return (
    <div
      className={cn(
        "pointer-events-none select-none relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      {animated && (
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed) linear infinite !important;
          animation-duration: var(--speed) !important;
          animation-iteration-count: infinite !important;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite !important;
          animation-duration: var(--speed) !important;
          animation-iteration-count: infinite !important;
          will-change: transform;
        }
      `,
        }}
      />
      )}
      <div
        className="absolute z-0 flex w-[320vw] sm:w-[280vw] min-w-[1200px] sm:min-w-[2400px] flex-col gap-4 sm:gap-7 md:gap-9"
        style={rotationStyle}
      >
        {/* Linha 1 */}
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed}
          direction={-1}
          cardClassName={cardClassName}
        />
        {/* Linha 2 */}
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed + 8}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        {/* Linha 3 */}
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 4}
          direction={-1}
          cardClassName={cardClassName}
        />
        {/* Linha 4 */}
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed + 12}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-[#050505] to-transparent",
          fadeClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-[#050505] to-transparent",
          fadeClassName,
        )}
      />
    </div>
  );
}

export function DiagonalMarqueeCarouselPreview() {
  return (
    <DiagonalMarqueeCarousel className="absolute -inset-5 h-[calc(100%+2.5rem)] max-h-none w-[calc(100%+2.5rem)] max-w-none" />
  );
}
