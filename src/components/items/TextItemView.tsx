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
    const dragHandlers = useItemDrag({
        id: item.id,
        x: item.x,
        y: item.y,
        dispatch,
    });

    return (
        <button
            type="button"
            className="absolute text-lg font-medium text-neutral-900 touch-none"
            onClick={() => onSelect(item.id)}
            onPointerDown={(e) => {
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
