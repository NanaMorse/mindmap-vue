
export function deepCopy<T>(target: T): T {
  return JSON.parse(JSON.stringify(target));
}

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