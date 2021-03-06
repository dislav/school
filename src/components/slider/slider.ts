import Swiper from 'swiper';
import Component, { ComponentProps } from '../../app/js/component';

export default class Slider extends Component.Default {
    nSwiper: Swiper;

    constructor(element: ComponentProps) {
        super(element);

        this.nSwiper = new Swiper(this.getElement('container'), {
            slidesPerView: 'auto',
            speed: 600,
        });
    }

    destroy = () => {
        // Destroy functions
    }
}