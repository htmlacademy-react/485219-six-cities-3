function convertStarsToPercent(stars: number, maxStars: number = 5): string {
  return `${(stars / maxStars) * 100}%`;
}

export { convertStarsToPercent };
