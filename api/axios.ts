import axios from 'axios';

export const httpClient = axios.create({
  // baseURL: process.env?.EXPO_PUBLIC_API_URL,
  baseURL: 'http://192.168.0.204:3000/',
});
