import { TopicMargin } from '../../constants/defaultstyle';
import { MapStructureType } from '../../constants/common';
import { extendedTopicInfo, LayoutProcess } from '../../interface'

const { LOGIC_TO_RIGHT } = MapStructureType;

const { marginHorizon, marginVertical } = TopicMargin[LOGIC_TO_RIGHT];

class LogicToRight implements LayoutProcess {

  private x1: number;

  private y1: number;

  private x2: number;

  private y2: number;

  public startLayout(topicInfo: extendedTopicInfo) {
    this.initBoundingRect(topicInfo.position, topicInfo.shapeSize);
    this.calcTreeSize(topicInfo);
    this.calcPosition(topicInfo);
    topicInfo.boundingRect = { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 };
  }

  private calcTreeSize(topicInfo: extendedTopicInfo) {
    const { shapeSize, children } = topicInfo;

    const treeSize = { width: shapeSize.width, height: shapeSize.height };
    const childrenTreeSize = { width: 0, height: 0 };

    if (children && children.length) {
      children.forEach((childTree) => {
        const currentChildTreeSize = this.calcTreeSize(childTree);

        if (currentChildTreeSize.width > childrenTreeSize.width) {
          childrenTreeSize.width = currentChildTreeSize.width;
        }

        childrenTreeSize.height += currentChildTreeSize.height;
      });

      childrenTreeSize.height += (children.length - 1) * marginVertical * 2;
    }

    treeSize.width += childrenTreeSize.width;
    if (childrenTreeSize.width) treeSize.width += marginHorizon * 2;
    if (childrenTreeSize.height > treeSize.height) treeSize.height = childrenTreeSize.height;

    topicInfo.treeSize = treeSize;
    topicInfo.childrenTreeSize = childrenTreeSize;

    return treeSize;
  }

  private calcPosition(topicInfo: extendedTopicInfo) {
    const { position, children, childrenTreeSize, shapeSize } = topicInfo;
    let childrenTopStart = position[1] - childrenTreeSize.height / 2;

    children && children.forEach(childTree => {
      const currentChildTreeSize = childTree.treeSize;
      const currentChildShapeSize = childTree.shapeSize;

      const x = position[0] + shapeSize.width / 2 + marginHorizon * 2 + currentChildShapeSize.width / 2;
      const y = childrenTopStart + currentChildTreeSize.height / 2;

      childTree.position = [x, y];

      this.updateBoundingRect(childTree.position, currentChildShapeSize);

      childrenTopStart += currentChildTreeSize.height + marginVertical * 2;

      this.calcPosition(childTree);
    });
  }

  private initBoundingRect([ x, y ]: [ number, number ], { width, height }: { width: number, height: number }) {
    this.x1 = x - width / 2;
    this.y1 = y - height / 2;
    this.x2 = x + width / 2;
    this.y2 = y + height / 2;
  }

  private updateBoundingRect([ x, y ]: [ number, number ], { width, height }: { width: number, height: number }) {
    this.x1 = Math.min(this.x1, x - width / 2);
    this.y1 = Math.min(this.y1, y - height / 2);
    this.x2 = Math.max(this.x2, x + width / 2);
    this.y2 = Math.max(this.y2, y + height / 2);
  }
}

export default new LogicToRight()