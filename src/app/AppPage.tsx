import { useEffect, useReducer } from "react";
import AppLayout from "./AppLayout";
import Canvas from "../components/Canvas/Canvas";
import Toolbar from "../components/Toolbar/Toolbar";
import { boardReducer, initialBoardState } from "./boardReducer";

const AppPage = () => {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don’t hijack typing later (when we add text editing)
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
                <Toolbar state={state} dispatch={dispatch} />
            </div>
            <Canvas state={state} dispatch={dispatch} />
        </AppLayout>
    );
};

export default AppPage;
