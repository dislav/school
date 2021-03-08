import { fromEvent } from 'rxjs';
import Component, { ComponentProps, getComponents } from '../../app/js/component';
import Header from '../header/header';
import SandwichLink from '../sandwich-link/sandwich-link';

export default class Sandwich extends Component.Default {
    nLinks: SandwichLink[];

    constructor(element: ComponentProps, header: Header) {
        super(element);

        this.nLinks = getComponents('sandwich-link').map(component => new SandwichLink(component));
        
        fromEvent(this.getElement('header-close'), 'click').subscribe(() => header.closeSandwich());
    }

    destroy = () => {
        // Destroy functions
    }
}