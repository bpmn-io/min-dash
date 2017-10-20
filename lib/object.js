import { forEach } from './collection';

export function assign(target, ...others) {
  return Object.assign(target, ...others);
}

export function pick(target, properties) {

  var result = {};

  forEach(properties, function(prop) {
    if (target.hasOwnProperty(prop)) {
      result[prop] = target[prop];
    }
  });

  return result;
}