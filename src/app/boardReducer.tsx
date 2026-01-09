import type { Board } from "../types/board";
import { clamp } from "../utils/clamp";
import { getItemSize } from "./itemBounds";
import { createTextItem, createColorItem } from "./itemFactory";

export type BoardState = {
    board: Board;
    selectedItemId: string | null;
};

export type BoardAction =
    | { type: "SELECT_ITEM"; payload: { id: string | null } }
    | { type: "MOVE_ITEM"; payload: { id: string; x: number; y: number } }
    | { type: "MOVE_ITEM_BY"; payload: { id: string; dx: number; dy: number } }
    | { type: "BRING_TO_FRONT"; payload: { id: string } }
    | { type: "DELETE_ITEM"; payload: { id: string } }
    | { type: "ADD_COLOR_ITEM" }
    | { type: "ADD_TEXT_ITEM" };

export const initialBoardState: BoardState = {
    board: {
        id: "board-1",
        width: 1000,
        height: 600,
        items: [
            {
                id: "1",
                type: "color",
                hex: "#F4D03F",
                width: 100,
                height: 100,
                x: 100,
                y: 80,
                zIndex: 1,
            },
            {
                id: "2",
                type: "text",
                text: "Warm & playful",
                x: 260,
                y: 100,
                zIndex: 2,
            },
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

        default: {
            return state;
        }
    }
}

