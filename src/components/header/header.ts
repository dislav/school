import { fromEvent } from 'rxjs';
import Component, { ComponentProps, getComponent } from '../../app/js/component';
import Search from '../search/search';
import Sandwich from '../sandwich/sandwich';

export default class Header extends Component.Default {
    nSearch: Search;
    nSandwich: Sandwich;
    scrollY: number;

    constructor(element: ComponentProps) {
        super(element);

        this.nSearch = new Search(getComponent('search', this.nRoot));
        this.nSandwich = new Sandwich(getComponent('sandwich'), this);

        fromEvent(this.getElement('menu-sandwich'), 'click').subscribe(this.onClickSandwich);
    }

    onClickSandwich = () => {
        this.scrollY = window.scrollY || window.pageYOffset;
        document.body.classList.add('sandwich--open');

        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.classList.add('fixed-scroll');
        }, 400);
    }

    closeSandwich = () => {
        document.body.classList.remove('sandwich--open');
        document.body.classList.remove('fixed-scroll');
        window.scrollTo(0, this.scrollY);
    }

    destroy = () => {
    }
}