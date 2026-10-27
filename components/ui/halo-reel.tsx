"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Halo Reel ───────────────────────────────────────────────────
 * Cards ride an ellipse. Card i sits at θ = i·step + rotation on an
 * ellipse of radii (rx, ry):
 *
 *   x = rx·cos θ      y = ry·sin θ
 *
 * Progressive 3D Depth Curve:
 * The front card (cos θ ≈ 1) expands dramatically to `maxScale`.
 * Surrounding cards scale down exponentially in sequence (`depthExponent`),
 * accompanied by subtle 3D tilt (rotateY) and lighting attenuation (brightness & opacity),
 * producing an authentic, tactile 3D perspective stack.
 * ─────────────────────────────────────────────────────────────── */

export type HaloReelItem = {
  src?: string;
  alt?: string;
  bgColor?: string;
  textColor?: string;
  title?: string;
  subtitle?: string;
  category?: string; // e.g. "Ecommerce"
  role?: string;
  href?: string;
  year?: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
};

export interface HaloReelProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: HaloReelItem[];
  /** Card base width in px. @default 140 */
  cardWidth?: number;
  /** Card base height in px. @default 195 */
  cardHeight?: number;
  /** Scale of the card at the far back side of the ring. @default 0.35 */
  minScale?: number;
  /** Scale of the active card in the front. @default 1.3 */
  maxScale?: number;
  /** Exponent controlling how rapidly cards shrink away from the active front card. @default 2.7 */
  depthExponent?: number;
  /** Horizontal radius as a fraction of the stage width. @default 0.44 */
  radiusXRatio?: number;
  /** Where the ellipse is centred across the stage. `0` pins it to the left edge. @default 0.02 */
  centerXRatio?: number;
  /** Vertical radius as a fraction of the stage height. @default 0.36 */
  radiusYRatio?: number;
  /** Rotate one card forward on a timer. @default true */
  autoPlay?: boolean;
  /** Time (ms) a card is held at the front before the next step. @default 1800 */
  holdDuration?: number;
  /** Duration (ms) of one step. @default 800 */
  stepDuration?: number;
  /** Hold the autoplay while a pointer rests on a card. @default true */
  pauseOnHover?: boolean;
  /** Spin the ring by dragging it. @default true */
  draggable?: boolean;
  /** Gap between neighbouring cards. @default 1.25 */
  spread?: number;
  /** Ceiling on the number of cards drawn around the ring. @default 64 */
  maxCards?: number;
  /** Multiplier on the drag rotation. @default 1 */
  dragSensitivity?: number;
  /** Node parked in the right half of the section. Can be a React node or render function. */
  centerLabel?:
    | React.ReactNode
    | ((activeItem: HaloReelItem, activeIndex: number) => React.ReactNode);
  /** @default true */
  showCenterLabel?: boolean;
  /** Callback fired when the front card changes */
  onActiveIndexChange?: (index: number) => void;
  /** Callback fired when a card is clicked */
  onCardClick?: (item: HaloReelItem, index: number) => void;
}

const TAU = Math.PI * 2;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function HaloReel({
  items,
  cardWidth = 140,
  cardHeight = 195,
  minScale = 0.35,
  maxScale = 1.3,
  depthExponent = 2.7,
  radiusXRatio = 0.44,
  centerXRatio = 0.02,
  radiusYRatio = 0.36,
  autoPlay = true,
  holdDuration = 1800,
  stepDuration = 800,
  pauseOnHover = true,
  draggable = true,
  spread = 1.25,
  maxCards = 64,
  dragSensitivity = 1,
  centerLabel,
  showCenterLabel = true,
  onActiveIndexChange,
  onCardClick,
  className,
  style,
  ...props
}: HaloReelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = items.length;

  const rotation = useMotionValue(0);
  const draggingRef = React.useRef(false);
  const hoverRef = React.useRef(false);

  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () =>
      setSize({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isCompact = size.w > 0 && size.w < 768;
  const effectiveRadiusXRatio = isCompact ? 0.36 : radiusXRatio;
  const effectiveCenterXRatio = isCompact ? 0.01 : centerXRatio;

  const radiusX = size.w * effectiveRadiusXRatio;
  const radiusY = size.h * radiusYRatio;

  // Sized by the stage and filled by repeating items
  const slots = clamp(
    Math.ceil(
      TAU *
        Math.max(
          radiusX / (cardWidth * spread || 1),
          radiusY / (cardHeight * spread || 1),
        ),
    ),
    count || 1,
    Math.max(count || 1, maxCards),
  );
  const step = slots ? TAU / slots : 0;

  // Active item tracking
  const [activeSlot, setActiveSlot] = React.useState(0);

  React.useEffect(() => {
    if (!step || !count) return;

    const checkIndex = (latest: number) => {
      const slot = Math.round(-latest / step);
      setActiveSlot((prev) => {
        if (prev !== slot) {
          const normalized = ((slot % count) + count) % count;
          onActiveIndexChange?.(normalized);
          return slot;
        }
        return prev;
      });
    };

    checkIndex(rotation.get());
    const unsub = rotation.on("change", checkIndex);
    return () => unsub();
  }, [rotation, step, count, onActiveIndexChange]);

  const activeIndex = count ? ((activeSlot % count) + count) % count : 0;
  const activeItem = items[activeIndex] ?? items[0];

  // Continuous responsive fit
  const fit = size.w
    ? clamp(
        Math.min(
          size.w / (radiusX + cardWidth || 1),
          size.h / (2 * radiusY + cardHeight || 1),
        ),
        0.45,
        1,
      )
    : 1;
  const cardW = cardWidth * fit;
  const cardH = cardHeight * fit;

  // Autoplay
  React.useEffect(() => {
    if (!autoPlay || reduceMotion || !count) return;

    let timer = 0;
    let controls: ReturnType<typeof animate> | undefined;

    const tick = () => {
      timer = window.setTimeout(() => {
        if (draggingRef.current || (pauseOnHover && hoverRef.current)) {
          tick();
          return;
        }
        controls = animate(rotation, rotation.get() - step, {
          duration: stepDuration / 1000,
          ease: [0.4, 0, 0.2, 1],
          onComplete: tick,
        });
      }, holdDuration);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [
    autoPlay,
    count,
    holdDuration,
    pauseOnHover,
    reduceMotion,
    rotation,
    step,
    stepDuration,
  ]);

  /* ── drag & click ─────────────────────────────────────────── */

  const dragRef = React.useRef({
    left: 0,
    top: 0,
    angle: 0,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const pointerAngle = (e: React.PointerEvent) => {
    const { left, top } = dragRef.current;
    return Math.atan2(
      (e.clientY - top - size.h / 2) / (radiusY || 1),
      (e.clientX - left - size.w * effectiveCenterXRatio) / (radiusX || 1),
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || (e.pointerType === "mouse" && e.button !== 0)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      left: rect.left,
      top: rect.top,
      angle: pointerAngle(e),
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    if (
      Math.hypot(
        e.clientX - dragRef.current.startX,
        e.clientY - dragRef.current.startY,
      ) > 5
    ) {
      dragRef.current.moved = true;
    }
    const angle = pointerAngle(e);
    const delta =
      ((angle - dragRef.current.angle + Math.PI * 3) % TAU) - Math.PI;
    dragRef.current.angle = angle;
    rotation.set(rotation.get() + delta * dragSensitivity);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const snapped = Math.round(rotation.get() / step) * step;
    if (reduceMotion) {
      rotation.set(snapped);
      return;
    }
    animate(rotation, snapped, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
  };

  const spinBy = (direction: number) => {
    const target = Math.round(rotation.get() / step) * step - direction * step;
    if (reduceMotion) {
      rotation.set(target);
      return;
    }
    animate(rotation, target, {
      duration: stepDuration / 1000,
      ease: [0.4, 0, 0.2, 1],
    });
  };

  const spinToSlot = (targetSlot: number) => {
    const target = -targetSlot * step;
    if (reduceMotion) {
      rotation.set(target);
      return;
    }
    animate(rotation, target, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!direction) return;
    e.preventDefault();
    spinBy(direction);
  };

  if (!count) return null;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"] ?? "Image carousel"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative h-[100dvh] w-full touch-pan-y select-none overflow-hidden outline-none",
        draggable && "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className,
      )}
      style={{
        perspective: 1200,
        ...style,
      }}
      {...props}
    >
      {showCenterLabel ? (
        <div
          className="pointer-events-none absolute inset-y-0 z-0 flex flex-col justify-between px-4 sm:px-8 lg:px-14 py-6 sm:py-10"
          style={{
            left: isCompact
              ? Math.max(160, size.w * 0.42)
              : size.w * effectiveCenterXRatio + radiusX + (cardW * maxScale) / 2 + 28,
            right: 0,
          }}
        >
          {centerLabel ? (
            typeof centerLabel === "function" ? (
              centerLabel(activeItem, activeIndex)
            ) : (
              centerLabel
            )
          ) : (
            <>
              {/* Top: Selected works */}
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-neutral-900 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                  Selected Works
                </span>
                <span className="text-xs font-mono text-neutral-400 ml-2">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
              </div>

              {/* Middle: Project title & Category */}
              <div className="my-auto pointer-events-auto flex flex-col items-start gap-2 max-w-lg">
                {activeItem?.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                    {activeItem.category}
                  </span>
                )}
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                  {activeItem?.title}
                </h3>
                {activeItem?.description && (
                  <p className="text-sm sm:text-base text-neutral-600 line-clamp-2 mt-2">
                    {activeItem.description}
                  </p>
                )}
                {activeItem?.href && (
                  <a
                    href={activeItem.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors group"
                  >
                    <span>Ver projeto</span>
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                )}
              </div>

              {/* Bottom: hints */}
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Arraste para explorar</span>
              </div>
            </>
          )}
        </div>
      ) : null}

      {Array.from({ length: slots }, (_, i) => (
        <WheelCard
          key={i}
          item={items[i % count]}
          decorative={i >= count}
          index={i}
          step={step}
          rotation={rotation}
          radiusX={radiusX}
          radiusY={radiusY}
          centerXRatio={effectiveCenterXRatio}
          minScale={minScale}
          maxScale={maxScale}
          depthExponent={depthExponent}
          width={cardW}
          height={cardH}
          onHoverChange={(hovered) => {
            hoverRef.current = hovered;
          }}
          onClick={() => {
            if (dragRef.current.moved) return;
            const currentFrontSlot = Math.round(-rotation.get() / step);
            const normalizedFront = ((currentFrontSlot % slots) + slots) % slots;
            const thisSlot = ((i % slots) + slots) % slots;

            if (normalizedFront !== thisSlot) {
              spinToSlot(i);
            } else {
              if (onCardClick) {
                onCardClick(items[i % count], i % count);
              } else if (items[i % count].href) {
                window.location.href = items[i % count].href!;
              }
            }
          }}
        />
      ))}
    </div>
  );
}

/* ── card ────────────────────────────────────────────────────── */

function WheelCard({
  item,
  index,
  step,
  rotation,
  radiusX,
  radiusY,
  centerXRatio,
  minScale,
  maxScale,
  depthExponent,
  width,
  height,
  decorative,
  onHoverChange,
  onClick,
}: {
  item: HaloReelItem;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  centerXRatio: number;
  minScale: number;
  maxScale: number;
  depthExponent: number;
  width: number;
  height: number;
  decorative: boolean;
  onHoverChange: (hovered: boolean) => void;
  onClick?: () => void;
}) {
  const cos = useTransform(rotation, (r) => Math.cos(index * step + r));
  const sin = useTransform(rotation, (r) => Math.sin(index * step + r));

  const x = useTransform(cos, (c) => c * radiusX);
  const y = useTransform(sin, (s) => s * radiusY);

  // Progressive 3D scaling with exponential curve:
  // Active front card reaches `maxScale` (e.g. 1.3+).
  // Near cards drop to ~1.05, mid cards to ~0.65, back cards to ~0.35.
  const scale = useTransform(cos, (c) => {
    const t = Math.max(0, (c + 1) / 2);
    const curved = Math.pow(t, depthExponent);
    return minScale + (maxScale - minScale) * curved;
  });

  // Strict z-indexing based on scale ensures the front card is always on top
  const zIndex = useTransform(scale, (s) => Math.round(s * 1000));

  // Opacity falloff into the depth
  const opacity = useTransform(cos, (c) => {
    const t = Math.max(0, (c + 1) / 2);
    return 0.35 + 0.65 * Math.pow(t, 1.4);
  });

  // 3D rotation along the ellipse curve
  const rotateY = useTransform(sin, (s) => s * -15);
  const rotateZ = useTransform(sin, (s) => s * -2.5);

  // Depth lighting attenuation
  const filter = useTransform(cos, (c) => {
    const t = Math.max(0, (c + 1) / 2);
    const b = 0.70 + 0.30 * Math.pow(t, 1.6);
    return `brightness(${b.toFixed(3)})`;
  });

  return (
    <motion.div
      role={decorative ? undefined : "group"}
      aria-roledescription={decorative ? undefined : "slide"}
      aria-hidden={decorative || undefined}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      onClick={onClick}
      style={{
        x,
        y,
        scale,
        zIndex,
        opacity,
        rotateY,
        rotateZ,
        filter,
        width,
        height,
        left: `${centerXRatio * 100}%`,
        top: "50%",
        marginLeft: -width / 2,
        marginTop: -height / 2,
        transformStyle: "preserve-3d",
      }}
      className="absolute overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.22)] border border-black/10 bg-neutral-900 cursor-pointer transition-shadow hover:shadow-[0_28px_56px_rgba(0,0,0,0.32)]"
    >
      {item.src ? (
        <img
          src={item.src}
          alt={decorative ? "" : (item.alt ?? item.title ?? "")}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-1 bg-neutral-900 p-3 text-center text-white"
          style={{
            backgroundColor: item.bgColor,
            color: item.textColor,
          }}
        >
          {item.title ? (
            <span className="text-xl font-semibold leading-none">
              {item.title}
            </span>
          ) : null}
          {item.subtitle ? (
            <span className="text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
              {item.subtitle}
            </span>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}

export default HaloReel;
