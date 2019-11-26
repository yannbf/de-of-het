<template>
  <div class="progress">
    <div
      v-for="(word, index) in words"
      :key="index"
      class="score"
      :class="getClassName(word)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IWord } from '../types';
import { State } from 'vuex-class';

@Component
export default class ProgressBar extends Vue {
  @Prop() private words: any;

  constructor() {
    super();
  }

  getClassName(word: IWord) {
    if (word.point !== undefined) {
      return word.point === 1 ? 'correct' : 'wrong';
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
    margin: 0 0.1rem;
    display: block;
    background: rgba(255, 255, 255, 0.1);
    min-width: 0;
    transition: background 0.2s linear;

    &.correct {
      background: #47d99a;
    }

    &.wrong {
      background: #d94e47;
    }
  }
}
</style>
