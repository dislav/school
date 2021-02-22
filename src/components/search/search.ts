import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Search extends Component.Default {
    constructor(element: ComponentProps) {
        super(element);

        fromEvent(this.getElement('icon'), 'click').subscribe(this.onClickSearch);
    }

    onClickSearch = () => {
        if (this.nRoot.classList.contains('hide')) {
            this.nRoot.classList.remove('hide');
        } else {
            this.nRoot.classList.add('hide');
        }
    };

    destroy = () => {
        // Destroy functions
    };
}
