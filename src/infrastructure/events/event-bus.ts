type Callback = (...args: any[]) => void;

class EventBus {
    _listeners: Record<string, Callback[]> = {};

    on(event: string, callback: Callback) {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(callback);
    }

    off(event: string, callback: Callback) {
        if (!this._listeners[event]) throw new Error(`No event ${event}`);
        this._listeners[event] = this._listeners[event].filter(listener => listener !== callback);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this._listeners[event]) throw new Error(`No event ${event}`);
        this._listeners[event].forEach(listener => listener(...args));
    }
}

export default EventBus;
