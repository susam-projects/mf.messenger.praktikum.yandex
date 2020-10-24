type Callback = (...args: any[]) => void;

class EventBus {
    listeners: Record<string, Callback[]> = {};

    on(event: string, callback: Callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Callback) {
        if (!this.listeners[event]) throw new Error(`No event ${event}`);
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) throw new Error(`No event ${event}`);
        this.listeners[event].forEach(listener => listener(...args));
    }
}

export default EventBus;
