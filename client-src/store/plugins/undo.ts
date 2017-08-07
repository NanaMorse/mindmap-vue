import { Store } from 'vuex'
import { map, undo, app } from 'client-src/constants/mutations'
import { deepCopy } from 'client-src/tools/helper'
import { stateInfo } from 'client-src/interface'

const { selectionEdit } = map;

const filterMutationMap = {
  ...selectionEdit,
  ...undo,
  ...app,
};

const pastStateStack: Array<stateInfo> = [];
const futureStateStack: Array<stateInfo> = [];

export const undoPlugin = (store: Store<stateInfo>) => {
  let pastState = deepCopy(store.state);

  store.subscribe((mutation, state) => {
    if (filterMutationMap[mutation.type]) {
      pastState = deepCopy(state);
      return
    }

    pastStateStack.push(pastState);
    futureStateStack.splice(0);

    store.commit(undo.updateUndoStatus);
  })
};

export const undoPluginMutations = {
  [undo.invokeUndo](state: stateInfo) {
    const pastState = pastStateStack.pop();

    if (!pastState) return state;

    futureStateStack.push(deepCopy(state));

    Object.assign(state, pastState);
    state.app.hasUndo = !!pastStateStack.length;
    state.app.hasRedo = !!futureStateStack.length
  },

  [undo.invokeRedo](state: stateInfo) {
    const futureState = futureStateStack.pop();

    if (!futureState) return state;

    pastStateStack.push(deepCopy(state));

    Object.assign(state, futureState);
    state.app.hasUndo = !!pastStateStack.length;
    state.app.hasRedo = !!futureStateStack.length
  },

  [undo.updateUndoStatus](state: stateInfo) {
    state.app.hasUndo = !!pastStateStack.length;
    state.app.hasRedo = !!futureStateStack.length
  }
};