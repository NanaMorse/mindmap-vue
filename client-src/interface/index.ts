
interface size {
  width: number
  height: number
}

export interface topicStyle {
  shapeType?: string
  fontSize?: number
  fontColor?: string
  borderWidth?: number
  borderColor?: string
  fillColor?: string
}

export interface originTopicInfo {
  id: string

  title?: string

  style?: topicStyle

  children?: Array<originTopicInfo>
}

export interface extendedTopicInfo extends originTopicInfo {
  type: string

  parentId: string

  index: number

  shapeSize: size

  treeSize: size

  childrenTreeSize: size

  position: [number, number]

  children?: Array<extendedTopicInfo>
}

export interface stageInfo {
  backgroundColor: string
}

export interface mapInfo {
  topicTree: originTopicInfo
  selectionList: Array<string>
  mapStructure: string
}

export abstract class LayoutProcess {
  abstract startLayout(topicInfo: extendedTopicInfo)
}

export abstract class CalcLineProcess {
  abstract getConnectLinePath(topicInfo: extendedTopicInfo)
}