import { TopicType, TopicShapeType } from './common'
import { topicStyle } from '../interface'
const { RECT, ROUNDED_RECT, PARALLELOGRAM } = TopicShapeType;

interface defaultTopicStyleMap {
  [index: string]: topicStyle
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

interface topicPaddingOverrideMap {
  [index: string]: {
    [index: string]: {
      paddingVertical: number
      paddingHorizon: number
    }
  }
}

export const TopicPaddingOverride: topicPaddingOverrideMap = {
  [TopicType.ROOT]: {
    [RECT]: {
      paddingVertical: 2 / 3,
      paddingHorizon: 4 / 5
    },
    [ROUNDED_RECT]: {
      paddingVertical: 2 / 3,
      paddingHorizon: 4 / 5
    },
    [PARALLELOGRAM]: {
      paddingVertical: 2 / 3,
      paddingHorizon: 8 / 5
    }
  },

  [TopicType.MAIN]: {
    [RECT]: {
      paddingVertical: 2 / 5,
      paddingHorizon: 2 / 3
    },
    [ROUNDED_RECT]: {
      paddingVertical: 2 / 5,
      paddingHorizon: 2 / 3
    },
    [PARALLELOGRAM]: {
      paddingVertical: 2 / 5,
      paddingHorizon: 4 / 3
    }
  },

  [TopicType.SUB]: {
    [RECT]: {
      paddingVertical: 1 / 2,
      paddingHorizon: 2 / 3
    },
    [ROUNDED_RECT]: {
      paddingVertical: 1 / 2,
      paddingHorizon: 2 / 3
    },
    [PARALLELOGRAM]: {
      paddingVertical: 1 / 2,
      paddingHorizon: 4 / 3
    }
  }
};