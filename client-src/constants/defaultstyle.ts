import { TopicType, TopicShapeType } from './common'

interface defaultTopicStyleMap {
  [index: string]: {
    shapeType: string
    fontSize: number
    fontColor: string
    borderWidth: number
    borderColor: string
    fillColor: string
  }
}

export const DefaultTopicStyle: defaultTopicStyleMap = {
  [TopicType.ROOT]: {
    shapeType: TopicShapeType.RECT,
    fontSize: 24,
    fontColor: "#4c4c4c",
    borderWidth: 2,
    borderColor: '#000000',
    fillColor: '#cbdefd'
  },

  [TopicType.MAIN]: {
    shapeType: TopicShapeType.ROUNDED_RECT,
    fontSize: 18,
    fontColor: "#4c4c4c",
    borderWidth: 2,
    borderColor: '#000000',
    fillColor: '#fef4ec'
  },

  [TopicType.SUB]: {
    shapeType: TopicShapeType.ROUNDED_RECT,
    fontSize: 16,
    fontColor: "#4c4c4c",
    borderWidth: 2,
    borderColor: '#000000',
    fillColor: '#fef4ec'
  },
};