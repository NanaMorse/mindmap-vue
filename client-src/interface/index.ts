
interface topicStyle {
  shapeType?: string

  borderWidth?: number

  borderColor?: string
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

  size: {
    width: number
    height: number
  }

  children?: Array<extendedTopicInfo>
}

export interface stageInfo {
  backgroundColor: string
}

export interface mapInfo {
  topicTree: originTopicInfo
  selectionList: Array<string>
}