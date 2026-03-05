import React, { useState, useEffect, useRef } from 'react';
import TimelineCard from './TimelineCard';
import events from '../data/events.json';
import './Timeline.css';

const CATEGORIES = ['all', 'origin', 'education', 'regulation', 'crisis', 'reform'];

const ERAS = [
  { label: 'The Founding Era', startYear: 1880 },
  { label: 'War & Expansion', startYear: 1930 },
  { label: 'Institutionalization', startYear: 1960 },
  { label: 'Reform & Resistance', startYear: 1983 },
  { label: 'The Modern Crisis', startYear: 2015 },
];

function getEraForYear(year) {
  let era = ERAS[0];
  for (const e of ERAS) {
    if (year >= e.startYear) era = e;
  }
  return era.label;
}

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [activeEra, setActiveEra] = useState(ERAS[0].label);
  const itemRefs = useRef({});

  const filtered = activeFilter === 'all'
    ? events
    : events.filter(e => e.category === activeFilter);

  // Intersection observer for scroll-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.dataset.id);
            setVisibleIds(prev => new Set([...prev, id]));
            const year = Number(entry.target.dataset.year);
            setActiveEra(getEraForYear(year));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(itemRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="timeline-page">

      {/* HEADER */}
      <header className="tl-header">
        <div className="tl-header__eyebrow">1889 — Present</div>
        <h1 className="tl-header__title">
          A History of<br />
          <em>Medical Residency</em>
        </h1>
        <p className="tl-header__sub">
          From one man's addiction to a national standard — tracing how America's
          physician training system was built, entrenched, and contested.
        </p>
      </header>

      {/* STICKY ERA LABEL */}
      <div className="tl-era-bar">
        <span className="tl-era-bar__label">{activeEra}</span>
      </div>

      {/* FILTER BAR */}
      <div className="tl-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`tl-filter ${activeFilter === cat ? 'tl-filter--active' : ''} tl-filter--${cat}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="tl-body">
        <div className="tl-spine" />

        {filtered.map((event, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';
          const isVisible = visibleIds.has(event.id);

          return (
            <div
              key={event.id}
              className={`tl-row tl-row--${side} ${isVisible ? 'tl-row--visible' : ''}`}
              ref={el => itemRefs.current[event.id] = el}
              data-id={event.id}
              data-year={event.year}
            >
              {/* Left card slot */}
              <div className="tl-slot tl-slot--left">
                {side === 'left' && <TimelineCard event={event} side="left" />}
              </div>

              {/* Year node */}
              <div className={`tl-node tl-node--${event.category}`}>
                <div className="tl-node__year">{event.year}</div>
                <div className="tl-node__dot" />
              </div>

              {/* Right card slot */}
              <div className="tl-slot tl-slot--right">
                {side === 'right' && <TimelineCard event={event} side="right" />}
              </div>
            </div>
          );
        })}

        {/* End cap */}
        <div className="tl-endcap">
          <div className="tl-endcap__line" />
          <p className="tl-endcap__text">The story continues.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="tl-footer">
        <p>Based on research by Wright & Schachar (2020), Fargen & Rosen (2013), Cofer et al. (2018), and ACGME institutional records.</p>
      </footer>
    </div>
  );
}
