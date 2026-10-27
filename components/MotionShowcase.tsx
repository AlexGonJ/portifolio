'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/motion-showcase.module.scss';
import { useLanguage } from '@/i18n/LanguageContext';

const SLIDE_CASE_MEDIA: string[][] = [
  // 01 — Webdesign, Sistemas & E-commerce
  ['/projects/post-car1.webp', '/projects/vitrine-masculina/hero.webp'],
  // 02 — Branding & Identidade Visual
  ['/projects/PlacaAline.webp', '/projects/via-bike/cap.webp'],
  // 03 — Direção Criativa & Marketing Visual
  ['/projects/moda-home.webp', '/projects/via-bike/poster-stand.webp'],
];

export default function MotionShowcase() {
  const { t } = useLanguage();
  const slides = t.motionShowcase.slides;

  const trackRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCases, setSelectedCases] = useState<number[]>([0, 0, 0]);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Native sticky stage: only reads scroll position, never moves elements by JS (zero jitter)
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / distance));

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

      const next = Math.min(slides.length - 1, Math.floor(progress * slides.length * 0.9999));
      setActiveSlide((prev) => (prev !== next ? next : prev));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slides.length]);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const distance = rect.height - window.innerHeight;

    window.scrollTo({
      top: top + distance * ((index + 0.35) / slides.length),
      behavior: 'smooth',
    });
  };

  const selectCase = (slideIdx: number, caseIdx: number) => {
    setSelectedCases((prev) => {
      if (prev[slideIdx] === caseIdx) return prev;
      const next = [...prev];
      next[slideIdx] = caseIdx;
      return next;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <section
      id="projetos"
      ref={trackRef}
      className={styles.showcaseTrack}
      aria-label={t.motionShowcase.kicker}
    >
      <div className={styles.stickyViewport} onMouseMove={handleMouseMove}>
        {/* Custom "VER" cursor */}
        <div
          ref={cursorRef}
          className={`${styles.customCursor} ${cursorVisible ? styles.cursorActive : ''}`}
          aria-hidden="true"
        >
          <span>{t.motionShowcase.viewCursor}</span>
        </div>

        {/* Side progress rail (01 / 02 / 03) */}
        <aside className={styles.sideRail} aria-label="Pilares">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`${styles.railStep} ${idx === activeSlide ? styles.railStepActive : ''}`}
              aria-label={`${slide.id} — ${slide.eyebrow}`}
            >
              <span className={styles.railIndex}>{slide.id}</span>
              <span className={styles.railTick} />
            </button>
          ))}
          <div className={styles.railProgressTrack} aria-hidden="true">
            <div ref={progressRef} className={styles.railProgressFill} />
          </div>
        </aside>

        {/* Fullscreen acts */}
        {slides.map((slide, slideIdx) => {
          const isActive = slideIdx === activeSlide;
          const isPast = slideIdx < activeSlide;
          const isReversed = slideIdx % 2 === 1;
          const activeCaseIdx = selectedCases[slideIdx] ?? 0;
          const currentCase = slide.cases[activeCaseIdx] || slide.cases[0];

          return (
            <article
              key={slide.id}
              className={[
                styles.actScene,
                isActive ? styles.actActive : isPast ? styles.actPast : styles.actFuture,
                isReversed ? styles.actReversed : '',
              ].join(' ')}
              aria-hidden={!isActive}
            >
              {/* Full-bleed image with feathered transparency mask that reveals gradually */}
              <Link
                href={currentCase.href}
                className={styles.sceneMedia}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                aria-label={`${currentCase.title} — ${t.motionShowcase.viewCase}`}
              >
                <div className={styles.mediaMask}>
                  {slide.cases.map((project, cIdx) => (
                    <div
                      key={project.title}
                      className={`${styles.imageLayer} ${
                        cIdx === activeCaseIdx ? styles.imageLayerActive : ''
                      }`}
                    >
                      <Image
                        src={SLIDE_CASE_MEDIA[slideIdx]?.[cIdx] ?? SLIDE_CASE_MEDIA[0][0]}
                        alt={project.title}
                        fill
                        priority={slideIdx === 0 && cIdx === 0}
                        sizes="100vw"
                        className={styles.showcaseImage}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.mediaShade} aria-hidden="true" />
              </Link>

              {/* Editorial content */}
              <div className={styles.sceneContent}>
                <div className={styles.editorialCol}>
                  <div className={styles.actHeader}>
                    <span className={styles.actNumber}>{slide.id}</span>
                    <span className={styles.actEyebrow}>{slide.eyebrow}</span>
                  </div>

                  <h2 className={styles.actTitle}>{slide.title}</h2>
                  <p className={styles.actDescription}>{slide.description}</p>

                  <div className={styles.projectList} role="list">
                    {slide.cases.map((project, cIdx) => (
                      <Link
                        key={project.title}
                        href={project.href}
                        role="listitem"
                        tabIndex={isActive ? 0 : -1}
                        className={`${styles.projectRow} ${
                          cIdx === activeCaseIdx ? styles.projectRowActive : ''
                        }`}
                        onMouseEnter={() => selectCase(slideIdx, cIdx)}
                        onFocus={() => selectCase(slideIdx, cIdx)}
                      >
                        <span className={styles.projectIndex}>0{cIdx + 1}</span>
                        <span className={styles.projectName}>{project.title}</span>
                        <span className={styles.projectArrow} aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    ))}
                  </div>

                  {slideIdx === slides.length - 1 && (
                    <Link
                      href="/work"
                      className={styles.archiveLink}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>{t.motionShowcase.moreWork}</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </div>

                {/* Minimal caption anchored to the image side */}
                <div className={styles.visualCaption} key={currentCase.title}>
                  <span className={styles.captionTitle}>{currentCase.title}</span>
                  <span className={styles.captionRole}>
                    {currentCase.role} — {currentCase.year}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
