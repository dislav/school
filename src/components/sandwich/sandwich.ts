import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';
import Header from '../header/header';

export default class Sandwich extends Component.Default {
    constructor(element: ComponentProps, header: Header) {
        super(element);

        fromEvent(this.getElement('header-close'), 'click').subscribe(() => header.closeSandwich());
    }

    destroy = () => {
        // Destroy functions
    }
}