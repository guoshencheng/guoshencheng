import { is } from '../utils'

export const buildConstants = (tree, prefix = "") => {
  return tree.reduce((pre, item) => {
    if (is.string(item)) {
      pre[item] = prefix ? [prefix, item].join("/") : item;
      return pre;
    } else if (is.object(item)) {
      const { key, values } = item;
      const p = prefix ? [prefix, key].join("/") : key;
      pre[key] = buildConstants(values, p);
      return pre;
    } else {
      console.warn(`constants build item should be a object or string, got a item which is ${is.ObjectString(item)}, ignored`);
      return pre;
    }
  }, {})
}

export default buildConstants([{
  key: "POSTS",
  values: ["ALL", "CREATE_EMPTY"]
}, {
  key: "POST",
  values: ["SELECT", "UPDATE_VALUE", "FINISH_SAVE_POST", "FINISH_CHANGE_STATUS"]
}, {
  key: "TIPS",
  values: ["ALL"]
}], "@manage")
