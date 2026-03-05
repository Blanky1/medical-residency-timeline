import React, { useState } from 'react';
import './TimelineCard.css';

const CATEGORY_LABELS = {
  origin: 'Origin',
  education: 'Education',
  regulation: 'Regulation',
  crisis: 'Crisis',
  reform: 'Reform',
};

export default function TimelineCard({ event, side }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`card card--${event.category} card--${side} ${expanded ? 'card--expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="card__tag">{CATEGORY_LABELS[event.category]}</div>
      <h3 className="card__title">{event.title}</h3>
      <p className="card__short">{event.shortDesc}</p>

      <div className={`card__detail ${expanded ? 'card__detail--visible' : ''}`}>
        <p className="card__detail-text">{event.detail}</p>
        {event.source && (
          <p className="card__source">
            —{' '}
            {event.sourceUrl ? (
              <a
                href={event.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card__source-link"
                onClick={e => e.stopPropagation()}
              >
                {event.source}
              </a>
            ) : (
              event.source
            )}
          </p>
        )}
      </div>

      <button className="card__toggle" aria-label="Toggle detail">
        <span className="card__toggle-icon">{expanded ? '−' : '+'}</span>
        <span className="card__toggle-label">{expanded ? 'less' : 'read more'}</span>
      </button>
    </div>
  );
}
