const API_URL = 'http://localhost:3001';

const Endpoints = {
  searchEvents: (searchText: string) => `${API_URL}/events/?q=${searchText}`,
  getSchema: `${API_URL}/schema`,
  getEvents: `${API_URL}/events`,
};

export default Endpoints;
