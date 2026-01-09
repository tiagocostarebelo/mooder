import { useEffect, useReducer, useRef } from "react";
import AppLayout from "./AppLayout";
import Canvas from "../components/Canvas/Canvas";
import Toolbar from "../components/Toolbar/Toolbar";
import { boardReducer, initialBoardState } from "./boardReducer";

const AppPage = () => {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);
    const boardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                (target?.getAttribute("contenteditable") === "true");

            if (isTyping) return;

            if (!state.selectedItemId) return;

            const step = e.shiftKey ? 10 : 1;

            let dx = 0;
            let dy = 0;

            // Delete / Backspace removes selected item
            if (e.key === "Delete" || e.key === "Backspace") {
                if (!state.selectedItemId) return;

                e.preventDefault();
                dispatch({ type: "DELETE_ITEM", payload: { id: state.selectedItemId } });
                return;
            }

            // Keyboard movement
            switch (e.key) {
                case "ArrowLeft":
                    dx = -step;
                    break;
                case "ArrowRight":
                    dx = step;
                    break;
                case "ArrowUp":
                    dy = -step;
                    break;
                case "ArrowDown":
                    dy = step;
                    break;
                default:
                    return;
            }

            e.preventDefault();

            dispatch({
                type: "MOVE_ITEM_BY",
                payload: { id: state.selectedItemId, dx, dy },
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state.selectedItemId, dispatch]);


    return (
        <AppLayout>
            <div className="mb-4">
                <Toolbar state={state} dispatch={dispatch} boardRef={boardRef} />
            </div>
            <Canvas state={state} dispatch={dispatch} boardRef={boardRef} />
        </AppLayout>
    );
};

export default AppPage;
