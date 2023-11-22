export function randomInt(n) {
  return Math.floor(Math.random() * n)
}

export function randomColor() {
  const hue = Math.random() * 6
  const r = Math.ceil(clamp(2 - Math.abs(2 - hue), 0, 1) * 256)
  const g = Math.ceil(clamp(2 - Math.abs(4 - hue), 0, 1) * 256)
  const b = Math.ceil(clamp(2 - Math.min(6 - hue, hue), 0, 1) * 256)
  return `rgb(${r},${g},${b})`
}

function clamp(x, min, max) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}
