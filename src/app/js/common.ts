import { fromEvent } from 'rxjs';
import objectFitImages from 'object-fit-images';
import { getComponent, getComponents } from './component';

import '../scss/common.scss';

// SVG
const requireAll = (r: __WebpackModuleApi.RequireContext) => r.keys().forEach(r);
requireAll(require.context('../../assets/icons', true, /\.svg$/));

// Components
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Slider from '../../components/slider/slider';
import Collapse from '../../components/collapse/collapse';
import Modal from '../../components/modal/modal';

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
    new Header(getComponent('header'));
    new Footer(getComponent('footer'));

    if (getComponent('slider'))
        getComponents('slider').forEach((component) => new Slider(component));

    if (getComponent('collapse'))
        getComponents('collapse').forEach((component) => new Collapse(component));

    if (getComponent('modal'))
        getComponents('modal').forEach((component) => new Modal(component));

    const images = document.querySelectorAll('img');
    objectFitImages(images);
});
