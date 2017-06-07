/**
 * @fileOverview get i18n string
 * */
export const defaultTitle = {
  rootTopic: 'rootTopic',
  mainTopic: 'mainTopic',
  subTopic: 'subTopic'
};

const en_us = {
  [defaultTitle.rootTopic]: 'Root Topic',
  [defaultTitle.mainTopic]: 'Main Topic',
  [defaultTitle.subTopic]: 'Sub Topic'
};

export function i18n(i18nKey: string): string {
  // todo
  return en_us[i18nKey];
}

