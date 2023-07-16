declare global {
  interface Window {
    OverlapObserver: typeof OverlapObserver;
  }
}

interface OverlapObserverInit {
  firstElement: Element | string
  secondElement: Element | string
  onOverlap: () => void;
  onNoOverlap: () => void;
}

export default class OverlapObserver {
  private readonly firstElement: Element;
  private readonly secondElement: Element;
  private readonly onOverlapCallback: () => void;
  private readonly onNoOverlapCallback: () => void;
  private isOverlapping: boolean = false;

  constructor(overlapObserverInit: OverlapObserverInit) {
    this.firstElement = typeof overlapObserverInit.firstElement === 'string' ? document.querySelector(overlapObserverInit.firstElement)! : overlapObserverInit.firstElement;
    this.secondElement = typeof overlapObserverInit.secondElement === 'string' ? document.querySelector(overlapObserverInit.secondElement)! : overlapObserverInit.secondElement;
    this.onOverlapCallback = overlapObserverInit.onOverlap;
    this.onNoOverlapCallback = overlapObserverInit.onNoOverlap;
  }

  public observe(): void {
    window.addEventListener('resize', () => this.checkOverlap());
    document.addEventListener('DOMContentLoaded', () => this.checkOverlap());
    this.checkOverlap();
  }

  private checkOverlap(): void {
    const firstElementRect: DOMRect = this.firstElement.getBoundingClientRect();
    const secondElementRect: DOMRect = this.secondElement.getBoundingClientRect();
    const isOverlapping: boolean = !(
      firstElementRect.right < secondElementRect.left ||
      firstElementRect.left > secondElementRect.right ||
      firstElementRect.bottom < secondElementRect.top ||
      firstElementRect.top > secondElementRect.bottom
    );

    if (isOverlapping !== this.isOverlapping) {
      this.isOverlapping = isOverlapping;
      isOverlapping ? this.onOverlapCallback() : this.onNoOverlapCallback();
    }
  }
}

window.OverlapObserver = OverlapObserver;
