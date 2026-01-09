import { useRef } from "react";
import type { BoardAction } from "../app/boardReducer";

type UseItemResizeArgs = {
    id: string;
    width: number;
    height: number;
    dispatch: React.Dispatch<BoardAction>;
};

export function useItemResize({ id, width, height, dispatch }: UseItemResizeArgs) {
    const ref = useRef<{
        startPointerX: number;
        startPointerY: number;
        startWidth: number;
        startHeight: number;
        isResizing: boolean;
        pointerId: number | null;
    } | null>(null);

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;

        e.stopPropagation(); //prevent selecting/dragging from the handle
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

        ref.current = {
            startPointerX: e.clientX,
            startPointerY: e.clientY,
            startWidth: width,
            startHeight: height,
            isResizing: true,
            pointerId: e.pointerId,
        };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const r = ref.current;
        if (!r?.isResizing) return;
        if (r.pointerId !== e.pointerId) return;

        const dx = e.clientX - r.startPointerX;
        const dy = e.clientY - r.startPointerY;

        dispatch({
            type: "RESIZE_ITEM",
            payload: {
                id,
                width: r.startWidth + dx,
                height: r.startHeight + dy,
            },
        });
    };

    const endResize = (e: React.PointerEvent) => {
        const r = ref.current;
        if (!r?.isResizing) return;
        if (r.pointerId !== e.pointerId) return;

        ref.current = null;
    };

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp: endResize,
        onPointerCancel: endResize,
    };

}