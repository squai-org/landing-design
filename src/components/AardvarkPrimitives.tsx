import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SplitBounceTextProps {
  text: string;
  className?: string;
}

export function SplitBounceText({ text, className = '' }: SplitBounceTextProps) {
  return (
    <span className={`relative z-10 inline-flex items-center whitespace-nowrap ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {Array.from(text).map((char, idx) => (
          <span
            key={`${char}-${idx}`}
            className="aardvark-char"
            style={{ '--char-i': idx } as React.CSSProperties}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Single organic Squai rounded superellipse block extracted verbatim from Brand Guideline mark.
 */
export function SquaiSingleBlock({
  color,
  className = '',
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="293 298 199 201"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M301.875 464.584C299.686 460.273 294.981 450.754 294.841 446.004C293.933 415.328 294.583 384.41 294.573 353.694C294.572 351.011 295.382 347.694 296.199 345.159C301.682 328.106 313.764 313.957 329.748 305.871C342.896 299.325 350.854 299.811 364.963 299.857L391.129 299.948C406.571 299.983 430.79 298.253 444.804 302.295C466.884 308.664 486.126 330.753 488.872 353.522C489.759 359.623 489.454 367.061 489.471 373.313L489.491 403.063C489.483 412.667 490.184 429.965 489.392 438.854C488.915 443.866 487.81 448.798 486.105 453.535C479.921 470.71 468.091 484.235 451.429 492.033C437.277 498.657 428.141 497.722 412.932 497.679C395.629 497.63 378.016 497.718 360.683 497.633C351.283 497.679 346.296 496.661 337.402 494.095C319.753 487.045 311.845 480.484 301.875 464.584Z"
      />
    </svg>
  );
}

export type SquaiBlockPreset =
  | 'hero-left'
  | 'hero-right'
  | 'mod-1'
  | 'mod-2'
  | 'mod-3'
  | 'mod-4'
  | 'mentor-laura'
  | 'mentor-sebastian'
  | 'signup-form'
  | 'pill-diag-tl'
  | 'pill-diag-tr'
  | 'pill-bottom-spread'
  | 'pill-edge-mix';

interface BlockPlacement {
  posClass: string;
  sizeClass: string;
  rot: string;
  shiftX: string;
  shiftY: string;
  rotDelta: string;
  delay: string;
  dur: string;
}

const BLOCK_PRESETS: Record<SquaiBlockPreset, [BlockPlacement, BlockPlacement]> = {
  // Hero left white card: hugs upper-left & bottom-left outer contour
  'hero-left': [
    {
      posClass: 'top-8 -left-7 sm:-left-9',
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
      rot: '-22deg',
      shiftX: '-5px',
      shiftY: '-4px',
      rotDelta: '-8deg',
      delay: '0.1s',
      dur: '4.9s',
    },
    {
      posClass: '-bottom-6 left-8 sm:left-10',
      sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
      rot: '17deg',
      shiftX: '-3px',
      shiftY: '4px',
      rotDelta: '7deg',
      delay: '0.9s',
      dur: '4.4s',
    },
  ],
  // Hero right marigold card: hugs top-right & bottom-right outer contour
  'hero-right': [
    {
      posClass: '-top-6 right-8 sm:right-10',
      sizeClass: 'w-22 h-22 sm:w-26 sm:h-26',
      rot: '20deg',
      shiftX: '4px',
      shiftY: '-4px',
      rotDelta: '9deg',
      delay: '0.35s',
      dur: '4.6s',
    },
    {
      posClass: 'bottom-10 -right-7 sm:-right-9',
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
      rot: '-16deg',
      shiftX: '5px',
      shiftY: '4px',
      rotDelta: '-7deg',
      delay: '1.15s',
      dur: '5.1s',
    },
  ],
  // Module 1: hugs upper-left side & bottom-right corner
  'mod-1': [
    {
      posClass: 'top-10 -left-6 sm:-left-8',
      sizeClass: 'w-22 h-22 sm:w-26 sm:h-26',
      rot: '-26deg',
      shiftX: '-4px',
      shiftY: '-3px',
      rotDelta: '-8deg',
      delay: '0.1s',
      dur: '4.7s',
    },
    {
      posClass: '-bottom-5 -right-4 sm:-right-5',
      sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
      rot: '22deg',
      shiftX: '4px',
      shiftY: '4px',
      rotDelta: '7deg',
      delay: '0.6s',
      dur: '4.3s',
    },
  ],
  // Module 2: hugs top-right rounded corner & lower-left side
  'mod-2': [
    {
      posClass: '-top-6 -right-4 sm:-right-6',
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
      rot: '18deg',
      shiftX: '4px',
      shiftY: '-5px',
      rotDelta: '8deg',
      delay: '0.25s',
      dur: '5.0s',
    },
    {
      posClass: 'bottom-14 -left-5 sm:-left-7',
      sizeClass: 'w-20 h-20 sm:w-22 sm:h-22',
      rot: '-14deg',
      shiftX: '-4px',
      shiftY: '3px',
      rotDelta: '-7deg',
      delay: '0.85s',
      dur: '4.5s',
    },
  ],
  // Module 3: hugs bottom-left corner & upper-right side
  'mod-3': [
    {
      posClass: '-bottom-6 -left-4 sm:-left-6',
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
      rot: '-20deg',
      shiftX: '-4px',
      shiftY: '4px',
      rotDelta: '-8deg',
      delay: '0.15s',
      dur: '4.8s',
    },
    {
      posClass: 'top-14 -right-5 sm:-right-7',
      sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
      rot: '26deg',
      shiftX: '4px',
      shiftY: '-3px',
      rotDelta: '9deg',
      delay: '0.7s',
      dur: '4.4s',
    },
  ],
  // Module 4: hugs top-left edge & lower-right edge
  'mod-4': [
    {
      posClass: '-top-6 left-7',
      sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
      rot: '-13deg',
      shiftX: '-3px',
      shiftY: '-5px',
      rotDelta: '-8deg',
      delay: '0.3s',
      dur: '4.6s',
    },
    {
      posClass: 'bottom-12 -right-5 sm:-right-7',
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
      rot: '17deg',
      shiftX: '5px',
      shiftY: '4px',
      rotDelta: '8deg',
      delay: '0.95s',
      dur: '5.1s',
    },
  ],
  // Mentor cards are 30% larger from sm up: offsets are scaled here and the
  // block sizes read the card's --mc-block-lg / --mc-block-sm variables.
  // Mentor Laura (portrait overlaps left side, role stamp top-right -> blocks hug top-left-center & bottom-right)
  'mentor-laura': [
    {
      posClass: '-top-7 left-10 sm:-top-9 sm:left-13',
      sizeClass: 'w-22 h-22 sm:w-[var(--mc-block-lg)] sm:h-[var(--mc-block-lg)]',
      rot: '-19deg',
      shiftX: '-4px',
      shiftY: '-4px',
      rotDelta: '-8deg',
      delay: '0.15s',
      dur: '4.8s',
    },
    {
      posClass: '-bottom-6 right-8 sm:-bottom-8 sm:right-[42px]',
      sizeClass: 'w-20 h-20 sm:w-[var(--mc-block-sm)] sm:h-[var(--mc-block-sm)]',
      rot: '21deg',
      shiftX: '4px',
      shiftY: '4px',
      rotDelta: '8deg',
      delay: '0.75s',
      dur: '4.4s',
    },
  ],
  // Mentor Sebastián (portrait overlaps left side, role stamp top-right -> blocks hug top-center-left & bottom-left)
  'mentor-sebastian': [
    {
      posClass: '-top-7 left-16 sm:-top-9 sm:left-[83px]',
      sizeClass: 'w-22 h-22 sm:w-[var(--mc-block-lg)] sm:h-[var(--mc-block-lg)]',
      rot: '15deg',
      shiftX: '4px',
      shiftY: '-4px',
      rotDelta: '7deg',
      delay: '0.3s',
      dur: '5.0s',
    },
    {
      posClass: '-bottom-6 left-8 sm:-bottom-8 sm:left-[42px]',
      sizeClass: 'w-20 h-20 sm:w-[var(--mc-block-sm)] sm:h-[var(--mc-block-sm)]',
      rot: '-21deg',
      shiftX: '-4px',
      shiftY: '4px',
      rotDelta: '-8deg',
      delay: '0.95s',
      dur: '4.5s',
    },
  ],
  // Signup Form card: top-right edge + lower-left corner
  'signup-form': [
    {
      posClass: 'top-10 -right-5 sm:-right-9',
      sizeClass: 'w-24 h-24 sm:w-32 sm:h-32',
      rot: '23deg',
      shiftX: '5px',
      shiftY: '-4px',
      rotDelta: '9deg',
      delay: '0.2s',
      dur: '4.9s',
    },
    {
      posClass: '-bottom-6 -left-5 sm:-left-7',
      sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
      rot: '-19deg',
      shiftX: '-4px',
      shiftY: '5px',
      rotDelta: '-8deg',
      delay: '0.8s',
      dur: '4.5s',
    },
  ],
  // Pill presets (min w-8 h-8 = 32px, zero adjacent-pill overlap & varied angles)
  'pill-diag-tl': [
    {
      posClass: '-top-3.5 left-1',
      sizeClass: 'w-9 h-9',
      rot: '-22deg',
      shiftX: '-2px',
      shiftY: '-3px',
      rotDelta: '-8deg',
      delay: '0.1s',
      dur: '4.4s',
    },
    {
      posClass: '-bottom-3.5 right-2',
      sizeClass: 'w-8 h-8',
      rot: '19deg',
      shiftX: '2px',
      shiftY: '3px',
      rotDelta: '8deg',
      delay: '0.6s',
      dur: '4.7s',
    },
  ],
  'pill-diag-tr': [
    {
      posClass: '-top-3.5 right-2',
      sizeClass: 'w-8 h-8',
      rot: '25deg',
      shiftX: '2px',
      shiftY: '-3px',
      rotDelta: '9deg',
      delay: '0.2s',
      dur: '4.6s',
    },
    {
      posClass: '-bottom-3 left-2',
      sizeClass: 'w-9 h-9',
      rot: '-16deg',
      shiftX: '-2px',
      shiftY: '3px',
      rotDelta: '-7deg',
      delay: '0.75s',
      dur: '4.3s',
    },
  ],
  'pill-bottom-spread': [
    {
      posClass: '-bottom-3.5 left-1',
      sizeClass: 'w-9 h-9',
      rot: '-27deg',
      shiftX: '-3px',
      shiftY: '3px',
      rotDelta: '-8deg',
      delay: '0.15s',
      dur: '4.8s',
    },
    {
      posClass: '-top-3 right-1',
      sizeClass: 'w-8 h-8',
      rot: '13deg',
      shiftX: '2px',
      shiftY: '-2px',
      rotDelta: '7deg',
      delay: '0.8s',
      dur: '4.4s',
    },
  ],
  'pill-edge-mix': [
    {
      posClass: '-top-3 left-4',
      sizeClass: 'w-8 h-8',
      rot: '-12deg',
      shiftX: '-1px',
      shiftY: '-3px',
      rotDelta: '-7deg',
      delay: '0.25s',
      dur: '4.5s',
    },
    {
      posClass: '-bottom-3.5 right-1',
      sizeClass: 'w-10 h-10',
      rot: '24deg',
      shiftX: '3px',
      shiftY: '3px',
      rotDelta: '8deg',
      delay: '0.85s',
      dur: '4.9s',
    },
  ],
};

export interface SquaiCornerBlocksProps {
  /** Color derived from parent card/pill primary hue */
  backColor: string;
  /** Optional fallback / kept for backwards prop compatibility */
  frontColor?: string;
  size?: 'card' | 'pill';
  preset?: SquaiBlockPreset;
  visible?: boolean;
  /** When true (module cards), corner blocks sit hidden behind card and reveal on hover/focus */
  hoverOnly?: boolean;
}

/**
 * Asymmetrical Squai logo accent blocks protruding BEHIND (z-0)
 * cards and pills with varied sizes, inclinations, and edge placements.
 */
export function SquaiCornerBlocks({
  backColor,
  size = 'card',
  preset,
  visible = true,
  hoverOnly = false,
}: SquaiCornerBlocksProps) {
  if (!visible) return null;

  const hoverClass = hoverOnly ? 'squai-corner-hover-only' : '';
  const activePreset: SquaiBlockPreset =
    preset ?? (size === 'pill' ? 'pill-diag-tl' : 'hero-left');
  const pair = BLOCK_PRESETS[activePreset];

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none select-none ${hoverClass}`}
      aria-hidden="true"
    >
      {pair.map((b, i) => (
        <div
          key={`${activePreset}-${i}`}
          className={`absolute ${b.posClass} z-0`}
        >
          <div
            className="squai-block-drift"
            style={
              {
                '--base-rot': b.rot,
                '--shift-x': b.shiftX,
                '--shift-y': b.shiftY,
                '--rot-delta': b.rotDelta,
                '--anim-delay': b.delay,
                '--anim-dur': b.dur,
              } as React.CSSProperties
            }
          >
            <SquaiSingleBlock
              color={backColor}
              className={b.sizeClass}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Circular social link buttons matching Aardvark's header/footer (.button-social)
 * with Instagram & LinkedIn for Squai.
 */
export function SquaiSocialLinks({
  bgClass = 'bg-[#F4F6FF]',
  iconColorClass = 'text-[#0A0C1A]',
}: {
  bgClass?: string;
  iconColorClass?: string;
}) {
  return (
    <ul className="flex items-center gap-2.5" aria-label="Redes sociales de Squai">
      <li>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ir a Instagram de Squai"
          className={`aardvark-squash-btn w-[var(--social)] h-[var(--social)] rounded-full ${iconColorClass} cursor-pointer focus-visible:outline-offset-2`}
        >
          <span className={`aardvark-squash-btn__bg ${bgClass}`} aria-hidden="true" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[45%] h-[45%] relative z-10"
            aria-hidden="true"
          >
            <path
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ir a LinkedIn de Squai"
          className={`aardvark-squash-btn w-[var(--social)] h-[var(--social)] rounded-full ${iconColorClass} cursor-pointer focus-visible:outline-offset-2`}
        >
          <span className={`aardvark-squash-btn__bg ${bgClass}`} aria-hidden="true" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[45%] h-[45%] relative z-10"
            aria-hidden="true"
          >
            <path
              d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.21 16.16 8.21C14.37 8.21 13.48 9.19 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.61V19.5H20.44V13.02Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
}

export interface AardvarkButtonAltProps {
  label: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'dark' | 'periwinkle' | 'marigold' | 'white';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  tabIndex?: number;
  ariaExpanded?: boolean;
}

const ALT_VARIANTS: Record<
  NonNullable<AardvarkButtonAltProps['variant']>,
  { bg: string; text: string; iconBg: string; iconColor: string }
> = {
  dark: {
    bg: 'bg-[#0A0C1A]',
    text: 'text-[#F4F6FF]',
    iconBg: 'bg-[#0A0C1A]',
    iconColor: 'text-[#F9C24D]',
  },
  periwinkle: {
    bg: 'bg-[#8A8EF9]',
    text: 'text-[#0A0C1A]',
    iconBg: 'bg-[#8A8EF9]',
    iconColor: 'text-[#0A0C1A]',
  },
  marigold: {
    bg: 'bg-[#F9C24D]',
    text: 'text-[#0A0C1A]',
    iconBg: 'bg-[#F9C24D]',
    iconColor: 'text-[#0A0C1A]',
  },
  white: {
    bg: 'bg-white',
    text: 'text-[#0A0C1A]',
    iconBg: 'bg-white',
    iconColor: 'text-[#0A0C1A]',
  },
};

/** One size, copied from the reference `.button-alt` (56/48 design px tall,
 * 20/17 px bold text, 8 px radius). `size` stays for API compatibility. */
const REFERENCE_BUTTON = {
  height: 'h-[var(--btn-h)]',
  textPad: 'px-[var(--btn-px)]',
  textSize: 'text-[length:var(--btn-fs)]',
  radius: 'rounded-[var(--btn-r)]',
  iconSize: 'w-[max(16px,calc(var(--u)*20))] h-[max(16px,calc(var(--u)*20))]',
};

const ALT_SIZES: Record<NonNullable<AardvarkButtonAltProps['size']>, typeof REFERENCE_BUTTON> = {
  sm: REFERENCE_BUTTON,
  md: REFERENCE_BUTTON,
  lg: REFERENCE_BUTTON,
};

export function AardvarkButtonAlt({
  label,
  onClick,
  href,
  type = 'button',
  disabled = false,
  variant = 'dark',
  size = 'lg',
  icon,
  className = '',
  tabIndex,
  ariaExpanded,
}: AardvarkButtonAltProps) {
  const colors = ALT_VARIANTS[variant];
  const dims = ALT_SIZES[size];

  const content = (
    <>
      <span className={`aardvark-btn-alt__text-wrap ${dims.height} flex-1 sm:flex-initial`}>
        <span
          className={`aardvark-btn-alt__bg ${colors.bg} ${dims.radius}`}
          aria-hidden="true"
        />
        <span
          className={`aardvark-btn-alt__text-outer ${dims.textPad} font-display font-bold tracking-[-0.02em] ${dims.textSize} ${colors.text}`}
        >
          <SplitBounceText text={label} />
        </span>
      </span>

      <span className={`aardvark-btn-alt__icon-wrap ${dims.height} w-auto`}>
        <span
          className={`aardvark-btn-alt__bg ${colors.iconBg} ${dims.radius}`}
          aria-hidden="true"
        />
        <span className={`aardvark-btn-alt__icon-outer ${colors.iconColor}`} aria-hidden="true">
          {icon ?? <ArrowRight className={dims.iconSize} strokeWidth={2.5} />}
        </span>
      </span>
    </>
  );

  const shared = `aardvark-btn-alt ${dims.height} whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={shared} tabIndex={tabIndex}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={shared}
      tabIndex={tabIndex}
      aria-expanded={ariaExpanded}
    >
      {content}
    </button>
  );
}

interface AardvarkPillButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  href?: string;
  active?: boolean;
  withBlocks?: boolean;
  blockPreset?: SquaiBlockPreset;
  blockBackColor?: string;
  blockFrontColor?: string;
  bgClass?: string;
  textClass?: string;
  className?: string;
  ariaPressed?: boolean;
}

export function AardvarkPillButton({
  label,
  onClick,
  href,
  active = false,
  withBlocks = false,
  blockPreset = 'pill-diag-tl',
  blockBackColor = '#d2d7fc',
  blockFrontColor = '#b4bafc',
  bgClass = 'bg-[#F4F6FF]',
  textClass = 'text-[#0A0C1A]',
  className = '',
  ariaPressed,
}: AardvarkPillButtonProps) {
  const inner = (
    <>
      {withBlocks && (
        <SquaiCornerBlocks
          size="pill"
          preset={blockPreset}
          visible={active}
          backColor={blockBackColor}
          frontColor={blockFrontColor}
        />
      )}
      <span className={`aardvark-nav-pill__bg ${bgClass} relative z-1`} aria-hidden="true" />
      <span
        className={`aardvark-nav-pill__inner px-[var(--pill-px)] font-display font-bold text-[length:var(--pill-fs)] tracking-[-0.015em] ${textClass}`}
      >
        <SplitBounceText text={label} />
      </span>
    </>
  );

  const shared = `aardvark-nav-pill h-[var(--pill-h)] whitespace-nowrap shrink-0 cursor-pointer ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        data-active={active ? 'true' : 'false'}
        aria-current={active ? 'page' : undefined}
        className={shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? 'true' : 'false'}
      aria-pressed={ariaPressed ?? active}
      className={shared}
    >
      {inner}
    </button>
  );
}

/* ============================================================
   Extracted Aardvark Organic Flowing Backdrop SVGs (Squai Tones)
   ============================================================ */
export function HeroRibbonSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1920 1403"
      className="w-full h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d="M1695.07 151.632c64.24-31.904 131.73-7.088 176.11 42.102 40.17 44.528 55.82 98.753 61.56 156.949 6.14 62.16-2.03 123.84-5.58 185.677-3.39 59.179-3.64 118.025 17.39 174.679 10.72 28.85 25.42 55.218 51.77 73.069 37.97 25.728 81.74 25.202 122.06-1.291 30.97-20.344 55.08-47.559 77.62-76.157v264.039c-58.87 19.501-116.27 43.421-174.84 63.861-44.23 15.43-89.54 27.89-136.8 29.55-56.61 1.99-105.94-14-133.74-67.126-13.24-25.298-23.19-53.745-27.66-81.867-8.42-53.005-10.61-106.956-17.74-160.196-3.59-26.806-9.33-54.115-19.35-79.093-19.69-49.067-66.48-65.165-114.61-43.224-29.94 13.641-55.74 33.151-80.62 54.275-37 31.428-73.18 64.005-112.05 92.942-22.25 16.551-48.12 29.623-74.19 39.345-41.28 15.384-78.24 2.614-110.36-26.124-31.39-28.102-50.42-64.67-70.05-100.935-11.96-22.103-24.51-43.883-37.17-65.587-3.23-5.562-7.57-10.586-11.94-15.365-27.98-30.646-58.88-30.767-82.42 3.757-19.89 29.17-34.427 61.976-51.488 93.082-21.019 38.326-40.302 77.781-63.758 114.584-39.329 61.713-97.979 101.491-163.715 129.981-59.999 26.005-121.922 47.501-182.611 71.931-42.824 17.23-83.179 39.5-118.338 69.59-34.021 29.14-59.637 64.2-65.374 110.44-3.776 30.48 4.892 57.48 24.129 81.15 36.407 44.77 86.741 62.81 141.012 73.57 59.97 11.89 120.728 11.08 181.378 12.17 61.192 1.09 122.363 2.43 181.917 18.66 37.051 10.09 72.202 24.64 102.005 49.74 39.753 33.48 57.763 73.94 57.933 120.19H226.533c-32.085-15.58-61.858-36.47-89.169-62.36-48.299-45.77-73.99-103.5-81.404-168.72-13.75-120.96 23.385-223.39 117.115-302.9 47.855-40.585 105.059-63.358 164.62-80.624 55.764-16.161 111.972-30.874 167.344-48.27 81.076-25.473 126.787-83.135 138.108-165.858 7.617-55.667 10.094-112.134 12.801-168.345 3.398-70.665 5.964-141.34 26.451-209.729 14.422-48.177 37.313-91.294 76.771-124.226 54.474-45.449 114.019-50.265 177.528-22.453 57.146 25.041 98.342 69.929 140.732 113.528 45.29 46.59 90.28 93.645 138.12 137.532 35.4 32.486 79.11 50.935 127.66 56.479 46.17 5.271 86.45-6.277 120.85-38.421 37.86-35.39 61.71-79.931 84.98-125.169 20.81-40.424 41.24-81.195 64.93-119.919 19.97-32.658 45.75-61.364 81.1-78.913"
        fill="#969bfc"
        opacity="0.45"
      />
      <path
        d="M957.607 848.011c20.203-17.228 39.917-18.164 60.863-1.598 24.27 19.186 39.37 45.721 56.29 70.767 20.96 31.054 43.97 59.866 77.1 79.279 41.59 24.371 83.09 22.411 120.71-5.291 52.77-38.829 86.04-99.464 141.58-134.68 55.94-35.443 123.8-13.01 158.65 32.594 24.12 31.568 37.13 67.993 49.5 105.059 15.59 46.719 30.26 93.909 49.19 139.269 17.07 40.92 45.88 73.4 88.67 90.21 28.36 11.14 57.68 9.52 87.02 3.74 41.87-8.25 78.62-28.78 116.22-47.63 33.58-16.84 67.56-33.2 102.44-47.01 26.07-10.33 55.11-9.2 82.05-3.2 56.46 12.08 85.31 54.13 71.77 110.37-5.95 24.65-16.34 48.25-25.99 72.01l-200.78 210.09c-1.38 21.8-56.65 62.14-72.01 78.21-83.44-113.45-193.12-200.93-308.88-278.2-32.4-21.62-122-69.18-168.22-88.23-46.23-19.06-83.56-40.17-105.3-15.59-6.32 7.14-8.24 18.89-4.06 34.64 17.72 66.79 82.4 117.75 128.69 165.26 41.55 42.65 79.03 83.98 109.75 135.17 27.95 54.83 33.11 111.22.04 165.6-11.32 18.46-23.77 36.39-36.62 54.15h-398.04c11.97-17.53 23.77-35.16 35.19-53.04 51.48-80.58 72.49-167.09 44.19-261.54-17.6-58.74-55.7-101.56-103.96-136.93-77.07-56.49-164.4-70.38-256.68-58.91-90.677 11.28-180.716 36.61-272.653 33.39-53.175-1.87-76.339-50.6-54.608-99.18 12.558-28.06 37.122-45.2 63.16-59.83 65.899-37.02 146.081-33.01 217.687-51.68 64.376-16.8 100.398-59.8 109.708-125.523 3.03-21.431 6.031-42.89 10.139-64.133 3.621-18.691 12.243-34.869 27.194-47.613"
        fill="#777ae3"
        opacity="0.35"
      />
    </svg>
  );
}

export function FlowRibbonSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1920 1078"
      className="w-full h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d="M1036.04 224.719c46.68-18.686 94.68-27.593 145.01-17.193 69.48 14.366 110.3 57.983 128.04 125.006 15.96 60.318 6.45 120.498-1.31 180.811-8.29 64.443-17.14 128.943-21.73 193.698-3.4 47.933 9.35 93.628 35.22 135.082 24.6 39.428 58.71 63.776 105.27 70.7 51.26 7.619 100.97-1.424 150.87-11.351 44.59-8.86 89.22-18.234 134.27-23.788 37.99-4.686 76.51-2.359 112.24 14.388 64.95 30.445 87.52 98.718 76.62 164.068-9.87 59.15-42.57 105.15-84.56 145.85-44.84 43.48-98.21 75.46-148.83 111.16-30.84 21.75-60.77 44.41-86.53 71.35H1247.7c35.22-37.78 74.41-71.86 110.25-109.11 18.75-19.49 36.56-40.97 49.88-64.35 26.16-45.95 9.65-92.6-37.47-116.63-29.31-14.95-60.63-23-92.65-29.34-47.63-9.41-95.64-17.46-142.48-29.89-26.81-7.12-53.14-19.24-76.97-33.6-37.72-22.74-50.73-59.621-48.21-102.647 2.46-42.061 19.25-79.708 35.43-117.636 9.87-23.115 19.1-46.499 28.22-69.907 2.34-5.995 3.57-12.517 4.6-18.912 6.58-40.968-12.55-65.234-54.23-62.184-35.208 2.579-69.935 11.611-104.902 17.609-43.082 7.393-85.968 16.846-129.373 21.383-72.784 7.609-140.416-13.554-203.621-47.289-57.69-30.79-113.048-65.891-169.936-98.199-40.136-22.803-82.672-40.545-128.108-49.343-43.977-8.506-87.368-6.74-127.138 17.541-26.209 16.007-41.953 39.592-48.511 69.378-12.397 56.359 4.802 106.985 30.146 156.167 28.004 54.347 66.44 101.409 103.329 149.563 37.221 48.583 74.231 97.305 98.581 154.026 15.151 35.28 25.634 71.86 24.527 110.8-1.931 68.15-36.554 114.5-96.26 144.23-45.75 22.78-95.324 30.65-144.973 39.2-58.87 10.13-118.149 19.35-175.929 34.11-76.784 19.6-104.832 50.54-156.366 104.26l-188.143-192.09c6.548-.9 13.143-1.65 19.782-2.23 64.263-5.7 128.992-6.19 193.515-9.07 59.582-2.68 118.457-8.23 172.797-36.44 68.743-35.69 95.923-102.94 71.734-176.51C47.238 982.71 14 937.57-20.86 893.052c-40.325-51.507-81.776-102.294-119.092-155.941-47.12-67.745-66.267-144.502-59.071-226.985 5.782-66.292 34.986-122.322 81.434-168.708 86.136-86.027 189.43-120.689 309.992-96.782 61.552 12.208 114.972 42.82 165.548 78.705 47.349 33.599 93.841 68.447 141.911 100.971 70.388 47.621 143.971 47.529 215.775 4.92 48.318-28.674 94.065-61.87 139.754-94.725 57.434-41.309 114.359-83.274 180.648-109.788Z"
        fill="#d2d7fc"
        opacity="0.65"
      />
    </svg>
  );
}

export function BenefitsRibbonSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1920 1080"
      className="w-full h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d="M622.956 92.984c69.68-13.332 124.091 11.33 166.146 66.451 37.834 49.612 52.094 108.845 68.023 167.531 17.015 62.708 33.544 125.678 54.097 187.256 15.213 45.582 44.491 82.912 84.258 111.302 37.83 27.001 78.65 36.435 124.32 25.002 50.27-12.591 92.73-39.978 135.02-68.255 37.81-25.261 75.44-51.01 114.93-73.391 33.31-18.877 69.78-31.477 109.2-29.686 71.66 3.254 118.64 57.683 133.6 122.222 13.54 58.421.94 113.436-22.27 167.116-24.77 57.338-61.83 107.317-94.92 159.675-31.66 50.112-60.42 101.453-69.5 161.203-4.62 30.42-4.55 60.61 9.84 89 14.94 29.48 39.11 48.49 69.45 55.47-81.24 30.12-208.99 79.29-324.5 122.86-38.79-25.16-64.29-60.23-63.06-111.3.7-28.55 5.79-58.25 15.52-85.01 18.34-50.44 42.58-98.69 62.16-148.71 9.86-25.18 18.08-51.846 21.44-78.548 6.57-52.461-26.55-89.231-79.28-93.381-32.8-2.591-64.81 1.965-96.82 8.372-47.599 9.543-95.035 20.489-143.067 26.944-27.486 3.684-56.451 2.571-83.964-1.568-43.559-6.563-69.693-35.655-83.846-76.364-13.828-39.799-12.733-81.006-12.31-122.239.259-25.129-.162-50.268-.701-75.384-.135-6.434-1.493-12.93-2.997-19.229-9.605-40.368-36.568-55.459-73.901-36.683-31.54 15.866-60.163 37.506-90.168 56.437-36.968 23.326-72.964 48.481-111.324 69.293-64.323 34.899-134.904 41.246-206.21 34.284-65.083-6.353-129.663-17.582-194.586-25.645-45.808-5.696-91.896-5.797-137.238 3.474-43.882 8.982-83.289 27.227-110.731 64.886-18.082 24.823-23.594 52.639-18.247 82.666 10.129 56.81 45.402 96.993 87.647 132.721C-94.353 1001.24-40.827 1030 11.69 1060.35c52.987 30.63 105.833 61.47 150.046 104.54 27.508 26.8 51.194 56.57 65.086 92.97 24.309 63.69 10.075 119.77-33.697 170.09a258 258 0 0 1-4.983 5.57l-241.336-31.48c5.88-39.47-6.454-79.83-36.872-115.17-37.549-43.63-85.539-72.6-134.789-100.38-56.973-32.14-114.712-63.18-169.726-98.45-69.469-44.54-116.549-108.116-141.485-187.068-20.043-63.453-14.519-126.396 10.628-187.033 46.63-112.453 128.778-184.025 249.305-208.106 61.535-12.29 122.605-4.466 183.068 9.317 56.605 12.908 112.898 27.297 169.758 38.935 83.258 17.039 151.197-11.223 201.213-78.079 33.656-44.99 63.206-93.172 92.831-141.018 37.24-60.153 73.756-120.717 124.837-170.592 35.975-35.14 76.904-61.747 127.382-71.412"
        fill="#fdebc9"
        opacity="0.7"
      />
      <path
        d="M639.856 543.657c37.333-18.775 64.31-3.688 73.902 36.683 1.487 6.29 2.845 12.787 2.992 19.218.543 25.128.965 50.267.701 75.383-.422 41.233-1.517 82.44 12.312 122.24 14.153 40.709 40.298 69.797 83.857 76.359 27.513 4.14 56.478 5.253 83.964 1.568 48.032-6.454 95.464-17.413 143.066-26.944 31.99-6.403 64.02-10.962 96.82-8.372 52.75 4.146 85.86 40.904 79.28 93.369-3.36 26.701-11.58 53.368-21.44 78.549-19.59 50.03-43.84 98.27-62.17 148.71-9.73 26.76-14.82 56.45-15.51 84.99-1.24 51.09 24.26 86.16 63.06 111.32-68.89 25.98-133.43 49.98-181.16 66.77-16.458-30.02-21.454-63.6-17.627-98.22 5.421-48.96 15.437-97.43 24.427-145.94 7.14-38.48 13.4-76.73 7.59-116.12-8.39-56.91-56.908-109.587-123.034-105.734-33.859 1.974-65.045 13.287-96.708 24.223-30.14 10.406-61.045 20.841-92.433 24.881-46.346 5.96-83.604-12.5-108.187-54.086-19.571-33.127-25.751-69.564-29.062-106.964-2.666-30.169-3.029-60.765-14.966-89.377-10.306-24.705-28.009-33.475-54.038-28.224-19.269 3.895-34.639 13.869-46.863 28.482-13.885 16.611-26.908 33.95-39.942 51.251-40.002 53.055-92.354 73.198-156.813 56.577-28.843-7.434-56.675-18.865-84.849-28.818-42.496-15.017-84.505-32.025-130.67-31.798-29.872.151-59.682 3.217-84.253 21.687-42.549 31.983-45.887 85.942-.264 113.45 24.344 14.675 50.13 27.67 76.613 37.928 58.981 22.852 119.504 41.802 178.143 65.472 86.292 34.83 155.98 89.5 196.065 176.48 25.095 54.48 37.693 110.51 24.633 170.54-5.719 26.28-14.355 50.27-25.59 72.18l-213.539-27.85c1.68-1.82 3.34-3.68 4.978-5.56 43.771-50.32 58.007-106.4 33.698-170.09-13.892-36.4-37.579-66.17-65.087-92.97-44.226-43.07-97.072-73.91-150.047-104.54-52.516-30.36-106.047-59.12-152.723-98.594-42.241-35.716-77.518-75.911-87.646-132.722-5.36-30.023.152-57.839 18.247-82.666 27.445-37.646 66.853-55.892 110.735-64.874 45.343-9.271 91.43-9.169 137.238-3.473 64.923 8.063 129.516 19.288 194.586 25.645 71.301 6.949 141.883.601 206.21-34.285 38.363-20.799 74.357-45.967 111.337-69.296 30.005-18.931 58.627-40.572 90.167-56.438"
        fill="#FFFFFF"
        opacity="0.85"
      />
    </svg>
  );
}

export function FaqRibbonSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1919 1032"
      className="w-full h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d="M1020.68 122.72c46.69-18.686 94.68-27.594 145.02-17.194 69.47 14.366 110.29 57.983 128.03 125.006 15.96 60.318 6.45 120.498-1.31 180.811-8.29 64.443-17.13 128.943-21.73 193.698-3.4 47.933 9.35 93.629 35.22 135.083 24.6 39.428 58.71 63.775 105.27 70.699 51.26 7.619 100.97-1.423 150.87-11.35 44.59-8.86 89.22-18.234 134.27-23.788 38-4.687 76.51-2.36 112.24 14.387 64.95 30.446 87.52 98.719 76.62 164.066-9.87 59.152-42.57 105.152-84.56 145.852-44.84 43.48-98.21 75.46-148.83 111.16-48.44 34.17-94.66 70.58-125.93 122.3-15.92 26.34-27.41 54.25-24.99 85.99 3.49 45.74 31.13 79.67 76.96 94.75 163.65 53.87 400.02-1.71 550.17-63.19 1.62-.66 3.29-1.33 5-2.01v198.97c-247.62 111.02-459.19 118.91-579.5 77.54-116.22-39.96-259.45-123.39-341.49-219.49-36.79-43.08-54.96-91.64-30.67-146.46 11.57-26.1 27.65-51.6 46.88-72.59 36.26-39.57 77.13-74.86 114.37-113.57 18.76-19.49 36.56-40.97 49.89-64.35 26.16-45.95 9.64-92.6-37.48-116.625-29.31-14.953-60.63-23.004-92.65-29.342-47.63-9.409-95.64-17.461-142.48-29.89-26.8-7.121-53.13-19.242-76.97-33.601-37.72-22.742-50.723-59.623-48.21-102.648 2.466-42.062 19.26-79.709 35.43-117.637 9.87-23.115 19.1-46.499 28.22-69.906 2.34-5.996 3.58-12.518 4.6-18.913 6.58-40.968-12.55-65.234-54.22-62.184-35.216 2.579-69.943 11.611-104.909 17.609-43.082 7.393-85.969 16.846-129.373 21.383-72.784 7.609-140.417-13.554-203.623-47.289-57.689-30.79-113.048-65.891-169.935-98.199-40.136-22.803-82.672-40.544-128.109-49.342-43.977-8.505-87.366-6.741-127.136 17.54-26.209 16.007-41.953 39.593-48.511 69.378-12.397 56.359 4.801 106.985 30.146 156.167 28.003 54.347 66.438 101.409 103.328 149.563 37.221 48.583 74.232 97.305 98.582 154.025 15.151 35.286 25.632 71.858 24.526 110.811-1.931 68.14-36.553 114.49-96.26 144.22-45.749 22.78-95.324 30.65-144.973 39.2-58.87 10.13-118.15 19.35-175.93 34.11-80.643 20.58-107.526 53.68-164.322 112.54a639 639 0 0 0-16.882 18.19l-132.568-221.71c60.66-4.84 121.702-5.43 182.561-8.15 59.581-2.68 118.458-8.23 172.798-36.44 68.743-35.69 95.922-102.94 71.732-176.511C31.88 880.71-1.357 835.57-36.217 791.052c-40.324-51.507-81.777-102.294-119.093-155.941-47.119-67.745-66.267-144.502-59.071-226.985 5.782-66.292 34.988-122.322 81.436-168.708 86.136-86.027 189.43-120.687 309.991-96.781 61.551 12.208 114.972 42.819 165.548 78.704 47.348 33.599 93.84 68.447 141.911 100.971 70.388 47.621 143.971 47.529 215.775 4.92 48.319-28.674 94.064-61.87 139.753-94.725 57.435-41.309 114.36-83.273 180.647-109.787"
        fill="#eef0fd"
        opacity="0.95"
      />
    </svg>
  );
}

export function BadgeRibbonSvg({ colorClass = 'text-[#fedea0]' }: { colorClass?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 2011 145"
      className={`w-full h-full object-cover pointer-events-none select-none ${colorClass}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M522.714 32.133C534.929-7.994 565.736-17.48 603.542 2.98c5.886 3.193 11.838 6.62 16.876 10.891 19.662 16.71 39.246 33.517 58.324 50.81 31.328 28.382 62.157 57.239 102.545 74.207a178 178 0 0 0 16.8 6.112l-297.999.001q.803-4.204 1.63-8.401c6.872-34.866 10.678-70.564 20.996-104.467M1304.23 0c13.85 30.538 27.44 61.18 43.29 90.735 10.34 19.282 23.9 37.752 39.21 54.266L1227.85 145c-12.02-12.149-25.07-23.381-39.89-33.111-49.63-32.602-124.63-32.93-168.83 18.126-4.2 4.853-8.08 9.857-11.72 14.985H871.583c9.615-3.528 18.995-8.649 28.068-15.546 22.791-17.333 44.297-37.79 61.068-60.43C977.283 46.647 992.605 23.429 1007.61 0zM2056.78 0c5.35 17.74 8.57 36.296 11.93 54.504 1.02 5.551 1.67 11.168 2.15 16.81l-37 73.686h-400.09c16.99-10.341 33.39-21.603 49.44-33.287 50.15-36.51 98.13-75.785 148.68-111.712z"
      />
    </svg>
  );
}

/**
 * Custom editorial spot illustrations centered inside the 4 Flow Step cards
 */
export function FlowStepIllustration({ stepIndex }: { stepIndex: number }) {
  if (stepIndex === 0) {
    return (
      <svg viewBox="0 0 220 150" className="w-48 h-36 mx-auto" aria-hidden="true">
        <rect
          x="26"
          y="18"
          width="168"
          height="112"
          rx="20"
          fill="#F4F6FF"
          stroke="#0A0C1A"
          strokeWidth="3.5"
        />
        <rect x="44" y="38" width="96" height="12" rx="6" fill="#0A0C1A" />
        <rect x="44" y="60" width="132" height="16" rx="8" fill="#FFFFFF" stroke="#0A0C1A" strokeWidth="2.5" />
        <rect x="44" y="84" width="84" height="16" rx="8" fill="#FFFFFF" stroke="#0A0C1A" strokeWidth="2.5" />
        <rect x="136" y="84" width="40" height="28" rx="10" fill="#F9C24D" stroke="#0A0C1A" strokeWidth="2.5" />
        <path
          d="M150 98l4 4 9-9"
          stroke="#0A0C1A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (stepIndex === 1) {
    return (
      <svg viewBox="0 0 220 150" className="w-48 h-36 mx-auto" aria-hidden="true">
        <rect
          x="28"
          y="24"
          width="164"
          height="104"
          rx="20"
          fill="#FFFFFF"
          stroke="#0A0C1A"
          strokeWidth="3.5"
        />
        <path
          d="M34 32l76 48 76-48"
          fill="none"
          stroke="#0A0C1A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="174" cy="34" r="20" fill="#8A8EF9" stroke="#0A0C1A" strokeWidth="3.5" />
        <path
          d="M167 34h14M174 27v14"
          stroke="#0A0C1A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="48" y="92" width="76" height="10" rx="5" fill="#0A0C1A" />
        <rect x="48" y="108" width="110" height="8" rx="4" fill="#d2d7fc" />
      </svg>
    );
  }

  if (stepIndex === 2) {
    return (
      <svg viewBox="0 0 220 150" className="w-48 h-36 mx-auto" aria-hidden="true">
        <rect
          x="22"
          y="20"
          width="176"
          height="108"
          rx="20"
          fill="#eef0fd"
          stroke="#0A0C1A"
          strokeWidth="3.5"
        />
        <rect x="40" y="38" width="140" height="22" rx="10" fill="#FFFFFF" stroke="#0A0C1A" strokeWidth="2.5" />
        <circle cx="54" cy="49" r="5" fill="#8A8EF9" />
        <rect x="66" y="45" width="90" height="8" rx="4" fill="#0A0C1A" />
        <rect x="40" y="72" width="140" height="38" rx="12" fill="#F9C24D" stroke="#0A0C1A" strokeWidth="2.5" />
        <rect x="54" y="84" width="72" height="7" rx="3.5" fill="#0A0C1A" />
        <rect x="54" y="96" width="106" height="6" rx="3" fill="#0A0C1A" opacity="0.55" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 150" className="w-48 h-36 mx-auto" aria-hidden="true">
      <rect
        x="38"
        y="16"
        width="104"
        height="118"
        rx="16"
        fill="#FFFFFF"
        stroke="#0A0C1A"
        strokeWidth="3.5"
        transform="rotate(-5 90 75)"
      />
      <rect
        x="68"
        y="22"
        width="112"
        height="114"
        rx="16"
        fill="#8A8EF9"
        stroke="#0A0C1A"
        strokeWidth="3.5"
        transform="rotate(4 124 79)"
      />
      <rect x="86" y="44" width="76" height="10" rx="5" fill="#0A0C1A" />
      <rect x="86" y="64" width="60" height="8" rx="4" fill="#FFFFFF" />
      <rect x="86" y="80" width="68" height="8" rx="4" fill="#FFFFFF" />
      <circle cx="156" cy="108" r="16" fill="#F9C24D" stroke="#0A0C1A" strokeWidth="3" />
      <path
        d="M150 108l4 4 8-8"
        stroke="#0A0C1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
