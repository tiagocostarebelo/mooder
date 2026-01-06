import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
};

const Toolbar = ({ state, dispatch }: ToolbarProps) => {
    const moveSelectedRight = () => {
        if (!state.selectedItemId) return;

        const item = state.board.items.find((i) => i.id === state.selectedItemId);
        if (!item) return;

        dispatch({
            type: "MOVE_ITEM",
            payload: { id: item.id, x: item.x + 20, y: item.y },
        });
    };

    return (
        <div className="flex gap-2">
            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={moveSelectedRight}
            >
                Move selected → 20px
            </button>
        </div>
    );
};

export default Toolbar;
