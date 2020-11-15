export function toIdMap<TId extends string | number, TItem extends { id: TId }>(arr: Array<TItem>) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<TId, TItem>);
}
