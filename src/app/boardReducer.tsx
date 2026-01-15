import type { Board } from "../types/board";
import { clamp } from "../utils/clamp";
import { getItemSize } from "./itemBounds";
import { createTextItem, createColorItem, createImageItem } from "./itemFactory";

export type BoardState = {
    board: Board;
    selectedItemId: string | null;
};

export type BoardAction =
    | { type: "SELECT_ITEM"; payload: { id: string | null } }
    | { type: "MOVE_ITEM"; payload: { id: string; x: number; y: number } }
    | { type: "MOVE_ITEM_BY"; payload: { id: string; dx: number; dy: number } }
    | { type: "BRING_TO_FRONT"; payload: { id: string } }
    | { type: "RESIZE_ITEM"; payload: { id: string, width: number, height: number } }
    | { type: "DELETE_ITEM"; payload: { id: string } }
    | { type: "ADD_COLOR_ITEM" }
    | { type: "ADD_TEXT_ITEM" }
    | { type: "ADD_IMAGE_ITEM", payload: { src: string } }
    | { type: "UPDATE_TEXT"; payload: { id: string; text: string; width: number; height: number } }
    | { type: "UPDATE_COLOR"; payload: { id: string, hex: string } }

export const initialBoardState: BoardState = {
    board: {
        id: "board-1",
        width: 1000,
        height: 700,
        items: [

        ],
    },
    selectedItemId: null,
};

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
    switch (action.type) {
        case "SELECT_ITEM": {
            return { ...state, selectedItemId: action.payload.id };
        }

        case "MOVE_ITEM": {
            const { id, x, y } = action.payload;

            const target = state.board.items.find((item) => item.id === id);
            if (!target) return state;

            const { width, height } = getItemSize(target);

            const clampedX = clamp(x, 0, state.board.width - width);
            const clampedY = clamp(y, 0, state.board.height - height);

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) => item.id === id ? { ...item, x: clampedX, y: clampedY } : item)
                }
            };
        }

        case "MOVE_ITEM_BY": {
            const { id, dx, dy } = action.payload;

            const target = state.board.items.find((item) => item.id === id);
            if (!target) return state;

            const nextX = target.x + dx;
            const nextY = target.y + dy;

            const { width, height } = getItemSize(target);

            const clampedX = clamp(nextX, 0, state.board.width - width);
            const clampedY = clamp(nextY, 0, state.board.height - height);

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) =>
                        item.id === id ? { ...item, x: clampedX, y: clampedY } : item
                    ),
                },
            };
        }


        case "BRING_TO_FRONT": {
            const { id } = action.payload;

            const maxZ = state.board.items.reduce(
                (acc, item) => Math.max(acc, item.zIndex),
                0
            );

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) =>
                        item.id === id ? { ...item, zIndex: maxZ + 1 } : item
                    ),
                },
            };
        }

        case "RESIZE_ITEM": {
            const { id, width, height } = action.payload;

            const target = state.board.items.find((item) => item.id === id);
            if (!target) return state;

            // Do not allow any other item to resize other than color/image items
            if (target.type !== "color" && target.type !== "image") return state;

            const MIN_SIZE = 24;

            // Prevent negative/too-small sizes
            const nextWidth = Math.max(MIN_SIZE, Math.round(width));
            const nextHeight = Math.max(MIN_SIZE, Math.round(height));

            // Keep resize items inside the board based on current position
            const maxWidth = state.board.width - target.x;
            const maxHeight = state.board.height - target.y;

            const clampedWidth = clamp(nextWidth, MIN_SIZE, maxWidth);
            const clampedHeight = clamp(nextHeight, MIN_SIZE, maxHeight);

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) =>
                        item.id === id ? { ...item, width: clampedWidth, height: clampedHeight } : item)
                }
            }
        }

        case "DELETE_ITEM": {
            const { id } = action.payload;

            const nextItems = state.board.items.filter((item) => item.id !== id);

            return {
                ...state,
                board: {
                    ...state.board,
                    items: nextItems,
                },
                selectedItemId: state.selectedItemId === id ? null : state.selectedItemId
            }
        }

        case "ADD_COLOR_ITEM": {
            const maxZ = state.board.items.reduce((acc, item) => Math.max(acc, item.zIndex), 0);

            const newItem = createColorItem({
                zIndex: maxZ + 1,
                x: 80,
                y: 80,
            });

            return {
                ...state,
                board: {
                    ...state.board,
                    items: [...state.board.items, newItem],
                },
                selectedItemId: newItem.id,
            };
        }

        case "ADD_TEXT_ITEM": {
            const maxZ = state.board.items.reduce((acc, item) => Math.max(acc, item.zIndex), 0);

            const newItem = createTextItem({
                zIndex: maxZ + 1,
                x: 240,
                y: 100,
            });

            return {
                ...state,
                board: {
                    ...state.board,
                    items: [...state.board.items, newItem],
                },
                selectedItemId: newItem.id,
            };
        }

        case "ADD_IMAGE_ITEM": {
            const maxZ = state.board.items.reduce((acc, item) => Math.max(acc, item.zIndex), 0);

            const src = action.payload.src.trim();
            if (!src) return state;

            const newItem = createImageItem({
                zIndex: maxZ + 1,
                x: 120,
                y: 120,
                src,
            });

            return {
                ...state,
                board: {
                    ...state.board,
                    items: [...state.board.items, newItem],
                },
                selectedItemId: newItem.id,
            };
        }


        case "UPDATE_TEXT": {
            const { id, text, width, height } = action.payload;

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) =>
                        item.id === id && item.type === "text" ? { ...item, text, width, height } : item)
                }
            }
        }

        case "UPDATE_COLOR": {
            const { id, hex } = action.payload;

            const nextHex = hex.trim();

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) =>
                        item.id === id && item.type === "color" ? { ...item, hex: nextHex } : item)
                }
            }
        }

        default: {
            return state;
        }
    }
}

