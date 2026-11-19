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

/* Organic backdrop shapes live in Backdrops.tsx (SectionBackdrop). */
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
