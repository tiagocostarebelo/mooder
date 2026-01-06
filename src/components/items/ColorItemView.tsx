import type { ColorItem } from "../../types/board";

type ColorItemViewProps = {
    item: ColorItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
};

const ColorItemView = ({ item, isSelected, onSelect }: ColorItemViewProps) => {
    return (
        <button
            type="button"
            aria-label={`Color swatch ${item.hex}`}
            className="absolute rounded-md border"
            onClick={() => onSelect(item.id)}
            style={{
                left: item.x,
                top: item.y,
                backgroundColor: item.hex,
                width: item.width,
                height: item.height,
                zIndex: item.zIndex,
                borderColor: isSelected ? "black" : "transparent",
            }}
        />
    )
}

export default ColorItemView;