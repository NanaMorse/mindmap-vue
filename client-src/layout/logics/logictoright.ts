import { TopicMargin } from '../../constants/defaultstyle';
import { MapStructureType } from '../../constants/common';
import { extendedTopicInfo, LayoutProcess } from '../../interface'

const { LOGIC_TO_RIGHT } = MapStructureType;

const { marginHorizon, marginVertical } = TopicMargin[LOGIC_TO_RIGHT];

class LogicToRight implements LayoutProcess{

  public startLayout(topicInfo: extendedTopicInfo) {
    this.calcTreeSize(topicInfo);
    this.calcPosition(topicInfo);
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

      childrenTopStart += currentChildTreeSize.height + marginVertical * 2;

      this.calcPosition(childTree);
    });
  }
}

export default new LogicToRight()