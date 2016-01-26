var semanticTag = require('./semantic-tag')

module.exports = function validate(obj) {
  semanticTag(obj)
  if(obj.adresses instanceof Array) {
    obj.adresses.forEach((val) => {
      if(typeof val !== 'string')
        throw new Error(val + 'isnt a string')
    })
  } else {
    throw new Error('adresses isnt a string')
  }
}
