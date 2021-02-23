import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
    input: HTMLInputElement;
    name: string;
    value: string;

    constructor(element: ComponentProps) {
        super(element);

        this.input = this.nRoot.querySelector('input');
        this.name = this.input.name;
        this.value = this.input.value;

        fromEvent(this.input, 'input').subscribe(this.onChangeInput);
    }

    getValue = () => this.input.value;

    onChangeInput = (e: Event) => {
        if ((<HTMLInputElement>e.target)?.value?.length) {
            this.nRoot.classList.add('fill');
        } else {
            this.nRoot.classList.remove('fill');
        }
    }

    destroy = () => {
        // Destroy functions
    }
}