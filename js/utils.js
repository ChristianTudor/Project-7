//function calculate the average ratings
export function average(values, length) {
  return values.reduce((a, b) => a.stars + b.stars) / length;
}

export function createElement({ tag, attrs }) {
  const element = document.createElement(tag);
  if (attrs) {
    for (const attr of attrs) {
      element.setAttribute(attr.name, attr.value);
    }
  }
  return element;
}
