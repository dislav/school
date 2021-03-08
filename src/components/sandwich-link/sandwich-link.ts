import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class SandwichLink extends Component.Default {
    close: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);

        this.close = this.getElement('wrapper-close');
        fromEvent(this.close, 'click').subscribe(this.onBlur);

        fromEvent(this.nRoot, 'mouseover').subscribe(this.onHover);
        fromEvent(this.nRoot, 'mouseout').subscribe(this.onBlur);
    }

    onHover = () => {
        document.body.classList.add('link--open');
        this.nRoot.classList.add('active');
    }

    onBlur = () => {
        document.body.classList.remove('link--open');
        this.nRoot.classList.remove('active');
    }

    destroy = () => {
        // Destroy functions
    }
}