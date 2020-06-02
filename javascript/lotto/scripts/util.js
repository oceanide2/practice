const getType = (value) => Object.prototype.toString.call(value).slice(8, -1)

export const isNull = (value) => getType(value) === 'Null'
export const isUndefined = (value) => getType(value) === 'Undefined'
export const isString = (value) => getType(value) === 'String'
export const isArray = (value) => getType(value) === 'Array'
export const isObject = (value) => getType(value) === 'Object'
export const isBoolean = (value) => getType(value) === 'Boolean'
export const isNumber = (value) => getType(value) === 'Number'

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}
