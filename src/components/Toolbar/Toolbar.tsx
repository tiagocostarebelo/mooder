import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
};

const Toolbar = ({ state, dispatch }: ToolbarProps) => {


    return (
        <div className="flex gap-2">
            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_COLOR_ITEM" })}
            >
                Add color
            </button>

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_TEXT_ITEM" })}
            >
                Add text
            </button>
        </div>
    );
};

export default Toolbar;
