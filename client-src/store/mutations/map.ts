import Vue from 'vue'
import { map } from 'client-src/constants/mutations'
import { TopicType } from 'client-src/constants/common'
import { deepCopy, generateUUID, extendedTopicInfoGlobalMap } from 'client-src/tools/helper'
import { stateInfo, originTopicInfo, extendedTopicInfo } from 'client-src/interface'

const topicTreeWalkHelper = new class {

  public parseNewTopicInfo(newTopicInfo?: originTopicInfo) {
    if (!newTopicInfo) newTopicInfo = { id: generateUUID() };
    return { topicInfo: newTopicInfo, id: newTopicInfo.id };
  }

  /**
   * @param topicTreeToSearch the search area to find target topic
   * @param targetId search target's uuid
   * */
  public findTopicInfoById(topicTreeToSearch: originTopicInfo, targetId: string): originTopicInfo {
    if (targetId === topicTreeToSearch.id) return topicTreeToSearch;

    if (topicTreeToSearch.children) {
      for (const childTopic of topicTreeToSearch.children) {
        const topicInfo = this.findTopicInfoById(childTopic, targetId);
        if (topicInfo) return topicInfo;
      }
    }
  }

  /**
   * @description filter selection array
   * */
  public filterTopicInfoListWithoutChild(topicTreeInfo: originTopicInfo, selectionList: Array<extendedTopicInfo>): Array<extendedTopicInfo> {
    const isAAncestorOfB = this.getAncestorCheckMethod(topicTreeInfo, selectionList);

    return selectionList.filter((selectionB) => {
      return !selectionList.some((selectionA) => {
          return isAAncestorOfB(selectionA, selectionB);
        }) && selectionB.type !== TopicType.ROOT;
    });
  }

  private getAncestorCheckMethod(topicTreeInfo: originTopicInfo, selectionList: Array<originTopicInfo>) {
    const ancestorMap = {};

    selectionList.forEach((selection) => {
      getSelectionsAncestorList(selection);
    });

    return function (selectionA: originTopicInfo, selectionB: originTopicInfo) {
      return selectionA.id !== topicTreeInfo.id && ancestorMap[selectionB.id].includes(selectionA.id);
    };

    function getSelectionsAncestorList(selection: originTopicInfo) {
      const targetId = selection.id;
      const targetList = ancestorMap[targetId] = [];

      if (targetId === topicTreeInfo.id) return;

      search();

      function search(searchSource = topicTreeInfo) {
        if (!searchSource.children) return;

        for (const childTopic of searchSource.children) {
          if (childTopic.id === targetId) {
            targetList.push(searchSource.id);
            return true;
          }

          targetList.push(searchSource.id);

          if (search(childTopic)) {
            return true;
          }

          targetList.pop();
        }
      }
    }
  }

  /**
   * @description update the topic info in selection list and topic tree
   * */
  public updateEverySelectionInfo(state: stateInfo, process: (topicInfo: originTopicInfo) => any) {
    const { topicTree, selectionList } = state.map;

    selectionList.forEach(id => {
      const currentTargetTopicInfo = this.findTopicInfoById(topicTree, id);
      currentTargetTopicInfo.style = currentTargetTopicInfo.style || {};
      process(currentTargetTopicInfo);
    });
  }

  public updateSingleSelectionInfo(state: stateInfo, process: (topicInfo: originTopicInfo) => any) {
    const { topicTree, selectionList } = state.map;

    const currentTargetTopicInfo = this.findTopicInfoById(topicTree, selectionList[selectionList.length - 1]);
    currentTargetTopicInfo.style = currentTargetTopicInfo.style || {};

    process(currentTargetTopicInfo);
  }
};

const { selectionEdit, topicTreeEdit, topicTitleEdit } = map;

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

const topicTreeEditMutations = {
  /**
   * @description attach a new topic as current selection's child topic
   * */
  [topicTreeEdit.addChildTopic](state: stateInfo, { newTopicInfo }: { newTopicInfo?: originTopicInfo } = {}) {
    const { topicInfo, id } = topicTreeWalkHelper.parseNewTopicInfo(newTopicInfo);

    topicTreeWalkHelper.updateSingleSelectionInfo(state, (targetTopicInfo) => {
      if (!targetTopicInfo.children) Vue.set(targetTopicInfo, 'children', []);

      targetTopicInfo.children.push(topicInfo);
    });

    state.map.selectionList = [id];
  },

  [topicTreeEdit.addParentTopic](state: stateInfo) {
    const { topicInfo, id } = topicTreeWalkHelper.parseNewTopicInfo();

    topicTreeWalkHelper.updateSingleSelectionInfo(state, (targetTopicInfo) => {
      const { parentId, index } = extendedTopicInfoGlobalMap.get(targetTopicInfo.id);
      const originParentTopicInfo = topicTreeWalkHelper.findTopicInfoById(state.map.topicTree, parentId);

      topicInfo.children = [targetTopicInfo];
      originParentTopicInfo.children.splice(index, 1, topicInfo);
    });

    state.map.selectionList = [id];
  },

  /**
   * @description attach a new topic at current selection's index before
   * */
  [topicTreeEdit.addTopicBefore](state: stateInfo, { newTopicInfo }: { newTopicInfo?: originTopicInfo } = {}) {
    const { topicInfo, id } = topicTreeWalkHelper.parseNewTopicInfo(newTopicInfo);

    topicTreeWalkHelper.updateSingleSelectionInfo(state, (targetTopicInfo) => {
      const { parentId, index } = extendedTopicInfoGlobalMap.get(targetTopicInfo.id);
      const targetParentTopicInfo = topicTreeWalkHelper.findTopicInfoById(state.map.topicTree, parentId);

      targetParentTopicInfo.children.splice(index, 0, topicInfo);
    });

    state.map.selectionList = [id];
  },

  [topicTreeEdit.addTopicAfter](state: stateInfo, { newTopicInfo }: { newTopicInfo?: originTopicInfo } = {}) {
    const { topicInfo, id } = topicTreeWalkHelper.parseNewTopicInfo(newTopicInfo);

    topicTreeWalkHelper.updateSingleSelectionInfo(state, (targetTopicInfo) => {
      const { parentId, index } = extendedTopicInfoGlobalMap.get(targetTopicInfo.id);
      const targetParentTopicInfo = topicTreeWalkHelper.findTopicInfoById(state.map.topicTree, parentId);

      targetParentTopicInfo.children.splice(index + 1, 0, topicInfo);
    });

    state.map.selectionList = [id];
  },

  /**
   * @description remove topic, all selected topic will be removed
   * */
  [topicTreeEdit.removeTopic](state: stateInfo) {
    const { topicTree, selectionList } = state.map;

    const selectedTopicExtended = selectionList.map(id => extendedTopicInfoGlobalMap.get(id));
    const finalTopicInfoListToRemove = topicTreeWalkHelper
      .filterTopicInfoListWithoutChild(topicTree, selectedTopicExtended);

    finalTopicInfoListToRemove.forEach(extendedTopicInfo => {
      // find it's parent
      const { children } = topicTreeWalkHelper.findTopicInfoById(topicTree, extendedTopicInfo.parentId);
      children.splice(children.findIndex(topicInfo => topicInfo.id === extendedTopicInfo.id), 1);
    });

    selectionList.splice(0);
  }
};

const topicTitleEditMutations = {
  [topicTitleEdit.setTitle](state: stateInfo, { title }: { title: string }) {
    topicTreeWalkHelper.updateSingleSelectionInfo(state, (targetTopicInfo) => {
      targetTopicInfo.title = title;
    });
  }
};

export default {
  ...selectionEditMutations,
  ...topicTreeEditMutations,
  ...topicTitleEditMutations
}