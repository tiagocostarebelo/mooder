import type { ColorItem } from "../../types/board";
import type { BoardAction } from "../../app/boardReducer";
import { useItemDrag } from "../../hooks/useItemDrag";
import { useItemResize } from "../../hooks/useItemResize";

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

    const resizeHandlers = useItemResize({
        id: item.id,
        width: item.width,
        height: item.height,
        dispatch,
    });

    return (
        <div className="absolute"
            style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
                zIndex: item.zIndex
            }}
        >
            <button
                type="button"
                aria-label={`Color swatch ${item.hex}`}
                className="h-full w-full rounded-md border touch-none"
                onClick={() => onSelect(item.id)}
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
                    backgroundColor: item.hex,
                    width: item.width,
                    height: item.height,
                    zIndex: item.zIndex,
                    borderColor: isSelected ? "black" : "transparent",
                    cursor: "grab"
                }}
            />

            {isSelected && (
                <div
                    role="button"
                    tabIndex={0}
                    aria-label="Resize"
                    className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize rounded-sm bg-black/70 touch-none"
                    onPointerDown={resizeHandlers.onPointerDown}
                    onPointerMove={resizeHandlers.onPointerMove}
                    onPointerUp={resizeHandlers.onPointerUp}
                    onPointerCancel={resizeHandlers.onPointerCancel}
                />
            )}
        </div>

    )
}

export default ColorItemView;