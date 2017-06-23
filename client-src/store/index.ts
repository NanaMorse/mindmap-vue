import Vue from 'vue'
import Vuex from 'vuex'
import State from '../testData';
import Mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  state: State,
  mutations: Mutations as any
});