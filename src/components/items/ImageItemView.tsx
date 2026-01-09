import type { ImageItem } from "../../types/board";
import type { BoardAction } from "../../app/boardReducer";
import { useItemDrag } from "../../hooks/useItemDrag";
import { useItemResize } from "../../hooks/useItemResize";

type ImageItemViewProps = {
    item: ImageItem;
    isSelected: boolean;
    onSelect: (item: string) => void;
    dispatch: React.Dispatch<BoardAction>;
};

const ImageItemView = ({ item, isSelected, onSelect, dispatch }: ImageItemViewProps) => {
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
        <div
            className="absolute"
            style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
                zIndex: item.zIndex,
            }}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                className="h-full w-full overflow-hidden rounded-md border bg-white touch-none"
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
                    borderColor: isSelected ? "black" : "transparent",
                    cursor: "grab",
                }}
            >
                <img
                    src={item.src}
                    alt=""
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover select-none pointer-events-none"
                    draggable={false}
                />
            </button>

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

export default ImageItemView;