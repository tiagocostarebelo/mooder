import type { Board } from "../types/board";
import { createTextItem, createColorItem } from "./itemFactory";

export type BoardState = {
    board: Board;
    selectedItemId: string | null;
};

export type BoardAction =
    | { type: "SELECT_ITEM"; payload: { id: string | null } }
    | { type: "MOVE_ITEM"; payload: { id: string; x: number; y: number } }
    | { type: "ADD_COLOR_ITEM" }
    | { type: "ADD_TEXT_ITEM" };

export const initialBoardState: BoardState = {
    board: {
        id: "board-1",
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

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) => item.id === id ? { ...item, x, y } : item)
                }
            };
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

