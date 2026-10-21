export interface CardData {
    name: string;
    link: string;
}
export type HandleCardClick = (data: CardData) => void;
export default class Card {
    private data;
    private templateSelector;
    private handleCardClick;
    constructor(data: CardData, templateSelector: string, handleCardClick: HandleCardClick);
    private getTemplate;
    private handleLikeClick;
    private handleDeleteClick;
    private setEventListeners;
    generateCard(): HTMLElement;
}
//# sourceMappingURL=Card.d.ts.map