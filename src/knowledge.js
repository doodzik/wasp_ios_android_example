var contextCoordinate = require('./context-coordinate')

function validate(obj) {
  if (typeof obj.vocabulary !== 'string') {
    throw new Error('vocabulary required')
  }
  if (typeof obj.infoContent !== 'string') {
    throw new Error('infoContent required')
  }
  if (obj.contextCoordinates) {
    obj.contextCoordinates.forEach(val => contextCoordinate(val) )
  }
}

function serialize(buffer) {
  var obj = JSON.parse(buffer)
  validate(obj)
  return obj
}

function deserialize(obj) {
  validate(obj)
  var buffer = JSON.stringify(obj)
  return buffer
}

module.exports = { deserialize, serialize, validate }
