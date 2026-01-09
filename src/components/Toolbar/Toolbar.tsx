import { useState } from "react";
import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
};

const Toolbar = ({ state, dispatch }: ToolbarProps) => {
    const [imageUrl, setImageUrl] = useState("");

    const moveSelectedFarRight = () => {
        if (!state.selectedItemId) return;

        const item = state.board.items.find((item) => item.id === state.selectedItemId);
        if (!item) return;

        // push way beyond canvas width on purpose
        dispatch({
            type: "MOVE_ITEM",
            payload: { id: state.selectedItemId, x: 5000, y: item.y },
        });
    };

    return (
        <div className="flex gap-2">
            <input
                className="w-80 rounded-md border bg-white px-2 py-1 text-sm"
                placeholder="Paste image URL…"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => {
                    const src = imageUrl.trim();
                    if (!src) return;
                    dispatch({ type: "ADD_IMAGE_ITEM", payload: { src } });
                    setImageUrl("");
                }}
            >
                Add image
            </button>

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

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={moveSelectedFarRight}
            >
                Move selected → x=5000
            </button>
        </div>
    );
};

export default Toolbar;
