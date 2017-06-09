import { TopicMargin } from '../../constants/defaultstyle';
import { MapStructureType } from '../../constants/common';
import { extendedTopicInfo } from '../../interface'

const { LOGIC_TO_RIGHT } = MapStructureType;

const { marginHorizon, marginVertical } = TopicMargin[LOGIC_TO_RIGHT];

class LogicToRight {

  public startLayout(topicTree: extendedTopicInfo) {
    this.calcTreeSize(topicTree);
    this.calcPosition(topicTree);
  }

  private calcTreeSize(topicTree: extendedTopicInfo) {
    const { shapeSize, children } = topicTree;

    const treeSize = { width: shapeSize.width, height: shapeSize.height };
    const childrenTreeSize = { width: 0, height: 0 };

    if (children && children.length) {
      children.forEach((childTree) => {
        const currentChildTreeSize = this.calcTreeSize(childTree);

        if (currentChildTreeSize.width > childrenTreeSize.width) {
          childrenTreeSize.width = currentChildTreeSize.width;
        }

        childrenTreeSize.height += currentChildTreeSize.height + marginVertical;
      });

      childrenTreeSize.width += marginHorizon;
      childrenTreeSize.height -= marginVertical;
    }

    treeSize.width += childrenTreeSize.width;
    if (childrenTreeSize.height > treeSize.height) treeSize.height = childrenTreeSize.height;

    topicTree.treeSize = treeSize;
    topicTree.childrenTreeSize = childrenTreeSize;

    return treeSize;
  }

  private calcPosition(topicTree: extendedTopicInfo) {
    const { position, childrenTreeSize, children, shapeSize } = topicTree;

    let topHeight = 0;

    const childrenMiddleHeight = childrenTreeSize.height / 2;

    children && children.forEach((childTree) => {
      const currentChildTreeSize = childTree.treeSize;
      const halfChildShapeWidth = childTree.shapeSize.width / 2;

      const x = position[0] + shapeSize.width / 2 + marginHorizon + halfChildShapeWidth;

      let y = position[1] + topHeight + currentChildTreeSize.height / 2 - childrenMiddleHeight;

      topHeight += currentChildTreeSize.height + marginVertical;

      childTree.position = [x, y];

      this.calcPosition(childTree);
    });
  }
}

export default new LogicToRight()