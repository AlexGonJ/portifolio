"use client";

import styles from "@/styles/testimonials.module.scss";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  /**
   * Optional portrait (e.g. "/testimonials/joanna.jpg").
   * When provided, it replaces the initials monogram automatically.
   */
  image?: string;
}

export interface TestimonialCardsProps {
  items?: TestimonialItem[];
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCards({ items = [], className }: TestimonialCardsProps) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")}>
      {items.map((item, idx) => (
        <figure key={`${item.name}-${idx}`} data-testimonial-card className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <span className={styles.cardIndex}>{String(idx + 1).padStart(2, "0")}</span>
          </div>

          <blockquote className={styles.quote}>
            <p>{item.quote}</p>
          </blockquote>

          <figcaption className={styles.author}>
            <span className={styles.avatar} aria-hidden={!item.image}>
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
              ) : (
                <span className={styles.initials}>{getInitials(item.name)}</span>
              )}
            </span>
            <span className={styles.authorText}>
              <span className={styles.authorName}>{item.name}</span>
              <span className={styles.authorRole}>{item.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
