import { defaultTitle } from './i18n'

/**
 * @description Topic类型 / Topic Type
 * */
export const TopicType = {
  // 根节点
  ROOT: 'ROOT',
  // 主要节点
  MAIN: 'MAIN',
  // 子节点
  SUB: 'SUB'
};

/**
 * @description Topic形状类型 Topic Shape Type
 * */
export const TopicShapeType = {
  // 矩形
  RECT: 'RECT',
  // 圆角矩形
  ROUNDED_RECT: 'ROUNDED_RECT',
  // 菱形
  PARALLELOGRAM: 'PARALLELOGRAM'
};

/**
 * @description 布局类型
 * */
export const LayoutType = {
  // 向右逻辑图
  LOGIC_TO_RIGHT: 'LOGIC_TO_RIGHT'
};

/**
 * @description topic类型与该类型默认title key名的对应map
 * */
export const TopicTypeToDefaultTitleKeyMap = {
  [TopicType.ROOT]: defaultTitle.rootTopic,
  [TopicType.MAIN]: defaultTitle.mainTopic,
  [TopicType.SUB]: defaultTitle.subTopic
};