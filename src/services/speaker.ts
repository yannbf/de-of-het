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
    return new Promise(
      (resolve) => this.synth.onvoiceschanged = resolve
    );
  }

  private getVoiceByLocale(locale: string) {
    return this.onReady.then(() => {
      const voices = this.synth.getVoices();
      const voice = voices.find((v: SpeechSynthesisVoice) => v.lang === locale);
      if (voice === undefined) {
        throw new Error(`Could not find a voice with the given locale: ${locale}`);
      }

      return voice;
    });
  }

  public speak(word: string) {
    const utterThis = new SpeechSynthesisUtterance(word);
    if (this.voice) {
      utterThis.voice = this.voice;
      this.synth.speak(utterThis);
    } else {
      throw new Error(`Could not speak: Speech voice is not available`);
    }
  }
}

export const speakerService = new SpeakerService();
