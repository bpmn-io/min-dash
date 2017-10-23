import { forEach } from './collection';


export function assign(target, ...others) {
  return Object.assign(target, ...others);
}

export function pick(target, properties) {

  var result = {};

  var obj = Object(target);

  forEach(properties, function(prop) {

    if (prop in obj) {
      result[prop] = target[prop];
    }
  });

  return result;
}