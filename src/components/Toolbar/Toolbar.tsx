import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    boardRef: React.RefObject<HTMLDivElement | null>;
};

const Toolbar = ({ state, dispatch, boardRef }: ToolbarProps) => {
    const [imageUrl, setImageUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const selectedItem = state.selectedItemId ? state.board.items.find((item) => item.id === state.selectedItemId) : null;
    const selectedColorItem = selectedItem?.type === "color" ? selectedItem : null;

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
    };

    const run = (fn: () => void) => {
        fn();
        setIsOpen(false);
    };

    const urlRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) urlRef.current?.focus();
    }, [isOpen]);

    const ControlsContent = (
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-3">
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
                <input
                    ref={urlRef}
                    className="w-full md:w-80 rounded-md border bg-white px-2 py-1 text-sm"
                    placeholder="Paste image URL…"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button
                    type="button"
                    className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                    onClick={() => {
                        const src = imageUrl.trim();
                        if (!src) return;
                        dispatch({ type: "ADD_IMAGE_ITEM", payload: { src } });
                        setImageUrl("");
                    }}
                >
                    Add image
                </button>
            </div>

            <button
                type="button"
                className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_COLOR_ITEM" })}
            >
                Add color
            </button>

            {selectedColorItem && (
                <div className="flex items-center gap-2">
                    <label className="text-sm text-neutral-700">Color</label>

                    <input
                        type="color"
                        value={selectedColorItem.hex}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_COLOR",
                                payload: { id: selectedColorItem.id, hex: e.target.value },
                            })
                        }
                        className="h-8 w-10 cursor-pointer rounded border"
                        aria-label="Pick color"
                    />

                    <input
                        type="text"
                        value={selectedColorItem.hex}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_COLOR",
                                payload: { id: selectedColorItem.id, hex: e.target.value },
                            })
                        }
                        className="w-28 rounded-md border bg-white px-2 py-1 text-sm"
                        spellCheck={false}
                    />
                </div>
            )}

            <button
                type="button"
                className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_TEXT_ITEM" })}
            >
                Add text
            </button>
        </div >

    )


    return (
        <>
            {/** DESKTOP */}
            <div className="hidden md:flex md:items-center md:justify-between md:gap-3">
                <div className="min-w-0">{ControlsContent}</div>
                <button
                    type="button"
                    className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                    onClick={(exportPng)}
                >Export as PNG</button>
            </div>

            {/** MOBILE */}
            <div className="flex items-center justify-between gap-2 md:hidden">
                <button
                    type="button"
                    className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                    onClick={() => setIsOpen(true)}
                >
                    Controls
                </button>

                <button
                    type="button"
                    className="whitespace-nowrap rounded-md border bg-white px-3 py-1 text-sm"
                    onClick={exportPng}
                >
                    Export PNG
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    {/* Backdrop */}
                    <button
                        type="button"
                        className="whitespace-nowrap fixed inset-0 z-40 bg-black/40"
                        aria-label="Close controls"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sheet */}
                    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-auto rounded-t-2xl bg-white p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold">Controls</p>
                            <button
                                type="button"
                                className="whitespace-nowrap rounded-md border px-3 py-1 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>

                        {ControlsContent}
                    </div>
                </div>
            )}


        </>
    );
};

export default Toolbar;
