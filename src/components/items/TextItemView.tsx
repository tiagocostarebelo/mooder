import { useEffect, useRef, useState } from "react";
import type { TextItem } from "../../types/board";
import type { BoardAction } from "../../app/boardReducer";
import { useItemDrag } from "../../hooks/useItemDrag";

type TextItemViewProps = {
    item: TextItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
    dispatch: React.Dispatch<BoardAction>;
};

const TextItemView = ({ item, isSelected, onSelect, dispatch }: TextItemViewProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(item.text);

    const dragHandlers = useItemDrag({
        id: item.id,
        x: item.x,
        y: item.y,
        dispatch,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    // Keep draft in sync if item.text changes from outside
    useEffect(() => {
        if (!isEditing) setDraft(item.text);
    }, [item.text, isEditing]);

    // Auto-focus when entering edit mode
    useEffect(() => {
        if (!isEditing) return;
        inputRef.current?.focus();
        inputRef.current?.select();
    }, [isEditing]);

    const commit = () => {
        const next = draft.trim();
        dispatch({
            type: "UPDATE_TEXT",
            payload: { id: item.id, text: next.length ? next : "New note" },
        });
        setIsEditing(false);
    };

    const cancel = () => {
        setDraft(item.text);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div
                className="absolute"
                style={{
                    left: item.x,
                    top: item.y,
                    zIndex: item.zIndex,
                    borderRadius: 6,
                    padding: "2px 6px",
                    outline: "2px solid black",
                    background: "white",
                }}
            >
                <input
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="bg-transparent text-lg font-medium text-neutral-900 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            commit();
                        }
                        if (e.key === "Escape") {
                            e.preventDefault();
                            cancel();
                        }
                    }}
                    onBlur={commit}
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            className="absolute text-lg font-medium text-neutral-900 touch-none"
            onClick={() => onSelect(item.id)}
            onDoubleClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSelect(item.id);
                setIsEditing(true);
            }}
            // Disable dragging while editing by simply not calling pointer handlers in edit mode
            onPointerDown={(e) => {
                e.stopPropagation();
                onSelect(item.id);
                dragHandlers.onPointerDown(e);
            }}
            onPointerMove={dragHandlers.onPointerMove}
            onPointerUp={dragHandlers.onPointerUp}
            onPointerCancel={dragHandlers.onPointerCancel}
            style={{
                left: item.x,
                top: item.y,
                zIndex: item.zIndex,
                outline: isSelected ? "2px solid black" : "none",
                borderRadius: 6,
                padding: "2px 6px",
                cursor: "grab",
            }}
        >
            {item.text}
        </button>
    );
};

export default TextItemView;
