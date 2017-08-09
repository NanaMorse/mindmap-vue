import Vue from 'vue'
import Vuex from 'vuex'
import State from '../testData';
import Mutations from './mutations'
import { deepCopy } from 'client-src/tools/helper'
import { undoPlugin, undoPluginMutations } from './plugins/undo'
import { stateInfo } from 'client-src/interface'

Vue.use(Vuex);

export default new Vuex.Store({
  state: resetStateData(State as any),
  plugins: [undoPlugin],
  mutations: { ...Mutations, ...undoPluginMutations } as any
});

function resetStateData(state: stateInfo) {
  const stateCopy = deepCopy(state);

  stateCopy.app.hasUndo = false;
  stateCopy.app.hasRedo = false;
  stateCopy.app.showSidePanel = false;

  return stateCopy
}