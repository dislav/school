import { fromEvent } from 'rxjs';
import Component, { ComponentProps, getComponent } from '../../app/js/component';
import ModalSlider from '../modal-slider/modal-slider';

export default class Modal extends Component.Default {
    id: string;
    links: HTMLElement[];
    nModalSlider: ModalSlider;

    constructor(element: ComponentProps) {
        super(element);

        this.id = this.nRoot.id;
        this.links = Array.from(document.querySelectorAll('.modal-link'));

        if (getComponent('modal-slider', this.nRoot).component)
            this.nModalSlider = new ModalSlider(getComponent('modal-slider', this.nRoot));

        this.links.forEach((link) => fromEvent(link, 'click').subscribe(this.onClickLink));
        fromEvent(this.getElement('close'), 'click').subscribe(this.hideModal);
    }

    onClickLink = (e: Event) => {
        const target = (<HTMLElement>e.currentTarget);
        const id = target.getAttribute('data-id');
        const slideIndex = target.getAttribute('data-index');
        
        this.nModalSlider.nSwiper.slideTo(+slideIndex + 1);

        if (id === this.id) this.showModal();
    };

    showModal = () => this.nRoot.classList.add('show');

    hideModal = () => this.nRoot.classList.remove('show');

    destroy = () => {
        // Destroy functions
    };
}
