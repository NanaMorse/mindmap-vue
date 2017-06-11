import { TopicShapeType, MapStructureType } from '../../constants/common'
import { TopicMargin } from '../../constants/defaultstyle'
import { CalcLineProcess, extendedTopicInfo } from '../../interface'

const { marginHorizon } = TopicMargin[MapStructureType.LOGIC_TO_RIGHT];

class LogicToRight implements CalcLineProcess{

  public getConnectLinePath(topicInfo: extendedTopicInfo) {
    const { startPoint, centerPoint, endPoints } = this.getMainPoints(topicInfo);

    return 'hello';
  }

  private getMainPoints(topicInfo: extendedTopicInfo) {
    const halfParentShapeWidth = topicInfo.shapeSize.width / 2;
    const [ parentX, parentY ] = topicInfo.position;

    // get start point
    let startPoint;
    switch (topicInfo.style.shapeType) {
      case TopicShapeType.PARALLELOGRAM: {
        // todo
        break;
      }

      default: {
        startPoint = [parentX + halfParentShapeWidth, parentY];
      }
    }

    // get center point
    const centerPoint = [parentX + halfParentShapeWidth + marginHorizon, parentY];

    // get end points
    const endPoints = topicInfo.children.map(childInfo => {
      const [ childX, childY ] = childInfo.position;
      const halfChildShapeWidth = childInfo.shapeSize.width / 2;

      switch (topicInfo.style.shapeType) {
        case TopicShapeType.PARALLELOGRAM: {
          // todo
          return;
        }

        default: {
          return [childX - halfChildShapeWidth, childY]
        }
      }
    });

    return { startPoint, centerPoint, endPoints }
  }
}

export default new LogicToRight()