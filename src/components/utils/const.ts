const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
type City = typeof CITIES[number];


export const TIMEOUT_SHOW_ERROR = 2000;
export {CITIES};
export type { City };
