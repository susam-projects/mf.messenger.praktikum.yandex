export function toggleClass(element: Element, className: string): void {
    const { classList } = element;
    if (classList.contains(className)) {
        classList.remove(className);
    } else {
        classList.add(className);
    }
}

export function removeAllChildren(node: Element): void {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export function findNode<T extends Element>(element: Element, selector: string): T | null {
    if (element.matches(selector)) {
        return element as T;
    }
    return element.querySelector(selector);
}

export function findClosest<T extends Element>(element: Element, selector: string): T | null {
    return element.closest(selector);
}

export function createElement(markupText: string): Element | null {
    const div = document.createElement("div");
    div.innerHTML = markupText.trim();
    return div.firstChild as Element | null;
}

export function addAttribute(markupText: string, attributeName: string, attributeValue: string): string {
    if (!markupText) return markupText;
    if (!haveFirstTag(markupText)) throw new Error("invalid markup");
    const firstTag = getFirstTag(markupText);
    const tagWithAttribute = addTagAttribute(firstTag, attributeName, attributeValue);
    return setFirstTag(markupText, tagWithAttribute);
}

const HAVE_FIRST_TAG_PATTERN = /^\s*<([^<])+?>/;

function haveFirstTag(markupText: string): boolean {
    return !!HAVE_FIRST_TAG_PATTERN.exec(markupText);
}

const TAG_PATTERN = /<[^<]+?>/;

function getFirstTag(markupText: string): string {
    const result = TAG_PATTERN.exec(markupText)!;
    return result[0];
}

const TAG_CONTENT_PATTERN = /<([^<]+)>/;

function addTagAttribute(tagText: string, attributeName: string, attributeValue: string): string {
    const tagContentSearchResult = TAG_CONTENT_PATTERN.exec(tagText);
    if (!tagContentSearchResult) return tagText;
    const tagContent = tagContentSearchResult[1];
    return `<${tagContent} ${attributeName}="${attributeValue}">`;
}

function setFirstTag(markupText: string, newTagText: string): string {
    return markupText.replace(TAG_PATTERN, newTagText);
}
