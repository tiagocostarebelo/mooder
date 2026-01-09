import { useState } from "react";
import * as htmlToImage from "html-to-image";
import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    boardRef: React.RefObject<HTMLDivElement | null>;
};

const Toolbar = ({ state, dispatch, boardRef }: ToolbarProps) => {
    const [imageUrl, setImageUrl] = useState("");

    const exportPng = async () => {
        const node = boardRef.current;
        if (!node) return;

        try {
            const dataUrl = await htmlToImage.toPng(node, {
                cacheBust: true,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = "moodboard.png";
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
            alert(
                "Export failed. This is often caused by image URLs that block cross-origin export (CORS). Try a different image source."
            )
        }
    }

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

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={exportPng}
            >Export as PNG</button>
        </div>
    );
};

export default Toolbar;
