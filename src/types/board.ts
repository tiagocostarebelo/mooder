export type BoardItemBase = {
    id: string;
    x: number;
    y: number;
    zIndex: number;
};

export type ImageItem = BoardItemBase & {
    type: "image";
    src: string;
    width: number;
    height: number;
};

export type ColorItem = BoardItemBase & {
    type: "color";
    hex: string;
    width: number;
    height: number;
};

export type TextItem = BoardItemBase & {
    type: "text";
    text: string;
};

export type BoardItem = ImageItem | ColorItem | TextItem;

export type Board = {
    id: string;
    width: number;
    height: number;
    items: BoardItem[];
}