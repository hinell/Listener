Object.defineProperty(Array.prototype,'each_',{
   writable: true
  ,value: function (fn,this_) {
  var i = 0;
  for (var e of this) {
    typeof this_== 'undefined'
      ? fn(e,i++)
      : fn.call(this_,e,i++)
  }
}
});

module.exports          = Listener;
module.exports.Listener =
module.exports.default  = Listener; // provides compatibility with es6 and commonjs loaders
function Listener(callback) {
  var listener        = callback;
      listener.onArr  = function (arr,eventName) {
        if (arr.length < 2               ) {throw "Invalid argument: At least two elements in the Array are expected!"}
        if(!eventName || !eventName.split) {throw 'Invalid argument: Event name is missing or an invalid type!'}
        var l = arr.length, arr = [].concat(arr);
        while (l--) {
              arr.each_(function (a,b) {
                this.on(a,b,eventName)
              }.bind(this,arr.shift()));
        }
      };
      //
      listener.on     = function (a,b,eventName) {
        if(!a || !b) { throw 'Invalid arguments: Both event emitters are required!' }
        if(!eventName || !eventName.split ) {throw 'Invalid argument: Event name is missing or is invalid type.'}
          // TODO: Make sure no duplicates being added
          (a.on || a.addEventListener).call(a,eventName, function () {
          var args = [].slice.call(arguments);
              args.splice(0,0,{origin: a, target: b});
              this.apply(b,args); // call Listener right here
        }.bind(this));
          (b.on || b.addEventListener).call(b,eventName, function () {
          var args = [].slice.call(arguments);
              args.splice(0,0,{origin: b, target: a});
              this.apply(a,args); // call Listener right here
        }.bind(this))
      };
  return listener
}