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
    const items = state.board.items;

    const handleSelect = (id: string) => {
        dispatch({ type: "SELECT_ITEM", payload: { id } });
        dispatch({ type: "BRING_TO_FRONT", payload: { id } });
    };

    return (
        <div
            ref={boardRef}
            className="relative bg-white border rounded-lg"
            style={{ width: state.board.width, height: state.board.height }}
            onPointerDown={() => dispatch({ type: "SELECT_ITEM", payload: { id: null } })}
        >
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
                        />
                    )
                }

                if (item.type === "image") {
                    return (
                        <ImageItemView
                            key={item.id}
                            item={item}
                            isSelected={isSelected}
                            onSelect={handleSelect}
                            dispatch={dispatch}
                        />
                    );
                }

                return null;
            })}
        </div>
    );
};

export default Canvas;
