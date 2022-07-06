import axios from 'axios';

export const paigInstance = axios.create({
  baseURL: 'https://b70598b4-4bb2-48d8-abdd-6049b6bce6c6.mock.pstmn.io',
});

export const aidenInstance = axios.create({
  baseURL: 'https://bc-dev-aiden.ngrok.io',
});
