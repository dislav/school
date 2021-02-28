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
import TeacherSlider from '../../components/teacher-slider/teacher-slider';

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
    new Header(getComponent('header'));
    new Footer(getComponent('footer'));

    if (getComponent('teacher-slider'))
        getComponents('teacher-slider').map((component) => new TeacherSlider(component));

    const images = document.querySelectorAll('img');
    objectFitImages(images);
});
