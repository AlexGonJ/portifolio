'use client'

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import styles from './ScrollStack.module.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`${styles.scrollStackCard} ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, { translateY: number; scale: number; rotation: number; blur: number }>>(new Map());
  const isUpdatingRef = useRef(false);
  const cachedPositionsRef = useRef<{ cardTops: number[]; endTop: number } | null>(null);

  const parsePercentage = useCallback((value: string, total: number) => {
    if (value.endsWith('%')) {
      return (parseFloat(value) / 100) * total;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (start >= end) return 0;
    return Math.min(1, Math.max(0, (scrollTop - start) / (end - start)));
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller?.scrollTop ?? 0,
        containerHeight: scroller?.clientHeight ?? 0
      };
    }
  }, [useWindowScroll]);

  // Walk offsetParent chain for stable absolute position
  const getAbsoluteTop = (el: HTMLElement): number => {
    let top = 0;
    let node: HTMLElement | null = el;
    while (node) {
      top += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return top;
  };

  const measurePositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // Temporarily strip transforms for clean reads
    const saved = cards.map(c => c.style.transform);
    cards.forEach(c => { c.style.transform = 'none'; });

    const cardTops = cards.map(c => getAbsoluteTop(c));

    const endElement = useWindowScroll
      ? (document.querySelector(`.${styles.scrollStackEnd}`) as HTMLElement)
      : (scrollerRef.current?.querySelector(`.${styles.scrollStackEnd}`) as HTMLElement);

    const endTop = endElement ? getAbsoluteTop(endElement) : 0;

    // Restore
    cards.forEach((c, i) => { c.style.transform = saved[i] || 'translateZ(0)'; });

    cachedPositionsRef.current = { cardTops, endTop };
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    if (!cachedPositionsRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const { cardTops, endTop: endElementTop } = cachedPositionsRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card || cardTops[i] === undefined) return;

      const cardTop = cardTops[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTriggerStart = cardTops[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, useWindowScroll,
    onStackComplete, calculateProgress, parsePercentage, getScrollData
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(`.${styles.scrollStackCard}`)
        : scroller.querySelectorAll(`.${styles.scrollStackCard}`)
    ) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      (card.style as any).webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      (card.style as any).webkitPerspective = '1000px';
    });

    // Cache positions & start listening to native scroll
    measurePositions();

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      scroller.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateCardTransforms();

    const onResize = () => {
      measurePositions();
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
      scroller.removeEventListener('scroll', handleScroll);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance, itemScale, itemStackDistance, stackPosition,
    scaleEndPosition, baseScale, scaleDuration, rotationAmount,
    blurAmount, useWindowScroll, onStackComplete,
    measurePositions, handleScroll, updateCardTransforms
  ]);

  return (
    <div className={`${styles.scrollStackScroller} ${className}`.trim()} ref={scrollerRef}>
      <div className={styles.scrollStackInner}>
        {children}
        <div className={styles.scrollStackEnd} />
      </div>
    </div>
  );
};

export default ScrollStack;
