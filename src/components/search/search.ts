import axios from 'axios';
import { fromEvent } from 'rxjs';
import Component, { ComponentProps, getComponent } from '../../app/js/component';
import Input from '../input/input';

export default class Search extends Component.Default {
    nInput: Input;
    url: string;

    constructor(element: ComponentProps) {
        super(element);

        this.url = this.nRoot.getAttribute('data-url');
        this.nInput = new Input(getComponent('input', this.nRoot));

        fromEvent(this.getElement('icon'), 'click').subscribe(this.onClickSearch);
        fromEvent(this.nRoot, 'submit').subscribe(this.sendForm);
    }

    onClickSearch = () => {
        if (this.nRoot.classList.contains('hide')) {
            this.nRoot.classList.remove('hide');
        } else {
            this.nRoot.classList.add('hide');
        }
    };

    sendForm = async (e: Event) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(this.nInput.name, this.nInput.getValue());

        try {
            const { data } = await axios.post(this.url, formData);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }

    destroy = () => {
        // Destroy functions
    };
}
