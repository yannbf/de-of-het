<template>
  <div class="debug-info" v-show="shouldShow">
    <div v-if="debugInfo">Debug: {{ debugInfo }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class DebugInfo extends Vue {
  get debugInfo() {
    return this.$store.state.game.debug;
  }

  private get shouldShow() {
    return this.isDev() && this.isMobile();
  }

  private isDev() {
    return process.env.NODE_ENV === 'development';
  }

  private isMobile() {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/index.scss';
.debug-info {
  color: white;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  animation: flash 0.5s linear;
}

@keyframes flash {
  from {
    background: white;
    color: black;
  }

  to {
    background: transparent;
    color: white;
  }
}
</style>
