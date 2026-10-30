interface SectionOptions<T> {
  items: T[];
  renderer: (item: T) => void;
}

export default class Section<T> {
  private items: T[];
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionOptions<T>,
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;

    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) {
      throw new Error(`No se encontró el contenedor ${containerSelector}`);
    }
    this.container = container;
  }

  // Recibe los elementos a renderizar; si no se pasan, usa los del constructor.
  // Se recorren al revés porque addItem() inserta cada elemento al principio,
  // así la lista conserva el orden original.
  public renderItems(items: T[] = this.items): void {
    [...items].reverse().forEach((item) => this.renderer(item));
  }

  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
