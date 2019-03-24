<template>
  <div class="home">
    <h1>🤔 De of Het? 🤔</h1>
    <CardStack
      v-if="isRunning && !isGameOver"
      :cards="visibleCards"
      @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected"
      @hideCard="removeCardFromDeck"
    />
    <div v-if="isGameOver">
      <h2 class="final-score">Done! Your score: {{ score }}</h2>
      <div>
        <h2>Correct words</h2>
        <div v-for="word in correctWords" :key="word">{{ word }}</div>
      </div>
      <div v-if="wrongWords">
        <h2>Wrong words</h2>
        <div v-for="word in wrongWords" :key="word">{{ word }}</div>
      </div>
    </div>
    <section v-if="!isRunning && !isGameOver">
      <p>Welcome to De of Het!</p>
      <p>Swipe the cards to the left if you think the word's article is <i>De</i>, or to the right if you think it is <i>Het.</i></p>
      <p>Good luck!</p>
    </section>
    <div v-if="!isRunning" @click="startGame()">
      <button class="bubbly-button" v-if="!isGameOver">Start game!</button>
      <button class="bubbly-button" v-if="isGameOver">Try again!</button>
    </div>
    {{words}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getWordListWithArticles } from '../constants';
import CardStack from '@/components/CardStack.vue';
import { IWord } from '@/types/word';
import { speak } from '@/utils';
import { State } from 'vuex-class';

@Component({
  components: {
    CardStack,
  },
})
export default class Home extends Vue {
  public isGameOver = false;
  public isRunning = false;
  public score = 0;
  // public visibleCards: object[] = [];
  public correctWords: string[] = [];
  public wrongWords: string[] = [];
  @State('words') visibleCards: any;

  private audioWrong: HTMLAudioElement;
  private audioCorrect: HTMLAudioElement;

  startGame() {
    // this.visibleCards = getWordListWithArticles();
    this.isRunning = true;
    this.isGameOver = false;
    this.correctWords = [];
    this.wrongWords = [];
    this.score = 0;
    this.speakAloud();
  }

  mounted() {
    // console.log(this.words);
  }

  constructor() {
    super();
    this.audioWrong = new Audio(require('../assets/wrong.wav'));
    this.audioCorrect = new Audio(require('../assets/correct.wav'));
  }

  setScore(selectedArticle: string) {
    const { article, name, translation } = this.visibleCards[0] as IWord;
    const score = article === selectedArticle ? 1 : 0;
    const sentence = `${article} ${name} -> ${translation}`;

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
      this.stopGame();
    } else {
      this.speakAloud();
    }
  }

  stopGame() {
    this.isGameOver = true;
    this.isRunning = false;
  }

  speakAloud() {
    // give a small delay to speak the word
    setTimeout(() => speak(this.firstCard.name), 300);
  }

  get firstCard(): IWord {
    return this.visibleCards[0] as IWord;
  }
}
</script>

<style lang="scss">
@import '../styles/mixins.scss';

#app {
  text-align: center;
}

section {
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid white;
  max-width: 500px;

  @media only screen and (min-width: 768px) {
    margin: 0 auto;
    padding: 1rem;
  }
}

.final-score {
  color: #ffdc00;
}
</style>
