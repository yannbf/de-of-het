export enum Audios {
  Wrong = 'wrong',
  Correct = 'correct',
}

interface IAudioSet {
  [key: string]: HTMLAudioElement;
}

class AudioService {
  private audios: IAudioSet = {};

  constructor() {
    this.init();
  }

  private init() {
    this.audios[Audios.Wrong] = new Audio(require('../assets/wrong.wav'));
    this.audios[Audios.Correct]  = new Audio(require('../assets/correct.wav'));
  }

  public play(audio: Audios) {
    this.audios[audio].play();
  }
}

export const audioService = new AudioService();
