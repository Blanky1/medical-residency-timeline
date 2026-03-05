# Medical Residency Timeline

An interactive timeline tracing the history of medical residency in America — from William Halsted's founding program at Johns Hopkins (1889) to the modern unionization movement.

## Stack
- React 18
- Plain CSS (no UI library)
- JSON data file for events

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm start
# → opens at http://localhost:3000

# Build for production
npm run build
```

## Project Structure

```
src/
  components/
    Timeline.jsx        # Main timeline layout + filter logic
    Timeline.css
    TimelineCard.jsx    # Individual event card (expandable)
    TimelineCard.css
  data/
    events.json         # All 20 timeline events — edit here to add/change events
  App.js
  App.css               # Global styles, CSS variables, grain texture
public/
  index.html
  images/               # Drop event images here, reference in events.json
```

## Adding Events

Open `src/data/events.json` and add an object:

```json
{
  "id": 21,
  "year": 2024,
  "title": "Your Event Title",
  "category": "reform",
  "shortDesc": "One sentence teaser shown on the card.",
  "detail": "Full paragraph shown when user clicks 'read more'.",
  "source": "Author, Publication (Year)",
  "image": null
}
```

**Categories:** `origin` | `education` | `regulation` | `crisis` | `reform`

## Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com → Add New Project → import repo
3. Framework: Create React App (auto-detected)
4. Hit Deploy — done. Every `git push` auto-redeploys.
