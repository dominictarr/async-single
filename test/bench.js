

module.exports = function (name, AsyncSingle) {
  var called = false
  var async = AsyncSingle(function (value, cb) {
    called = true
    cb(null, value)
  }, {min: 10, max: 20})

  var start = Date.now()
  for(var i = 0; i < 500000; i++)
    async.write(i)

  console.log(name, Date.now() - start)
}

//after a couple of runs it becomes much faster because jit has kicked in
//module.exports('closure', require('../closures'))
//module.exports('proto', require('../proto'))
//module.exports('closure', require('../closures'))
//module.exports('proto', require('../proto'))
//module.exports('proto', require('./proto'))

function createClear() {
  var timer
  return {
    write: function () {
      clearTimeout(timer)
      timer = setTimeout(function () {}, timer)
    }
  }
}

function createDouble() {
  var timer
  return {
    write: function () {
      if(timer) return
      clearTimeout(timer)
      timer = setTimeout(function () {
        timer = null
      }, timer)
    }
  }
}


module.exports('closure', require('../closures'))
module.exports('proto', require('../proto'))
module.exports('clear', createClear)
module.exports('double', createDouble)

