// Before test, run typings install
import {Listener} from '../'
import {EventEmitter} from 'events';
// class EE extends EventEmitter {
//   constructor() { super() }
//   name: string
// }

var arr: any = [1,2,3,4,5,6,7,8,9];
    for (let n in arr) {
         let ee: any = new EventEmitter;
             ee.name = n;
             arr.hasOwnProperty(n) && (arr[n] = ee);
    }

new Listener<any>(function (i) {
  console.log(i.origin.name,' --> ',i.target.name);
}).onArr(arr,'e');

arr[6].emit('e');

