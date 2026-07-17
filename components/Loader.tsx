'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '../styles/loader.module.scss'

/*
  Análise do ícone Lexon:
  O "L" é composto por 3 peças separadas por gaps horizontais.
  
  Cada peça tem:
  - Borda esquerda: vertical (lado esquerdo da haste do L)
  - Borda direita: diagonal — inclina de baixo-esquerda para cima-direita
    criando o efeito de "fatia" ou "cunha"
  
  Peça 1 (topo):    triângulo/cunha — mais fina, mais à direita
  Peça 2 (meio):    paralelogramo largo
  Peça 3 (fundo):   paralelogramo + pé horizontal do L
  
  Viewbox: 100 x 120
  Largura da haste: ~28px
  O ângulo diagonal: ~30°
*/

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef  = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const piece1Ref  = useRef<SVGPathElement>(null)
  const piece2Ref  = useRef<SVGPathElement>(null)
  const piece3Ref  = useRef<SVGPathElement>(null)
  const piece4Ref  = useRef<SVGPathElement>(null)

  useEffect(() => {
    const pieces = [
      piece1Ref.current,
      piece2Ref.current,
      piece3Ref.current,
      piece4Ref.current,
    ].filter(Boolean) as SVGPathElement[]

    const animOrder = [
      piece4Ref.current,
      piece3Ref.current,
      piece2Ref.current,
      piece1Ref.current,
    ].filter(Boolean) as SVGPathElement[]

    // Inicia escondido e deslocado levemente para baixo para um efeito de subida elegante
    gsap.set(pieces, { opacity: 0, y: 15 })
    gsap.set(wordmarkRef.current, { opacity: 0, y: 10 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Peças entram de baixo para cima com stagger
    tl.to(animOrder, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    })

    // Wordmark
    tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25')

    // Brilho rápido nas peças
    tl.to(pieces, {
      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))',
      duration: 0.4,
      ease: 'power2.inOut',
      stagger: 0.08,
    })
    tl.to(pieces, {
      filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.15))',
      duration: 0.4,
      ease: 'power2.inOut',
    })

    tl.to({}, { duration: 0.6 })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div ref={loaderRef} className={`loader-container ${styles.loader}`}>
      <div className={styles.content}>
        {/*
          SVG do ícone "L" da Lexon obtido de public/lexon.svg
          Composto por 4 faces tridimensionais (haste esquerda, haste direita, pé superior e pé inferior)
        */}
        <svg
          className={styles.logoIcon}
          viewBox="0 0 132 154"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          {/* Peça 1: Haste vertical esquerda */}
          <path
            ref={piece1Ref}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.4004 82.418V0.917969L0.400391 27.918V113.418L29.4004 82.418Z"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="#0a0a0a"
            strokeWidth="0.8"
          />

          {/* Peça 2: Haste vertical direita/interna */}
          <path
            ref={piece2Ref}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.9004 108.418V0.917969L69.4004 27.918V82.418L39.9004 108.418Z"
            fill="rgba(255, 255, 255, 0.7)"
            stroke="#0a0a0a"
            strokeWidth="0.8"
          />

          {/* Peça 3: Pé horizontal superior */}
          <path
            ref={piece3Ref}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M47.4004 115.418L77.4004 86.418H122.4V115.418H47.4004Z"
            fill="rgba(255, 255, 255, 0.85)"
            stroke="#0a0a0a"
            strokeWidth="0.8"
          />

          {/* Peça 4: Base horizontal inferior */}
          <path
            ref={piece4Ref}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.4004 124.418V93.918L0.400391 124.418V131.418L25.4004 152.418C63.5671 152.918 138.1 153.618 130.9 152.418C123.7 151.218 114.567 133.251 110.9 124.418H29.4004Z"
            fill="rgba(255, 255, 255, 0.55)"
            stroke="#0a0a0a"
            strokeWidth="0.8"
          />
        </svg>

        {/* Wordmark */}
        <div ref={wordmarkRef} className={styles.wordmark}>
          LEXON
        </div>
      </div>
    </div>
  )
}
