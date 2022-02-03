module.exports = function debounce(fun, delay = 200) {
  let timer;
  return function () {
    const context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(context, args);
    }, delay);
  };
}