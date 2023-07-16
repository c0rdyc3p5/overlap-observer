declare global {
    interface Window {
        OverlapObserver: typeof OverlapObserver;
    }
}
interface OverlapObserverInit {
    firstElement: Element | string;
    secondElement: Element | string;
    onOverlap: () => void;
    onNoOverlap: () => void;
}
export default class OverlapObserver {
    private readonly firstElement;
    private readonly secondElement;
    private readonly onOverlapCallback;
    private readonly onNoOverlapCallback;
    private isOverlapping;
    constructor(overlapObserverInit: OverlapObserverInit);
    observe(): void;
    private checkOverlap;
}
export {};
