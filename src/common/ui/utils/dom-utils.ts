export function toggleClass(element: Element, className: string): void {
    const classList = element.classList;
    if (classList.contains(className)) {
        classList.remove(className);
    } else {
        classList.add(className);
    }
}
