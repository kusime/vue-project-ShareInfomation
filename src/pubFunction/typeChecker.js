// https://attacomsian.com/blog/javascript-check-variable-is-object
const typeChecker = {
  isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  },
  isArray(obj) {
    return Array.isArray(obj);
  },
  isString(obj) {
    return typeof obj === "string";
  },
};
export default typeChecker;
