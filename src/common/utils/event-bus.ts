type Callback = (...args: never[]) => void;

class EventBus {
    _listeners: Record<string, Callback[]> = {};

    on(event: string, callback: Callback): void {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(callback);
    }

    off(event: string, callback: Callback): void {
        if (!this._listeners[event]) throw new Error(`No event ${event}`);
        this._listeners[event] = this._listeners[event].filter(listener => listener !== callback);
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this._listeners[event]) throw new Error(`No event ${event}`);
        this._listeners[event].forEach(listener => listener(...(args as never[])));
    }
}

export default EventBus;
