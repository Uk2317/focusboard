import { useState } from 'react';
import { CheckCheck, ChevronLeft, ChevronRight, Rocket } from 'lucide-react';

const SLIDES = [
  {
    id: 'make-today-count',
    eyebrow: 'Focus Notes',
    counter: '01 / 03',
    title: 'Make today count.',
    sub: 'A little focus goes a long way.',
    cardLabel: 'Website landing page',
    pct: 92,
  },
  {
    id: 'small-steps',
    eyebrow: 'Focus Notes',
    counter: '02 / 03',
    title: 'Small steps, big progress.',
    sub: 'Keep your priorities in view.',
    cardLabel: 'Fix mobile navigation',
    pct: 67,
  },
  {
    id: 'celebrate-wins',
    eyebrow: 'Focus Notes',
    counter: '03 / 03',
    title: 'Celebrate the wins.',
    sub: 'Every completed task moves you forward.',
    cardLabel: 'Onboarding copy',
    pct: 100,
  },
];

export default function FocusNotes() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') go(-1);
    if (event.key === 'ArrowRight') go(1);
  };

  return (
    <section
      className="focus-notes"
      role="region"
      aria-roledescription="carousel"
      aria-label="Focus notes"
      onKeyDown={onKeyDown}
    >
      <div className="fn-text" aria-live="polite">
        <p className="fn-eyebrow">
          {slide.eyebrow}
          <span className="dot" aria-hidden="true" />
          {slide.counter}
        </p>
        <h2 className="fn-title">{slide.title}</h2>
        <p className="fn-sub">{slide.sub}</p>
      </div>

      <div className="fn-card" aria-hidden="true">
        <div className="fn-card-top">
          {slide.pct >= 100 ? <CheckCheck size={15} /> : <Rocket size={15} />}
          <span>{slide.cardLabel}</span>
        </div>
        <div className="fn-progress">
          <div className="fn-track">
            <div className="fn-fill" style={{ width: `${slide.pct}%` }} />
          </div>
          <span className="fn-pct">{slide.pct}%</span>
        </div>
      </div>

      <div className="fn-nav">
        <button type="button" className="fn-arrow" onClick={() => go(-1)} aria-label="Previous note">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="fn-arrow" onClick={() => go(1)} aria-label="Next note">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="fn-indicators" role="group" aria-label="Choose slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`fn-seg${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
