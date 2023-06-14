export function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

export function getFirstPropValue(obj){
    for(var prop in obj){
        return obj[prop];
    }
}

