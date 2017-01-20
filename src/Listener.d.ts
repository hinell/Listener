/// <reference path="../typings/index.d.ts" />
// type EventEmitter = EventTarget | EE;
export interface InfoObj<EventEmitter> {
  origin        : EventEmitter
  target        : EventEmitter
  [key: string] : any
}

export class Listener<EE> {
  constructor (callback     : (info: InfoObj<EE>) => void )
  onArr       (eventEmitters: Array<EE>, eventName: string): void
  on          (eventEmitter : EE       , eventName: string): void
}

export default Listener
