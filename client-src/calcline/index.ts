import { MapStructureType } from 'client-src/constants/common'
import { DefaultMapStructure } from 'client-src/constants/defaultstyle'
import { extendedTopicInfo } from 'client-src/interface'
import logicToRight from './logics/logictoright'

/**
 * @description structure name to layout function
 * */
const calcLineFunctionMap = {
  [MapStructureType.LOGIC_TO_RIGHT]: logicToRight
};

export default (topicInfo: extendedTopicInfo, mapStructure: string = DefaultMapStructure): string => {
  return calcLineFunctionMap[mapStructure].getConnectLinePath(topicInfo)
}