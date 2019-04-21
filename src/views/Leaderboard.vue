<template>
  <div class="leaderboard">
    <h1>Yay you won :D</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Leaderboard extends Vue {
  async presentAlertPrompt() {
    const alert = await this.$ionic.alertController.create({
      header: `Your score was 10! What's your name?'`,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Awesome player'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
          }
        }
      ]
    });

    await alert.present();
  }

  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import '../styles/mixins.scss';
</style>
