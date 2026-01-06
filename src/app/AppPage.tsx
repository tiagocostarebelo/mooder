import { useReducer } from "react";
import AppLayout from "./AppLayout";
import Canvas from "../components/Canvas/Canvas";
import Toolbar from "../components/Toolbar/Toolbar";
import { boardReducer, initialBoardState } from "./boardReducer";

const AppPage = () => {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);

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
