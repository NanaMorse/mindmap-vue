import { extendedTopicInfo } from 'client-src/interface'

export function deepCopy<T>(target: T): T {
  return JSON.parse(JSON.stringify(target));
}

export const generateUUID = () => {
  return 'xxxyxxxxxxxyxxxxxxxxxyxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getTextSize = (() => {
  const p = document.createElement('p');

  p.id = 'get-text-size';
  p.style.visibility = 'hidden';

  document.querySelector('#app-tools-container').appendChild(p);

  return (text, fontSize: number | string) => {
    if (typeof fontSize === 'number') {
      fontSize = fontSize + 'px';
    }
    p.style.fontSize = fontSize;
    p.innerText = text;

    return {
      width : p.clientWidth,
      height : p.clientHeight
    };
  }
})();

export const extendedTopicInfoGlobalMap: Map<string, extendedTopicInfo> = new Map();