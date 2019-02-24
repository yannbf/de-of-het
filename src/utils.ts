import axios from 'axios';
import * as cheerio from 'cheerio';

const VALID_RESULTS = ['de', 'het'];

export const getArticle = async (word: string) => {
  const fallbackResult = 'De of het';

  try {
    const response = await axios.get(`https://www.welklidwoord.nl/${word}`);
    const html = response.data;

    const $ = cheerio.load(html);
    const result = $('#content > h1 > span').text();

    if (VALID_RESULTS.includes(result.toLowerCase())) {
      return result;
    }

    return fallbackResult;
  } catch (e) {
    return fallbackResult;
  }
};
