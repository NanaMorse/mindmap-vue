import { MapStructureType } from '../constants/common'
import { DefaultMapStructure } from '../constants/defaultstyle'
import { extendedTopicInfo } from '../interface'
import logicToRight from './logics/logictoright'

/**
 * @description structure name to layout function
 * */
const calcLineFunctionMap = {
  [MapStructureType.LOGIC_TO_RIGHT]: logicToRight
};

export default (topicInfo: extendedTopicInfo, mapStructure: string = DefaultMapStructure): Array<string> => {
  const linesList = [];

  function pushCalcLineData(topicInfo: extendedTopicInfo) {
    const { children } = topicInfo;

    if (children) {
      linesList.push(calcLineFunctionMap[mapStructure].getConnectLinePath(topicInfo));
      children.forEach(child => pushCalcLineData(child));
    }
  }

  pushCalcLineData(topicInfo);

  return linesList;
}