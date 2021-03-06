import { fromEvent } from 'rxjs'
import Component, { ComponentProps } from '../../app/js/component';

export default class Collapse extends Component.Default {
    active: boolean = false;
    content: HTMLElement;
    contentHeight: number;

    constructor(element: ComponentProps) {
        super(element);

        this.content = this.getElement('content');
        this.contentHeight = this.content.scrollHeight;

        fromEvent(this.getElement('head'), 'click').subscribe(this.onClickCollapse)
    }

    onClickCollapse = () => {
        if (!this.active) {
            this.nRoot.classList.add('active');
            this.content.style.cssText = `height: ${this.contentHeight + 80}px`;
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