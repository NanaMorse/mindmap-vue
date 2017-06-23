import { TopicShapeType, MapStructureType } from 'client-src/constants/common'
import { TopicMargin } from 'client-src/constants/defaultstyle'
import { CalcLineProcess, extendedTopicInfo } from 'client-src/interface'

const { marginHorizon } = TopicMargin[MapStructureType.LOGIC_TO_RIGHT];

class LogicToRight implements CalcLineProcess {

  public getConnectLinePath(topicInfo: extendedTopicInfo) {
    const { startPoint, centerPoint, endPoints } = this.getMainPoints(topicInfo);

    let path = '';

    // start point to center point
    path += `M ${startPoint[0]} ${startPoint[1]} ${centerPoint[0]} ${centerPoint[1]} `;

    // center to each end
    endPoints.forEach((endPoint) => {
      path += `M ${centerPoint[0]} ${endPoint[1]} ${endPoint[0]} ${endPoint[1]} `
    });

    // center line
    const endPointYs = endPoints.map(endPoint => endPoint[1]);
    const minY = Math.min(...endPointYs);
    const maxY = Math.max(...endPointYs);
    if (minY !== maxY) path += `M ${centerPoint[0]} ${minY} ${centerPoint[0]} ${maxY}`;

    return path;
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