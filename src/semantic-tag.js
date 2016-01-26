function ValidURL(str) {
  var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    alert("Please enter a valid URL.");
    return false;
  } else {
    return true;
  }
}

module.exports = function validate(obj) {
  if(obj && typeof obj.name == 'string' && typeof obj.sis instanceof Array) {
    obj.sis.forEach((val) => {
      if(!ValidURL(val))
        throw new Error(val + 'isnt an url')
    })
  }
}
