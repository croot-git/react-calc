var context = require.context(".", true, /\.js$/);
var obj = {};
context.keys().forEach(function (key) {
    if(key.replace(/\.\/(.*)\.js/,'$1') !== 'index')
        obj[key.replace(/\.\/(.*)\.js/,'$1')] = context(key);
});
export default obj;