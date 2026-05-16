'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  accentColor?: string;
  titleColor?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  accentColor = '#FFCB08',
  titleColor = '#ffffff',
  children,
}: ScrollExpandMediaProps) => {
  const rawProgress = useMotionValue(0);
  const [showContent, setShowContent] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);

  const isMobileRef = useRef(false);
  const expandedRef = useRef(false);
  const viewportWRef = useRef(1440);

  useEffect(() => { isMobileRef.current = isMobileState; }, [isMobileState]);

  useEffect(() => {
    rawProgress.set(0);
    expandedRef.current = false;
    setShowContent(false);
  }, [mediaType, rawProgress]);

  // ─── Visual transforms (GPU-composited) ──────────────────────────────────

  const clipPath = useTransform(rawProgress, (v) => {
    const y = 22 * (1 - v);
    const x = (isMobileRef.current ? 15 : 33) * (1 - v);
    const r = 18 * (1 - v);
    return `inset(${y}% ${x}% round ${r}px)`;
  });

  const bgOpacity = useTransform(rawProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(rawProgress, [0, 1], [0.65, 0.1]);

  const textTranslatePx = useTransform(rawProgress, (v) => {
    const maxVW = isMobileRef.current ? 28 : 22;
    return v * (maxVW / 100) * viewportWRef.current;
  });
  const negTextX = useTransform(textTranslatePx, (v) => -v);

  const labelsOpacity = useTransform(rawProgress, [0, 0.4], [1, 0]);

  // ─────────────────────────────────────────────────────────────────────────

  // Lock body scroll via CSS while collapsed so listeners can stay passive
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let animControl: any = null;

    const stopAnim = () => {
      if (animControl) { animControl.stop(); animControl = null; }
    };

    // After input stops, spring to nearest 0 or 1
    const scheduleSettle = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const p = rawProgress.get();
        stopAnim();
        if (p >= 0.45) {
          animControl = animate(rawProgress, 1, {
            type: 'spring', stiffness: 260, damping: 30,
            onComplete: () => {
              expandedRef.current = true;
              document.body.style.overflow = '';
              setShowContent(true);
              animControl = null;
            },
          });
        } else {
          animControl = animate(rawProgress, 0, {
            type: 'spring', stiffness: 280, damping: 32,
            onComplete: () => { animControl = null; },
          });
        }
      }, 130);
    };

    const addProgress = (delta: number, sensitivity: number) => {
      stopAnim();
      const next = Math.min(Math.max(rawProgress.get() + delta * sensitivity, 0), 1);
      rawProgress.set(next);
      scheduleSettle();
    };

    const collapse = () => {
      expandedRef.current = false;
      document.body.style.overflow = 'hidden';
      setShowContent(false);
      stopAnim();
      animControl = animate(rawProgress, 0, {
        type: 'spring', stiffness: 200, damping: 28,
        onComplete: () => { animControl = null; },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        if (e.deltaY < -5 && window.scrollY <= 5) collapse();
        return;
      }
      addProgress(e.deltaY, 0.0018);
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (expandedRef.current) return;
      if (!touchStartY) return;
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      addProgress(delta, 0.007);
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      if (!expandedRef.current) scheduleSettle();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (settleTimer) clearTimeout(settleTimer);
      stopAnim();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [rawProgress]);

  useEffect(() => {
    const sync = () => {
      isMobileRef.current = window.innerWidth < 768;
      viewportWRef.current = window.innerWidth;
      setIsMobileState(window.innerWidth < 768);
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className='overflow-x-hidden'>
      <section className='relative overflow-hidden' style={{ height: '100dvh' }}>

        {/* Background — fades as video expands */}
        <motion.div className='absolute inset-0 z-0' style={{ opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt='Background'
            width={1920}
            height={1080}
            className='w-full h-full'
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div className='absolute inset-0' style={{ backgroundColor: 'rgba(23,35,58,0.55)' }} />
        </motion.div>

        {/* Video — clip-path expands from center, GPU layer */}
        <motion.div
          className='absolute inset-0 z-10'
          style={{ clipPath, willChange: 'clip-path' }}
        >
          {mediaType === 'video' ? (
            mediaSrc.includes('youtube.com') ? (
              <>
                <iframe
                  width='100%'
                  height='100%'
                  src={
                    mediaSrc.includes('embed')
                      ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') +
                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                      : mediaSrc.replace('watch?v=', 'embed/') +
                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                        mediaSrc.split('v=')[1]
                  }
                  className='w-full h-full'
                  style={{ border: 'none', display: 'block' }}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
                <motion.div
                  className='absolute inset-0'
                  style={{ backgroundColor: 'rgba(23,35,58,1)', opacity: overlayOpacity }}
                />
              </>
            ) : (
              <>
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload='auto'
                  className='w-full h-full'
                  style={{ objectFit: 'cover', display: 'block' }}
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <motion.div
                  className='absolute inset-0'
                  style={{
                    background: 'linear-gradient(to bottom, rgba(23,35,58,0.4) 0%, rgba(10,18,30,0.7) 100%)',
                    opacity: overlayOpacity,
                  }}
                />
              </>
            )
          ) : (
            <>
              <Image
                src={mediaSrc}
                alt={title || 'Hero'}
                width={1920}
                height={1080}
                className='w-full h-full'
                style={{ objectFit: 'cover', display: 'block' }}
              />
              <motion.div
                className='absolute inset-0'
                style={{
                  background: 'linear-gradient(to bottom, rgba(23,35,58,0.45) 0%, rgba(10,18,30,0.7) 100%)',
                  opacity: overlayOpacity,
                }}
              />
            </>
          )}
        </motion.div>

        {/* Text — z-20, always above clipped video */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 ${
            textBlend ? 'mix-blend-difference' : ''
          }`}
        >
          <motion.h1
            className='font-black pointer-events-none select-none'
            style={{
              x: negTextX,
              willChange: 'transform',
              color: titleColor,
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(52px, 8vw, 120px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            {firstWord}
          </motion.h1>
          <motion.h1
            className='font-black pointer-events-none select-none text-center'
            style={{
              x: textTranslatePx,
              willChange: 'transform',
              color: accentColor,
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(20px, 3.5vw, 56px)',
              letterSpacing: '0.04em',
              lineHeight: 1,
              textTransform: 'uppercase',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            {restOfTitle}
          </motion.h1>

          <motion.div
            className='flex flex-col items-center gap-1 mt-2'
            style={{ opacity: labelsOpacity }}
          >
            {date && (
              <p
                style={{
                  color: accentColor,
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 600,
                  fontSize: 'clamp(12px, 1.4vw, 18px)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {date}
              </p>
            )}
            {scrollToExpand && (
              <p
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(11px, 1.2vw, 14px)',
                  letterSpacing: '0.15em',
                }}
              >
                {scrollToExpand}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Children — revealed below the hero after full expansion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollExpandMedia;
