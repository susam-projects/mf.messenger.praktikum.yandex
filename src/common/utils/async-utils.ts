export function wait(timeout = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
