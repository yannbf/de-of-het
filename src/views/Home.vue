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
        <div v-for="word in game.correctWords" :key="word">{{ word }}</div>
      </div>
      <div v-if="game.wrongWords">
        <h2>Wrong words</h2>
        <div v-for="word in game.wrongWords" :key="word">{{ word }}</div>
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
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { getWordListWithArticles } from '@/constants';
import CardStack from '@/components/CardStack.vue';
import { IWord } from '@/types/word';
import { speakerService, audioService, Audios } from '@/services';
import wordsModule from '@/store/modules/words';
import gameModule from '@/store/modules/game';

@Component({
  components: {
    CardStack,
  },
  // filters: {
  //   visibleCards(cards: IWord[]) {
  //     return cards.filter(card => card.article === 'het');
  //   }
  // }
})
export default class Home extends Vue {
  @State(({words}) => words.data) visibleCards: any;
  @State('game') game: any;

  startGame() {
    wordsModule.fetchAll();
    gameModule.start();
    this.speakAloud();
  }

  constructor() {
    super();
  }

  setScore(selectedArticle: string) {
    const { article, name, translation } = this.visibleCards[0] as IWord;
    const score = article === selectedArticle ? 1 : 0;
    const sentence = `${article} ${name} -> ${translation}`;

    if (score === 0) {
      audioService.play(Audios.Wrong);
      this.game.wrongWords.push(sentence);
    } else {
      audioService.play(Audios.Correct);
      this.game.correctWords.push(sentence);
    }

    this.game.score += score;
  }

  handleSwipeRight() {
    this.setScore('het');
  }

  handleSwipeLeft() {
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
    gameModule.stop();
  }

  speakAloud() {
    // give a small delay to speak the word
    setTimeout(() => speakerService.speak(this.firstCard.name), 300);
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
