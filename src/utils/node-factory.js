export default function(createElement) {
  return Object.freeze({
    css(url) {
      const linkEl = createElement('link');
      linkEl.setAttribute('type', 'text/css');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.setAttribute('href', url);
      return linkEl;
    },
    js(url) {
      const scriptEl = createElement('script');
      scriptEl.setAttribute('src', url);
      return scriptEl;
    },
  });
}
