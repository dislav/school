import Component, { ComponentProps, getComponent } from '../../app/js/component';
import Search from '../search/search';

export default class Header extends Component.Default {
    nSearch: Search;

    constructor(element: ComponentProps) {
        super(element);

        this.nSearch = new Search(getComponent('search', this.nRoot));
    }

    destroy = () => {
    }
}