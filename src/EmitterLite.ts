export default class EmitterLite {
  private static _defaultListeners = ['newListener', 'removeListener', 'error'];
  static removeListener(emit: EmitterLite, eventName: string, handler: Function) {
    return emit.removeListener(eventName, handler);
  }

  private _listeners: Map<string, Function[]>;
  constructor() {
    this._listeners = new Map();
    EmitterLite._defaultListeners.forEach((evtName) => {
      this._listeners.set(evtName, []);
    });
  }

  private _regListener(toPrev: boolean, eventName: string, handler: Function): EmitterLite {
    const listeners: Function[] = this._listeners.get(eventName) || [];
    if (toPrev)
      listeners.push(handler);
    else
      listeners.unshift(handler);
    this._listeners.set(eventName, listeners);
    return this;
  }

  private _regListenerAndRtnUnregFunc(toPrev: boolean, eventName: string, handler: Function): Function {
    this._regListener(toPrev, eventName, handler);
    return () => {
      this.removeListener(eventName, handler);
    };
  }

  on(eventName: string, handler: Function): Function {
    return this._regListenerAndRtnUnregFunc(false, eventName, handler);
  }

  prependOn(eventName: string, handler: Function): Function {
    return this._regListenerAndRtnUnregFunc(true, eventName, handler);
  }

  once(eventName: string, handler: Function): EmitterLite {
    const ctx = this;
    function onceWrapperHandler(...args) {
      handler.apply(undefined, args);
      ctx.removeListener(eventName, onceWrapperHandler);
    }
    this._regListener(false, eventName, onceWrapperHandler);
    return this;
  }

  addListener(eventName: string, handler: Function): EmitterLite {
    return this._regListener(false, eventName, handler);
  }

  prependListener(eventName: string, handler: Function): EmitterLite {
    return this._regListener(true, eventName, handler);
  }

  removeListener(eventName: string, handler: Function): boolean {
    let rtn = false;
    const handlers = this._listeners.get(eventName);
    const idx = handlers.indexOf(handler);
    if (idx >= 0) {
      handlers.splice(idx, 1);
      rtn = true;
    }
    return rtn;
  }

  removeAllListener(eventName?: string): boolean {
    let rtn: boolean = false;
    if (!eventName) {
      if (this._listeners.has(eventName)) {
        if (EmitterLite._defaultListeners.indexOf(eventName) >= 0) {
          this._listeners.set(eventName, []);
        } else {
          this._listeners.delete(eventName);
        }
        rtn = true;
      }
    }
    return rtn;
  }

  emit(eventName: string, args?: any[] | undefined): boolean {
    try {
      const listeners: Function[] = this._listeners.get(eventName);
      let rtn: boolean = false;
      if (listeners && listeners.length > 0) {
        for (let fn of listeners) {
          fn.apply(undefined, args);
        }
        rtn = true;
      }
      return rtn;
    } catch (e) {
      this.emit('error');
      return false;
    }
  }
}
