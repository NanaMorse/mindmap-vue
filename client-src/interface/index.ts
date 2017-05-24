
interface topicStyle {
  shapeType?: string

  borderWidth?: number

  borderColor?: string
}

export interface originTopicInfo {
  id: string

  title?: string

  style?: topicStyle
}

export interface extendedTopicInfo extends originTopicInfo {
  type: string

  size: {
    width: number
    height: number
  }
}