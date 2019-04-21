<template>
  <div class="progress">
    <div
      v-for="(word, index) in words"
      :key="index"
      class="score"
      :class="getClassName(word)">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IWord } from '../types/word';
import { State } from 'vuex-class';

@Component
export default class ProgressBar extends Vue {
  scores: any[] = []; // add interface
  @Prop() private words: [] | undefined;

  constructor() {
    super();
  }

  mounted() {
    console.log(this.words);
  }

  beforeUpdate() {
    console.log('beforeUpdate');
  }

  updated() {
    console.log('beforeUpdate');
  }

  getLevelInfo() {
    let size = 0;
    // switch(this.level) {
    //   case 1: size = 7;
    //   case 2: size = 15;
    // }

    return Array(size).fill({}).map((e) => ({ status: undefined }))
  }

  getClassName(word: IWord) {
    console.log('bnananek')
    if(word.score) {
      return word.score > 0 ? 'correct' : 'wrong';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/index.scss';
.progress {
  position: fixed;
  top: 2px;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  .score {
    flex: 1;
    height: 10px;
    border-radius: 1rem;
    width: auto;
    margin: 0 .1rem;
    display: block;
    background: rgba(255, 255, 255, .1);
    min-width: 0;

    &.correct {
      background: #47d99a;
    }

    &.wrong {
      background: #d94e47;
    }
  }
}
</style>
