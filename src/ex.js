var Listener = require('../');
var EE       = require('events');
var arr      = [0,1,2,3,4,5,6,7,8,9];
    for (var i in arr) {
      arr[i] = new EE();
      arr[i].name = i
    }
    // console.dir(arr,{colors: true, depth: 0})
new Listener(function (info) {
   console.log(info.origin.name,'- calls to ->',this.name)
}).toArr(arr,'event');

arr[3].emit('event','DATA_IS_HERE');
