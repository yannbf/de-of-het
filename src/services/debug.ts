import store from '@/store';
import Vue from 'vue';

class DebugInfo {
  data: any;
  update(data: any) {
    console.log(`updating info from ${this.data} to ${data}`);
    this.data = data;
    
    store.commit('game/updateDebugInfo', null);
    Vue.nextTick(() => {
      store.commit('game/updateDebugInfo', this.data);
    });
  }
}

export const debugInfo = new DebugInfo();