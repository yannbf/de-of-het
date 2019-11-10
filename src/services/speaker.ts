import { debugInfo } from './debug';

class SpeakerService {
  private voice: SpeechSynthesisVoice | undefined = undefined;

  constructor() {
    this.setVoice('nl-NL');
  }

  async setVoice(locale: string) {
    this.voice = await this.getVoiceByLocale(locale);
  }

  private get synth(): SpeechSynthesis {
    return window.speechSynthesis;
  }

  private get onReady(): Promise<any> {
    return new Promise((resolve) => (this.synth.onvoiceschanged = resolve));
  }

  private async getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise(async (resolve) => {
      // Only wait when browsers support it, otherwise call it directly
      if ('onvoiceschanged' in this.synth) {
        await this.onReady;
        resolve(this.synth.getVoices());
      }

      resolve(this.synth.getVoices());
    });
  }

  private async getVoiceByLocale(locale: string): Promise<SpeechSynthesisVoice> {
    const voices = await this.getVoices();

    const voice = voices.find((v: SpeechSynthesisVoice) => v.lang === locale);
    if (voice === undefined) {
      const errorMsg = `Could not find a voice with the given locale: ${locale}`;
      debugInfo.update(errorMsg);
      throw new Error(errorMsg);
    }

    return voice;
  }

  public speak(word: string) {
    const utterThis = new SpeechSynthesisUtterance(word);
    if (this.voice) {
      utterThis.voice = this.voice;
      this.synth.speak(utterThis);
    } else {
      const errorMsg = `Could not speak: Speech voice is not available`;
      debugInfo.update(errorMsg);
      throw new Error(errorMsg);
    }
  }
}

export const speakerService = new SpeakerService();
