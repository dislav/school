import { fromEvent } from 'rxjs'
import Component, { ComponentProps } from '../../app/js/component';

export default class Collapse extends Component.Default {
    active: boolean = false;
    content: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);

        this.content = this.getElement('content');

        fromEvent(this.getElement('head'), 'click').subscribe(this.onClickCollapse)
    }

    onClickCollapse = () => {
        if (!this.active) {
            this.nRoot.classList.add('active');

            const height = this.content.scrollHeight;
            this.content.style.cssText = `height: ${height}px`;
            this.active = true;
        } else {
            this.nRoot.classList.remove('active');
            this.content.style.cssText = 'height: 0';
            this.active = false;
        }
    }

    destroy = () => {
        // Destroy functions
    }
}