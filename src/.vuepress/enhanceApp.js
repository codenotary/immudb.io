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

import { getVersionFromRoute, versions, getDefaultVersion } from './theme/util'

const getSidebar = version => [
    {
        title: "Get started",
        collapsable: false,
        children: [
            `${version}/quickstart`,
            `${version}/jumpstart`,
        ]
    },
    {
        title: 'About',
        collapsable: false,
        children: [
            `${version}/`,
            `${version}/how-it-works`,
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

    const latestVersion = getDefaultVersion()
    router.beforeEach((to, from, next) => {
        const newVersion = getVersionFromRoute(to)
        const oldVersion = getVersionFromRoute(from)

        if (newVersion !== oldVersion && newVersion) {
            siteData.themeConfig.sidebar = getSidebar(`/${newVersion}`)
        }
        else if (!newVersion) {
          siteData.themeConfig.sidebar = getSidebar(`/${latestVersion}`)
        }

        next()
    })
    /* Homepage redirect as route middleware | Not reliable if built
    router.afterEach((to, from) => {
      if (to.path === '/') {
        router.replace({ path: `/${ latestVersion }/` })
      }
    });
    */
}
