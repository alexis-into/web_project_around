interface SectionOptions<T> {
    items: T[];
    renderer: (item: T) => void;
}
export default class Section<T> {
    private items;
    private renderer;
    private container;
    constructor({ items, renderer }: SectionOptions<T>, containerSelector: string);
    renderItems(): void;
    addItem(element: HTMLElement): void;
}
export {};
//# sourceMappingURL=Section.d.ts.map