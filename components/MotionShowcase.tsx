'use client'

import Image from 'next/image'
import styles from '../styles/motion-showcase.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

const slides = [
  {
    id: '01',
    eyebrow: 'Webdesign and development',
    title: 'Sites e sistemas com design claro e construção inteligente.',
    description:
      'Projetos em stacks modernas, pensados para carregar bem, organizar melhor e converter com mais clareza.',
    primaryImage:
      'https://images.pexels.com/photos/17036353/pexels-photo-17036353.jpeg?auto=compress&cs=tinysrgb&w=1400',
    secondaryImage: '/sites.mp4',
    accent: 'Interfaces, systems and performance',
    tint: 'rgba(170, 126, 66, 0.22)',
  },
  {
    id: '02',
    eyebrow: 'Branding',
    title: 'Marcas com direção visual, consistência e presença.',
    description:
      'Identidade, web design e imagens pensadas para a marca manter unidade e valor em cada ponto de contato.',
    primaryImage: '/illustrations/2h-media-NmSPbe0bDtc-unsplash.jpg',
    secondaryImage: '/illustrations/branding_mockup.png',
    accent: 'Identity, web and visuals',
    tint: 'rgba(94, 74, 62, 0.26)',
  },
  {
    id: '03',
    eyebrow: 'Digital marketing',
    title: 'Conteúdo e campanhas para atrair, posicionar e gerar resultado.',
    description:
      'Artes para Instagram, conteúdo audiovisual e direção de comunicação para transformar presença digital em movimento real.',
    primaryImage:
      'https://images.pexels.com/photos/7129665/pexels-photo-7129665.jpeg?auto=compress&cs=tinysrgb&w=1400',
    secondaryImage: '/motion.mp4',
    accent: 'Content, campaigns and growth',
    tint: 'rgba(198, 161, 95, 0.2)',
  },
]

export default function MotionShowcase() {
  const { t } = useLanguage()

  const activeSlides = slides.map((slide, i) => ({
    ...slide,
    eyebrow: t.motionShowcase.slides[i].eyebrow,
    title: t.motionShowcase.slides[i].title,
    description: t.motionShowcase.slides[i].description,
    accent: t.motionShowcase.slides[i].accent,
  }))

  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <p className={styles.kicker}>{t.motionShowcase.kicker}</p>
        <div className={styles.meta}>
          <span>{t.motionShowcase.meta1}</span>
          <span>{t.motionShowcase.meta2}</span>
        </div>
      </div>

      <ScrollStack
        className={styles.stack}
        itemDistance={200}
        itemScale={0.04}
        itemStackDistance={34}
        stackPosition="6%"
        scaleEndPosition="2%"
        baseScale={0.9}
        blurAmount={0.8}
        useWindowScroll
      >
        {activeSlides.map((slide, index) => (
          <ScrollStackItem
            key={slide.id}
            itemClassName={styles.showcaseCard}
          >
            <article
              className={styles.slide}
              style={{
                ['--card-index' as string]: index,
                ['--layer-tint' as string]: slide.tint,
              }}
            >
              <div className={styles.visual}>
                <div className={`${styles.imageWrap} ${styles.primaryWrap}`}>
                  <Image
                    src={slide.primaryImage}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 960px) 100vw, 60vw"
                    priority={index === 0}
                  />
                </div>

                <div className={`${styles.imageWrap} ${styles.secondaryWrap}`}>
                  {slide.secondaryImage.match(/\.(mp4|webm|ogg)$/) ? (
                    <video
                      src={slide.secondaryImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className={styles.video}
                    />
                  ) : (
                    <Image
                      src={slide.secondaryImage}
                      alt=""
                      fill
                      sizes="(max-width: 960px) 70vw, 28vw"
                    />
                  )}
                </div>
              </div>

              <div className={styles.copy}>
                <span className={styles.index}>{slide.id}</span>
                <p className={styles.eyebrow}>{slide.eyebrow}</p>
                <h2>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
                <span className={styles.accent}>{slide.accent}</span>
              </div>
            </article>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <p className={styles.bottomNote}>{t.motionShowcase.bottomNote}</p>
    </section>
  )
}
