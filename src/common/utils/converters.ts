// disable rule for not repeating return type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toIdMap<TId extends string | number, TItem extends { id: TId }>(arr: Array<TItem>) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<TId, TItem>);
}
