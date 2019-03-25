import { wordList } from '../data/words';
import { IWord } from '../types/word';

export const getWordList = () => wordList;

export const getWordListWithArticles = (chapter: number = 1, quantity: number = 7) =>
  getShuffledArr(
    wordList.filter((word: IWord) => {
      return word.article && word.chapter === chapter;
    })
  ).splice(0, quantity);

const getShuffledArr: any = (arr: any) => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_: any, i: any) => i !== rand))];
};
