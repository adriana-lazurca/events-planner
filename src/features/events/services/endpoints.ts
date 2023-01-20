const API_URL = 'http://localhost:3001';

export const Endpoints = {
  searchEvents: (searchText: string) => `${API_URL}/events/?q=${searchText}`,
  getSchema: `${API_URL}/schema`,
  getEvents: `${API_URL}/events`,
};
