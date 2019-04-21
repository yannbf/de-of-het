<template>
  <div class="card-container">
    <h2 class="cards-article">DE</h2>
    <div class="cards">
      <Card
        v-for="(card, index) in cards"
        :key="card.name"
        :card="card"
        :is-current="index === 0"
        @swipeRight="$emit('swipeRight', card)"
        @swipeLeft="$emit('swipeLeft', card)"
        @hideCard="$emit('hideCard', card)"
      />
    </div>
    <h2 class="cards-article">HET</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
  filters: {
    visible(cards: any) {
      return cards;//.filter((card: any) => card.visible);
    }
  }
})
export default class CardStack extends Vue {
  @Prop() public cards?: Card[];
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  height: 40vh;
  min-width: 16rem;
  max-width: 25rem;
  margin-right: auto;
  margin-left: auto;
}
.cards-article {
  align-self: center;
  margin: 1rem;
  color: #ff9d97;
}
.cards {
  margin: 0 auto;
  position: relative;
  display: flex;
  width: 300px;
}
</style>
