<template>
  <div class="home">
    <h1>🤔 De of Het? 🤔</h1>
    <CardStack
      v-if="!isGameOver"
      :cards="visibleCards"
      @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected"
      @hideCard="removeCardFromDeck"
    />
    <div v-if="isGameOver">
      Done! Your score: {{ score }}
      <div>
        <h2>Correct words</h2>
        <div v-for="word in correctWords" :key="word">{{ word }}</div>
      </div>
      <div>
        <h2>Wrong words</h2>
        <div v-for="word in wrongWords" :key="word">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getWordListWithArticles } from '../constants';
import CardStack from '@/components/CardStack.vue';
import { IWord } from '@/types/word';

@Component({
  components: {
    CardStack,
  },
})
export default class Home extends Vue {
  public isGameOver = false;
  public score = 0;
  public visibleCards: object[] = getWordListWithArticles();
  public correctWords: string[] = [];
  public wrongWords: string[] = [];
  private audioWrong: HTMLAudioElement;
  private audioCorrect: HTMLAudioElement;

  constructor() {
    super();
    this.audioWrong = new Audio(require('../assets/wrong.wav'));
    this.audioCorrect = new Audio(require('../assets/correct.wav'));
  }

  setScore(selectedArticle: string) {
    const { article, word, translation } = this.visibleCards[0] as IWord;
    const score = article === selectedArticle ? 1 : 0;
    const sentence = `${article} ${word} -> ${translation}`;

    if (score === 0) {
      this.audioWrong.play();
      this.wrongWords.push(sentence);
    } else {
      this.audioCorrect.play();
      this.correctWords.push(sentence);
    }

    this.score += score;
  }

  handleCardAccepted() {
    this.setScore('het');
  }

  handleCardRejected() {
    this.setScore('de');
  }

  removeCardFromDeck() {
    this.visibleCards.shift();
    if (this.visibleCards.length <= 0) {
      this.isGameOver = true;
    }
  }
}
</script>

<style lang="scss">
@import '../styles/mixins.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
