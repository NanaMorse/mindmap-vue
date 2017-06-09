/**
 * @fileOverview 布局入口函数 / layout entry function
 * */
import { extendedTopicInfo } from '../interface'
import { DefaultMapStructure } from '../constants/defaultstyle'
import { MapStructureType } from '../constants/common'
import logicToRight from './logics/logictoright'

/**
 * @description structure name to layout function
 * */
const layoutFunctionMap = {
  [MapStructureType.LOGIC_TO_RIGHT]: logicToRight
};

/**
 * @description the root topic's default position
 * */
const rootPosition: [number, number] = [300, 300];

export default (topicTree: extendedTopicInfo, mapStructure: string = DefaultMapStructure) => {
  topicTree.position = rootPosition;
  layoutFunctionMap[mapStructure].startLayout(topicTree);
}