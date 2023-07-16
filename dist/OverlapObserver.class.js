export default class OverlapObserver{firstElement;secondElement;onOverlapCallback;onNoOverlapCallback;isOverlapping=!1;constructor(e){this.firstElement="string"==typeof e.firstElement?document.querySelector(e.firstElement):e.firstElement,this.secondElement="string"==typeof e.secondElement?document.querySelector(e.secondElement):e.secondElement,this.onOverlapCallback=e.onOverlap,this.onNoOverlapCallback=e.onNoOverlap}observe(){window.addEventListener("resize",()=>this.checkOverlap()),document.addEventListener("DOMContentLoaded",()=>this.checkOverlap()),this.checkOverlap()}checkOverlap(){var e=this.firstElement.getBoundingClientRect(),t=this.secondElement.getBoundingClientRect(),e=!(e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom);e!==this.isOverlapping&&((this.isOverlapping=e)?this.onOverlapCallback():this.onNoOverlapCallback())}}window.OverlapObserver=OverlapObserver;