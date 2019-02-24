<template>
  <div
    ref="interactElement"
    class="card"
    v-if="isShowing"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    :style="{ transform: transformString }"
  >
    <h3 class="cardTitle">{{ card.word }}</h3>
    <h3 v-if="showStuff">{{ card.article }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interact from 'interactjs';

const interactYThreshold = 150;
const interactXThreshold = 100;
const interactMaxRotation = 15;
const interactOutOfSightXCoordinate = 500;
const interactOutOfSightYCoordinate = 600;
enum CardActions {
  ACCEPT_CARD = 'cardAccepted',
  REJECT_CARD = 'cardRejected',
  SKIP_CARD = 'cardSkipped',
}

@Component
export default class Card extends Vue {
  public showStuff = false;
  @Prop() public card: object | undefined;
  @Prop() private isCurrent: boolean | undefined;
  interactPosition: any;
  isInteractAnimating = true;
  isShowing = true;
  isInteractDragged = false;

  constructor() {
    super();
    this.interactPosition = {
      x: 0,
      y: 0,
      rotation: 0,
    };
  }
  get transformString() {
    if (!this.isInteractAnimating || this.isInteractDragged) {
      const { x, y, rotation } = this.interactPosition;
      return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }

    return null;
  }

  beforeDestroy() {
    (interact(this.$refs.interactElement) as any).unset();
  }

  mounted() {
    const element = this.$refs.interactElement;
    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },
      onmove: (event: any) => {
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },
      onend: () => {
        const { x, y } = this.interactPosition;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(CardActions.ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(CardActions.REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(CardActions.SKIP_CARD);
        else this.resetCardPosition();
      },
    });
  }

  interactSetPosition(coordinates: any) {
    const { x = 0, y = 0, rotation = 0 } = coordinates;
    this.interactPosition = { x, y, rotation };
  }

  resetCardPosition() {
    this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
  }

  playCard(interaction: any) {
    this.interactUnsetElement();

    switch (interaction) {
      case CardActions.ACCEPT_CARD:
        this.interactSetPosition({
          x: interactOutOfSightXCoordinate,
        });
        this.$emit(CardActions.ACCEPT_CARD);
        break;
      case CardActions.REJECT_CARD:
        this.interactSetPosition({
          x: -interactOutOfSightXCoordinate,
        });
        this.$emit(CardActions.REJECT_CARD);
        break;
      case CardActions.SKIP_CARD:
        this.interactSetPosition({
          y: interactOutOfSightYCoordinate,
        });
        this.$emit(CardActions.SKIP_CARD);
        break;
    }

    this.hideCard();
  }

  hideCard() {
    setTimeout(() => {
      this.isShowing = false;
      this.$emit('hideCard', this.card);
    }, 200);
  }

  interactUnsetElement() {
    (interact(this.$refs.interactElement) as any).unset();
    this.isInteractDragged = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/index.scss';

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 350px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.3);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
