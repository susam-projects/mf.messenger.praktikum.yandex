/**
 * use it in case of objects like NodeListOf<T> (something similar to array, but not exactly array)
 */
export function find<T>(arr: ArrayLike<T>, predicate: (item: T) => boolean): T | null {
    for (let i = 0; i < arr.length; ++i) {
        if (predicate(arr[i])) {
            return arr[i];
        }
    }
    return null;
}

/**
 * use it in case of objects like NodeListOf<T> (something similar to array, but not exactly array)
 * or in case you need non short circuit logic
 */
export function checkAll<T>(arr: ArrayLike<T>, predicate: (item: T) => boolean): boolean {
    let result = true;
    for (let i = 0; i < arr.length; ++i) {
        if (!predicate(arr[i])) {
            result = false;
        }
    }
    return result;
}
