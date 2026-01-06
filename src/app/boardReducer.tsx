import type { Board, BoardItem } from "../types/board";

export type BoardState = {
    board: Board;
    selectedItemId: string | null;
};

export type BoardAction =
    | { type: "SELECT_ITEM"; payload: { id: string | null } }
    | { type: "ADD_ITEM"; payload: { item: BoardItem } };

export const initialBoardState: BoardState = {
    board: {
        id: "board-1",
        items: [
            {
                id: "1",
                type: "color",
                hex: "#F4D03F",
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

        case "ADD_ITEM": {
            return {
                ...state,
                board: {
                    ...state.board,
                    items: [...state.board.items, action.payload.item],
                },
            };
        }

        default: {
            return state;
        }
    }
}

