Array.prototype.each_ = function (fn,this_) {
  var i = 0;
  for (var e of this) {
    typeof this_== 'undefined'
      ? fn(e,i++)
      : fn.call(this_,e,i++)
  }
};
module.exports         = Listener;
module.exports.default = Listener; // for ES6 shim-module loader
function Listener(callback) {
  var listener    = callback;
  listener.toArr  = function (arr,eventName) {
    if (arr.length < 2               ) {throw "Invalid argument: At least two elements in the Array are expected!"}
    if(!eventName || !eventName.split) {throw 'Invalid argument: Event name is missing or an invalid type!'}
    var l = arr.length, arr = [].concat(arr);
    while (l--) {
          arr.each_(function (a,b) {
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
          }.bind(this,arr.shift()));
    }
  };
  listener.to     = function (a,b,eventName) {
    if(!a || !b) { throw 'Invalid arguments: Both event emitters are required!' }
    if(!eventName || !eventName.split ) {throw 'Invalid argument: Event name is missing or is invalid type.'}
      this.toArr([a,b],eventName);
  };
  return listener
}
