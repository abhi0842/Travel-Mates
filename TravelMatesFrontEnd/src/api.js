import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  getNearbyTravelers: () => axios.get(`${API_BASE_URL}/travelers`),
  getMessages: () => axios.get(`${API_BASE_URL}/messages`),
  sendMessage: (message) => axios.post(`${API_BASE_URL}/messages`, message),
  getDestinations: () => axios.get(`${API_BASE_URL}/destinations`),
  getExperiences: () => axios.get(`${API_BASE_URL}/experiences`),
  shareExperience: (experience) => axios.post(`${API_BASE_URL}/experiences`, experience),
};