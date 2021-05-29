export function clean(obj) {
    Object.keys(obj).forEach(function (key) { return !obj[key] && delete obj[key]; });
    return obj;
}
//# sourceMappingURL=utils.js.map