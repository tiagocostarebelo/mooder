import type { ColorItem } from "../../types/board";
import { useItemDrag } from "../../hooks/useItemDrag";
import type { BoardAction } from "../../app/boardReducer";

type ColorItemViewProps = {
    item: ColorItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
    dispatch: React.Dispatch<BoardAction>;
};

const ColorItemView = ({ item, isSelected, onSelect, dispatch }: ColorItemViewProps) => {
    const dragHandlers = useItemDrag({
        id: item.id,
        x: item.x,
        y: item.y,
        dispatch,
    });

    return (
        <button
            type="button"
            aria-label={`Color swatch ${item.hex}`}
            className="absolute rounded-md border touch-none"
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
                backgroundColor: item.hex,
                width: item.width,
                height: item.height,
                zIndex: item.zIndex,
                borderColor: isSelected ? "black" : "transparent",
                cursor: "grab"
            }}
        />
    )
}

export default ColorItemView;