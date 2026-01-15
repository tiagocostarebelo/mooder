import { useLayoutEffect, useRef, useState } from "react";
import type { BoardAction, BoardState } from "../../app/boardReducer";
import ColorItemView from "../items/ColorItemView";
import TextItemView from "../items/TextItemView";
import ImageItemView from "../items/ImageItemView";

type CanvasProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    boardRef: React.RefObject<HTMLDivElement | null>;
};

const Canvas = ({ state, dispatch, boardRef }: CanvasProps) => {
    const [scale, setScale] = useState(1);

    const items = state.board.items;
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (id: string) => {
        dispatch({ type: "SELECT_ITEM", payload: { id } });
        dispatch({ type: "BRING_TO_FRONT", payload: { id } });
    };

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        const update = () => {
            const available = el.clientWidth;
            const nextScale = Math.min(1, available / state.board.width);
            setScale(nextScale);
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);

        return () => ro.disconnect();
    }, [state.board.width]);

    const isEmpty = items.length === 0;

    return (
        <div ref={viewportRef}>
            <div className="mx-auto w-fit">
                <div
                    className="origin-top-left"
                    style={{
                        width: state.board.width,
                        height: state.board.height,
                        transform: `scale(${scale})`,
                    }}
                >
                    <div
                        ref={boardRef}
                        className="relative mx-auto rounded-xl bg-white shadow-[0_18px_60px_rgba(139,92,246,0.35)]"
                        style={{ width: state.board.width, height: state.board.height }}
                        onPointerDown={() => dispatch({ type: "SELECT_ITEM", payload: { id: null } })}
                    >
                        {/* Empty state */}
                        {isEmpty && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="rounded-2xl border border-black/10 bg-white/90 px-8 py-6 text-center shadow-xl">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Start a board
                                    </p>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Add an image, drop a color swatch, or write a note.
                                    </p>
                                    <p className="mt-3 text-xs text-slate-500">
                                        Tip: Select an item → Delete to remove · Arrows to nudge · Shift = 10px
                                    </p>
                                </div>
                            </div>
                        )}

                        {items.map((item) => {
                            const isSelected = state.selectedItemId === item.id;

                            if (item.type === "color") {
                                return (
                                    <ColorItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                );
                            }

                            if (item.type === "text") {
                                return (
                                    <TextItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                );
                            }

                            if (item.type === "image") {
                                return (
                                    <ImageItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Canvas;
