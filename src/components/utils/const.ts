const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
type City = typeof CITIES[number];

export {CITIES};
export type { City };
