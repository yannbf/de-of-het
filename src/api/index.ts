import axios from 'axios';
import { IWord } from '@/types';
import { getWordListWithArticles } from '@/constants';

const baseURL = 'https://myapiwhoknows/api';

export const leaderboardAPI = axios.create({
  baseURL
});

export const getWords = async (): Promise<IWord[]> => {
  return Promise.resolve(getWordListWithArticles());
};

export const getLeaderboard = async (): Promise<any> => {
  try {
    const response = await leaderboardAPI.get('/leaderboard');
    return response.data;
  } catch (err) {
    console.error(`Error when adding to leaderboard: ${err}`);
  }
};

export const addToLeaderboard = async (data: any): Promise<any> => {
  try {
    const response = await leaderboardAPI.post('/leaderboard', data);
    return response.data;
  } catch (err) {
    console.error(`Error when adding to leaderboard: ${err}`);
  }
};
