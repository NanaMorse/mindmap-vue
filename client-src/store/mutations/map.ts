import { map } from 'client-src/constants/mutations'
import { stateInfo } from 'client-src/interface'

const { selectionEdit } = map;

const selectionEditMutations = {
  /**
   * @description set only one topic selected
   * @param state
   * @param id selected topic's id
   */
  [selectionEdit.setSingleSelection](state: stateInfo, { id }: { id: string }) {
    state.map.selectionList = [id];
  },

  /**
   * @description add a new selection to list
   * @param state
   * @param id selected topic's id
   */
  [selectionEdit.addSelectionToList](state: stateInfo, { id }: { id: string }) {
    state.map.selectionList.push(id);
  },

  /**
   * @description remove one topic from selectionList, triggered when ctrl + click on a selected topic
   * @param state
   * @param id topic's id to remove
   */
  [selectionEdit.removeSelectionFromList](state: stateInfo, { id }: { id: string }) {
    state.map.selectionList.splice(state.map.selectionList.indexOf(id), 1);
  },

  /**
   * @description clear selectionList, no topic was selected
   */
  [selectionEdit.clearSelectionList](state: stateInfo) {
    state.map.selectionList = [];
  }
};

export default {
  ...selectionEditMutations
}