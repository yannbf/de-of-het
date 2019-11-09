<template>
  <div id="app">
    <div id="nav" :style="{ visibility: gameState.isRunning ? 'hidden' : 'visible' }">
      <router-link to="/">Home</router-link>|
      <router-link to="/leaderboard">Leaderboard</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view :game="gameState" :words="gameState.words" />
    <ProgressBar :words="gameState.words" :v-if="gameState.isRunning"></ProgressBar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import ProgressBar from '@/components/ProgressBar.vue';

@Component({
  components: {
    ProgressBar,
  },
})
export default class Home extends Vue {
  get gameState() {
    return this.$store.state.game;
  }

  async presentAlertPrompt() {
    const alert = await this.$ionic.alertController.create({
      header: `Your score was ...!<br/>What's your name?'`,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Awesome player',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
          },
        },
      ],
    });

    await alert.present();
  }
}
</script>

<style lang="scss">
@import 'styles';

body {
  margin: 0;
  background: $app-background;
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-text-primary;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $router-link;
    &.router-link-exact-active {
      color: $router-link-active;
    }
  }
}
</style>
