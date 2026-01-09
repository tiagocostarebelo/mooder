import React, { useRef } from "react";
import type { BoardAction } from "../app/boardReducer";

type UseItemDragArgs = {
    id: string;
    x: number;
    y: number;
    dispatch: React.Dispatch<BoardAction>;
};

export function useItemDrag({ id, x, y, dispatch }: UseItemDragArgs) {
    const dragRef = useRef<{
        startPointerX: number;
        startPointerY: number;
        startItemX: number;
        startItemY: number;
        isDragging: boolean;
        pointerId: number | null;
    } | null>(null);

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;

        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

        dragRef.current = {
            startPointerX: e.clientX,
            startPointerY: e.clientY,
            startItemX: x,
            startItemY: y,
            isDragging: true,
            pointerId: e.pointerId,
        }
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag?.isDragging) return;
        if (drag.pointerId !== e.pointerId) return;

        const dx = e.clientX - drag.startPointerX;
        const dy = e.clientY - drag.startPointerY;

        dispatch({
            type: "MOVE_ITEM",
            payload: {
                id,
                x: drag.startItemX + dx,
                y: drag.startItemY + dy,
            },
        });
    };

    const endDrag = (e: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag?.isDragging) return;
        if (drag.pointerId !== e.pointerId) return;

        dragRef.current = null;
    };

    return { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag };
}