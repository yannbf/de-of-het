<template>
  <div class="card-container">
    <!-- <h2 class="cards-article">HET</h2> -->
    <div class="cards">
      <Card
        v-for="(card, index) in cards"
        :key="card.name"
        :card="card"
        :is-current="index === 0"
        @cardAccepted="$emit('cardAccepted')"
        @cardRejected="$emit('cardRejected')"
        @cardSkipped="$emit('cardSkipped')"
        @hideCard="$emit('hideCard')"
      />
    </div>
    <!-- <h2 class="cards-article">DE</h2> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class CardStack extends Vue {
  @Prop() public cards?: Card[];
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  height: 40vh;
}
.cards-article {
  align-self: center;
  margin: 2rem;
}
.cards {
  margin: 0 auto;
  position: relative;
  display: flex;
  width: 300px;
}
</style>
