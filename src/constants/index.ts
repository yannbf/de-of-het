import { wordList } from '../data/words';

export const getWordList = () => wordList;

export const getWordListWithArticles = (chapter: number = 1, quantity: number = 8) => {
  chapter = Math.floor(Math.random() * 5) + 1;
  return Promise.resolve(
    getShuffledArr(
      wordList.filter((word: any) => {
        return word.article && word.chapter === chapter;
      })
    ).splice(0, quantity)
  );
};

const getShuffledArr: any = (arr: any) => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_: any, i: any) => i !== rand))];
};
