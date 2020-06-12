import Inkline from '@inkline/inkline';
import Carousel from 'vue-owl-carousel'
import VueFilterDateFormat from 'vue-filter-date-format';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheckCircle,
    faGlobeAmericas,
    faPaperPlane,
    faLink,
    faBolt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './styles/index.scss';

library.add(faCheckCircle);
library.add(faGlobeAmericas);
library.add(faPaperPlane);
library.add(faLink);
library.add(faBolt);

export default ({ Vue }) => {
    Vue.use(Inkline);
    Vue.use(VueFilterDateFormat);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.component('owl-carousel', Carousel);
}
