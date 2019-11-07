export interface IWord {
  name: string;
  translation: string;
  chapter: number;
  article?: string;
  point: number;
  sentence: string;
  active: boolean;
}
