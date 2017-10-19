import { forEach } from './collection';

export function assign(target, ...others) {
  return Object.assign(target, ...others);
}

export function pick(target, properties) {

  var result = {};

  forEach(properties, function(prop) {
    result[prop] = target[prop];
  });

  return result;
}