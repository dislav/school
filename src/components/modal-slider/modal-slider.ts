import { fromEvent } from 'rxjs';
import Swiper from 'swiper';
import Component, { ComponentProps } from '../../app/js/component';

export default class ModalSlider extends Component.Default {
    nSwiper: Swiper;

    constructor(element: ComponentProps) {
        super(element);

        this.nSwiper = new Swiper(this.getElement('container'), {
            slidesPerView: 1,
            loop: true,
            speed: 600,
        });

        fromEvent(this.getElement('navigation-button-prev'), 'click').subscribe(() => this.nSwiper.slidePrev());
        fromEvent(this.getElement('navigation-button-next'), 'click').subscribe(() => this.nSwiper.slideNext());
    }

    destroy = () => {
        // Destroy functions
    }
}