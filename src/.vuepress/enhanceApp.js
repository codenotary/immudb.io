import Inkline from '@inkline/inkline';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheckCircle,
    faGlobeAmericas,
    faPaperPlane,
    faLink
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './styles/index.scss';

library.add(faCheckCircle);
library.add(faGlobeAmericas);
library.add(faPaperPlane);
library.add(faLink);

export default ({ Vue }) => {
    Vue.use(Inkline);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
}
