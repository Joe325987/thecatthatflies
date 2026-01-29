import { HoverTilt } from "https://cdn.jsdelivr.net/npm/hover-tilt@1.0.2/dist/hover-tilt.esm.js"

new HoverTilt(document.querySelector(".hovertilt"), {
  max: 8,
  perspective: 1400,
  scale: 1.015,
  speed: 500,
  glare: true,
  "max-glare": 0.12
})