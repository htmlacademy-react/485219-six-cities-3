export const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string => localStorage.getItem('token') ?? '';
