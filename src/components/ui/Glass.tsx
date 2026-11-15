import React, { HTMLAttributes, useEffect, useState } from 'react';
import { LiquidGlass } from './liquid-glass';
import SceneErrorBoundary from '../3d/SceneErrorBoundary';
import { cn } from '../../lib/cn';

export type GlassVariant = 'pill' | 'button' | 'chip' | 'panel';

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  contentClassName?: string;
  radius?: number;
  tint?: number;
  children?: React.ReactNode;
}

export default function Glass({
  variant = 'panel',
  className,
  contentClassName,
  radius,
  tint,
  children,
  style,
  ...rest
}: GlassProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, []);

  // Variant "panel" stays plain frosted glass (lightweight, handles large surfaces)
  if (variant === 'panel' || reducedMotion) {
    const isPillOrButton = variant === 'pill' || variant === 'button' || variant === 'chip';
    return (
      <div
        className={cn(
          'relative border border-border bg-surface/90 backdrop-blur-xl shadow-xl transition-all duration-200',
          variant === 'pill' && 'rounded-full px-4 py-2 border-border/80 bg-surface/85',
          variant === 'button' &&
            'rounded-xl sm:rounded-2xl border-brass/40 bg-surface/90 shadow-[0_4px_20px_rgba(201,169,110,0.12)]',
          variant === 'chip' && 'rounded-full border-border/80 bg-surface/85 px-2.5 py-0.5',
          variant === 'panel' && 'rounded-2xl sm:rounded-3xl',
          className
        )}
        style={{
          boxShadow: isPillOrButton
            ? undefined
            : '0 24px 60px -24px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(237, 232, 220, 0.08)',
          ...style,
        }}
        {...rest}
      >
        {contentClassName ? <div className={contentClassName}>{children}</div> : children}
      </div>
    );
  }

  // Refracting variants (pill, button, chip) capped at <= 400x200px
  let defaultRadius = 999;
  let bevel = 8;
  let scale = 16;
  let aberration = 1;
  let defaultTint = 0.14;
  let variantClass = '';

  if (variant === 'pill') {
    defaultRadius = 999;
    bevel = 8;
    scale = 16;
    aberration = 1;
    defaultTint = 0.14;
    variantClass = 'rounded-full border border-border/80 bg-surface/85 shadow-lg max-w-[400px]';
  } else if (variant === 'button') {
    defaultRadius = radius ?? 16;
    bevel = 8;
    scale = 18;
    aberration = 1.5;
    defaultTint = 0.16;
    variantClass =
      'rounded-xl sm:rounded-2xl border border-brass/40 bg-surface/90 shadow-[0_4px_20px_rgba(201,169,110,0.14)] max-w-[400px]';
  } else if (variant === 'chip') {
    defaultRadius = 999;
    bevel = 6;
    scale = 12;
    aberration = 1;
    defaultTint = 0.12;
    variantClass = 'rounded-full border border-border/80 bg-surface/85 shadow-sm max-w-[280px]';
  }

  return (
    <SceneErrorBoundary
      fallback={
        <div
          className={cn(
            'relative border border-border bg-surface/90 backdrop-blur-xl',
            variantClass,
            className
          )}
          style={style}
          {...rest}
        >
          {contentClassName ? <div className={contentClassName}>{children}</div> : children}
        </div>
      }
    >
      <LiquidGlass
        radius={radius ?? defaultRadius}
        bevelDepth={bevel}
        scale={scale}
        aberration={aberration}
        tint={tint ?? defaultTint}
        className={cn(variantClass, className)}
        contentClassName={contentClassName}
        style={style}
        {...rest}
      >
        {children}
      </LiquidGlass>
    </SceneErrorBoundary>
  );
}
