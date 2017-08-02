import Vue from 'vue'
import Vuex from 'vuex'
import State from '../testData';
import Mutations from './mutations'
import { undoPlugin, undoPluginMutations } from './plugins/undo'

Vue.use(Vuex);

export default new Vuex.Store({
  state: State as any,
  plugins: [undoPlugin],
  mutations: { ...Mutations, ...undoPluginMutations } as any
});