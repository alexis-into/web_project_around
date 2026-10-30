export default class Section {
    items;
    renderer;
    container;
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor ${containerSelector}`);
        }
        this.container = container;
    }
    // Recibe los elementos a renderizar; si no se pasan, usa los del constructor.
    // Se recorren al revés porque addItem() inserta cada elemento al principio,
    // así la lista conserva el orden original.
    renderItems(items = this.items) {
        [...items].reverse().forEach((item) => this.renderer(item));
    }
    addItem(element) {
        this.container.prepend(element);
    }
}
//# sourceMappingURL=Section.js.map