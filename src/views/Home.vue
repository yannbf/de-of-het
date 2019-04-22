<template>
  <div class="home">
    <h1>🤔 De of Het? 🤔</h1>
    <CardStack
      v-if="game.isRunning && !game.isOver"
      :cards="visibleCards"
      @swipeRight="handleSwipeRight"
      @swipeLeft="handleSwipeLeft"
      @hideCard="removeCardFromDeck"
    />
    <div v-if="game.isOver">
      <h2 class="final-score">Done! Your score: {{ game.score }}</h2>
      <div>
        <h2>Correct words</h2>
        <div v-for="word in filterWords(true)" :key="word.sentence">{{ word.sentence }}</div>
      </div>
      <div>
        <h2>Wrong words</h2>
        <div v-for="word in filterWords(false)" :key="word.sentence">{{ word.sentence }}</div>
      </div>
    </div>
    <section v-if="!game.isRunning && !game.isOver">
      <p>Welcome to De of Het!</p>
      <p>Swipe the cards to the left if you think the word's article is <i>De</i>, or to the right if you think it is <i>Het.</i></p>
      <p>Good luck!</p>
    </section>
    <div v-if="!game.isRunning" @click="startGame()">
      <button class="bubbly-button" v-if="!game.isOver">Start game!</button>
      <button class="bubbly-button" v-if="game.isOver">Try again!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { debounce } from 'lodash-es';

import { getWordListWithArticles } from '@/constants';
import CardStack from '@/components/CardStack.vue';
import { IWord } from '@/types';
import { speakerService, audioService, Audios } from '@/services';
import { store } from '../store';

@Component({
  components: {
    CardStack,
  }
})
export default class Home extends Vue {
  @Prop() private game: any;
  @Prop() private words: any;

  get visibleCards() {
    return this.$store.getters.visibleWords;
  }

  startGame() {
    // wordsModule.fetchAll();
    this.$store.dispatch('startGame', 1); // can be further improved to use mapHelpers
    this.speakAloud();
    // this.presentAlertPrompt();
  }

  constructor() {
    super();
  }

  mounted() {
    addEventListener('keyup', debounce(this.listenToKeyboard, 100, { leading: true }));
  }

  private listenToKeyboard(event: KeyboardEvent) {
    if (!this.game.isRunning) {
      if (event.defaultPrevented) {
          return;
      }
      const key = event.key || event.keyCode;

      if (key === 'Enter' || key === ' ') {
        this.startGame();
      }
    }
  }

  setPoint(selectedArticle: string, word: IWord) {
    const { article, name, translation } = word;
    const point = article === selectedArticle ? 1 : 0;
    const sentence = `${article} ${name} -> ${translation}`;

    if (point === 0) {
      audioService.play(Audios.Wrong);
    } else {
      audioService.play(Audios.Correct);
    }
    word.sentence = sentence; // Remove this mutation and add to the state mutations
    this.$store.dispatch('setPoint', { name, point });
  }

  handleSwipeRight(word: IWord) {
    this.setPoint('het', word);
  }

  handleSwipeLeft(word: IWord) {
    this.setPoint('de', word);
  }

  removeCardFromDeck() {
    if (this.visibleCards.length <= 0) {
      this.stopGame();
    } else {
      this.speakAloud();
    }
  }

  stopGame() {
    this.$store.dispatch('stopGame');
  }

  speakAloud() {
    // give a small delay to speak the word
    setTimeout(() => speakerService.speak(this.firstCard.name), 300);
  }

  get firstCard(): any {
    return this.visibleCards[0] as IWord;
  }

  filterWords(correct: boolean) {
    return this.words.filter(
      (word: IWord) => word.point === (correct ? 1 : 0)
    );
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
