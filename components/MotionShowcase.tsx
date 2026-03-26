'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from '../styles/motion-showcase.module.scss'

const slides = [
  {
    id: '01',
    eyebrow: 'Webdesign and development',
    title: 'Sites e sistemas com design claro e construção inteligente.',
    description:
      'Projetos em stacks modernas, pensados para carregar bem, organizar melhor e converter com mais clareza.',
    primaryImage:
      'https://images.pexels.com/photos/17036353/pexels-photo-17036353.jpeg?auto=compress&cs=tinysrgb&w=1400',
    secondaryImage:
      '/illustrations/Foto de a href=httpsunsplash.compt-br@leecampbellutm_source=unsplash&utm_medium=referral&utm_content=creditCopyTextLee  Campbella na a href=httpsunsplash.compt-brfotografiasimac-prateado-ativado-de.jpg',
    accent: 'Interfaces, systems and performance',
    tint: 'rgba(170, 126, 66, 0.22)',
    smoke: 'radial-gradient(circle at 42% 46%, rgba(255,255,255,0.2), transparent 26%), radial-gradient(circle at 62% 54%, rgba(217,191,135,0.18), transparent 24%), radial-gradient(circle at 28% 62%, rgba(255,255,255,0.14), transparent 22%)',
  },
  {
    id: '02',
    eyebrow: 'Branding',
    title: 'Marcas com direção visual, consistência e presença.',
    description:
      'Identidade, web design e imagens pensadas para a marca manter unidade e valor em cada ponto de contato.',
    primaryImage:
      '/illustrations/2h-media-NmSPbe0bDtc-unsplash.jpg',
    secondaryImage:
      'https://images.pexels.com/photos/27454529/pexels-photo-27454529.jpeg?auto=compress&cs=tinysrgb&w=1400',
    accent: 'Identity, web and visuals',
    tint: 'rgba(94, 74, 62, 0.26)',
    smoke: 'radial-gradient(circle at 36% 42%, rgba(255,255,255,0.16), transparent 24%), radial-gradient(circle at 64% 38%, rgba(198,161,95,0.14), transparent 22%), radial-gradient(circle at 56% 68%, rgba(255,255,255,0.1), transparent 26%)',
  },
  {
    id: '03',
    eyebrow: 'Digital marketing',
    title: 'Conteúdo e campanhas para atrair, posicionar e gerar resultado.',
    description:
      'Artes para Instagram, conteúdo audiovisual e direção de comunicação para transformar presença digital em movimento real.',
    primaryImage:
      'https://images.pexels.com/photos/7129665/pexels-photo-7129665.jpeg?auto=compress&cs=tinysrgb&w=1400',
    secondaryImage:
      '/illustrations/2h-media-NmSPbe0bDtc-unsplash.jpg',
    accent: 'Content, campaigns and growth',
    tint: 'rgba(198, 161, 95, 0.2)',
    smoke: 'radial-gradient(circle at 48% 44%, rgba(255,255,255,0.14), transparent 24%), radial-gradient(circle at 70% 52%, rgba(217,191,135,0.18), transparent 24%), radial-gradient(circle at 32% 66%, rgba(255,255,255,0.1), transparent 24%)',
  },
]

export default function MotionShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const copyRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressLineRef = useRef<HTMLSpanElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const images = imageRefs.current.filter(Boolean)
        const copies = copyRefs.current.filter(Boolean)
        if (!sectionRef.current || images.length === 0 || copies.length === 0) return

        gsap.set(images, {
          opacity: 0,
          scale: 1.14,
          yPercent: 12,
          filter: 'blur(34px)',
        })

        gsap.set(copies, {
          opacity: 0,
          yPercent: 18,
          rotationX: -10,
          skewY: 2,
          z: -60,
        })

        gsap.set(images[0], {
          opacity: 1,
          scale: 1.16,
          yPercent: 12,
          filter: 'blur(54px)',
        })

        gsap.set(copies[0], {
          opacity: 0,
          yPercent: 24,
          rotationX: -14,
          skewY: 3,
          z: -80,
        })

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=370%',
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: self => {
              const scaledProgress = self.progress * (slides.length - 1)
              const rawIndex = Math.round(scaledProgress)
              const nextIndex = Math.max(0, Math.min(slides.length - 1, rawIndex))
              const fractional = scaledProgress - nextIndex
              const drift = Math.sin(scaledProgress * Math.PI) * 14
              const tilt = fractional * 3.5

              setActiveIndex(prev => (prev === nextIndex ? prev : nextIndex))

              sectionRef.current?.style.setProperty('--text-shift', `${drift.toFixed(2)}px`)
              sectionRef.current?.style.setProperty('--text-tilt', `${tilt.toFixed(2)}deg`)
              sectionRef.current?.style.setProperty('--text-blur', `${Math.abs(fractional * 1.6).toFixed(2)}px`)

              if (progressLineRef.current) {
                gsap.set(progressLineRef.current, { scaleX: Math.max(0.1, self.progress) })
              }
            },
          },
        })

        timeline.to(images[0], {
          scale: 1,
          yPercent: 0,
          filter: 'blur(0px)',
          duration: 1.25,
        })

        timeline.to(
          copies[0],
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            skewY: 0,
            z: 0,
            duration: 0.95,
          },
          0.16
        )

        timeline.addLabel('step-1', 1.15)

        images.forEach((image, index) => {
          if (index === 0) return

          const previousImage = images[index - 1]
          const previousCopy = copies[index - 1]
          const currentCopy = copies[index]

          timeline
            .to(
              previousImage,
              {
                opacity: 0.14,
                scale: 1.24,
                yPercent: -8,
                filter: 'blur(48px)',
                duration: 1,
              },
              'step-' + index
            )
            .to(
              previousCopy,
              {
                opacity: 0,
                yPercent: -18,
                rotationX: 12,
                skewY: -3,
                z: -120,
                duration: 0.72,
              },
              'step-' + index
            )
            .fromTo(
              image,
              {
                opacity: 0,
                scale: 1.16,
                yPercent: 12,
                filter: 'blur(54px)',
              },
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                filter: 'blur(0px)',
                duration: 1.25,
              },
              'step-' + index + '+=0.04'
            )
            .fromTo(
              currentCopy,
              {
                opacity: 0,
                yPercent: 24,
                rotationX: -14,
                skewY: 3,
                z: -80,
              },
              {
                opacity: 1,
                yPercent: 0,
                rotationX: 0,
                skewY: 0,
                z: 0,
                duration: 0.95,
              },
              'step-' + index + '+=0.16'
            )
        })

        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.showcase}>
      <div className={styles.roundedEdge} aria-hidden="true" />

      <div className={styles.backdrop}>
        <div className={styles.noise} aria-hidden="true" />
        <div className={styles.glowA} aria-hidden="true" />
        <div className={styles.glowB} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div className={styles.visualStage}>
          <div className={styles.baseGradient} aria-hidden="true" />
          <div className={styles.atmosphereFog} aria-hidden="true" />
          <div className={styles.editorialMeta} aria-hidden="true">
            <span>Web and branding</span>
            <span>Digital presence</span>
          </div>

          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={element => {
                imageRefs.current[index] = element
              }}
              className={styles.imageLayer}
              style={{
                ['--layer-tint' as string]: slide.tint,
                ['--smoke-mask' as string]: slide.smoke,
              }}
            >
              <div className={styles.imageBleed} aria-hidden="true" />
              <div className={styles.smokeVeil} aria-hidden="true" />

              <div className={`${styles.imageWrap} ${styles.primaryWrap}`}>
                <Image
                  src={slide.primaryImage}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>

              <div className={`${styles.imageWrap} ${styles.secondaryWrap}`}>
                <Image
                  src={slide.secondaryImage}
                  alt=""
                  fill
                  sizes="70vw"
                />
              </div>
            </div>
          ))}

          <div className={styles.foregroundCopy}>
            <p className={styles.kicker}>Before contact</p>

            <div className={styles.copyViewport}>
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  ref={element => {
                    copyRefs.current[index] = element
                  }}
                  className={`${styles.copyBlock} ${index === activeIndex ? styles.isActive : ''}`}
                >
                  <span className={styles.index}>{slide.id}</span>
                  <p className={styles.eyebrow}>{slide.eyebrow}</p>
                  <h2>{slide.title}</h2>
                  <p className={styles.description}>{slide.description}</p>
                  <span className={styles.accent}>{slide.accent}</span>
                </div>
              ))}
            </div>

            <div className={styles.progress}>
              <span className={styles.progressTrack} />
              <span ref={progressLineRef} className={styles.progressLine} />
            </div>

            <div className={styles.bottomNote}>
              <span>Web, branding e marketing digital trabalhando juntos para construir marcas mais fortes.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
