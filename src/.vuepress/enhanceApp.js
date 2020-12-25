import Inkline from '@inkline/inkline';
import VueFilterDateFormat from 'vue-filter-date-format';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheckCircle,
    faGlobeAmericas,
    faPaperPlane,
    faLink,
    faBolt,
    faSearch,
    faChevronRight,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './styles/index.scss';

import { getVersionFromRoute, versions } from './theme/util'

const getSidebar = version => [
    {
        title: 'Get started',
        collapsable: false,
        children: [
            `${version}/`,
            `${version}/how-it-works`,
            `${version}/quickstart`,
            `${version}/jumpstart`,
            `${version}/sdks-api`,
            `${version}/apis-references`,
            `${version}/command-reference`,
        ]
    },
    {
        title: 'immudb',
        collapsable: false,
        children: [
            `${version}/immudb/`,
        ]
    },
    {
        title: 'immugw',
        collapsable: false,
        children: [
            `${version}/immugw/`,
            `${version}/immugw/curl`
        ]
    },
    {
        title: 'immuadmin',
        collapsable: false,
        children: [
            `${version}/immuadmin/`,
        ]
    },
    {
        title: 'immuclient',
        collapsable: false,
        children: [
            `${version}/immuclient/`,
        ]
    },
]

library.add(faCheckCircle);
library.add(faTimesCircle);
library.add(faGlobeAmericas);
library.add(faPaperPlane);
library.add(faLink);
library.add(faBolt);
library.add(faSearch);
library.add(faChevronRight);

export default ({ Vue, router, siteData, }) => {
    Vue.use(Inkline);
    Vue.use(VueFilterDateFormat);
    Vue.component('font-awesome-icon', FontAwesomeIcon);

    const latestVersion = versions[versions.length - 1]
    router.addRoutes([{path: '/', redirect: `/${latestVersion}/`}])
    router.beforeEach((to, from, next) => {
        const newVersion = getVersionFromRoute(to)
        const oldVersion = getVersionFromRoute(from)

        if (newVersion !== oldVersion) {
            siteData.themeConfig.sidebar = getSidebar(`/${newVersion}`)
        }
        next()
    })
}
