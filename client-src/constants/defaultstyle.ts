import { TopicType, TopicShapeType, MapStructureType } from './common'
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
    fillColor: '#cbdefd',
    lineWidth: 1,
    lineColor: '#000'
  },

  [TopicType.MAIN]: {
    shapeType: TopicShapeType.ROUNDED_RECT,
    fontSize: 18,
    fontColor: "#4c4c4c",
    borderWidth: 2,
    borderColor: '#000000',
    fillColor: '#fef4ec',
    lineWidth: 1,
    lineColor: '#000'
  },

  [TopicType.SUB]: {
    shapeType: TopicShapeType.ROUNDED_RECT,
    fontSize: 16,
    fontColor: "#4c4c4c",
    borderWidth: 2,
    borderColor: '#000000',
    fillColor: '#fef4ec',
    lineWidth: 1,
    lineColor: '#000'
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

export const TopicMargin = {
  [MapStructureType.LOGIC_TO_RIGHT] : {
    marginVertical: 10,
    marginHorizon: 20
  }
};

export const EditReceiverMinWidth = 200;
export const EditReceiverHeight = 20;

export const canvasSize = { width: 10000, height: 6000 };

export const DefaultMapStructure = MapStructureType.LOGIC_TO_RIGHT;