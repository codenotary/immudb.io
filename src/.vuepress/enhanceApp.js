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
        title: 'Welcome',
        collapsable: false,
        children: [
            `${version}/`,
        ]
    },
    {
        title: 'Learn about immudb',
        collapsable: false,
        children: [
            `${version}/about`,
            `${version}/concepts`,
        ]
    },
    {
        title: 'Get started with immudb',
        collapsable: false,
        children: [
            `${version}/quickstart`,
            `${version}/jumpstart`,
        ]
    },
    {
        title: 'Operations',
        collapsable: false,
        children: [
            `${version}/operations/planning`,
            `${version}/operations/service`,
            `${version}/operations/monitoring`,
        ]
    },
    {
        title: 'Developing',
        collapsable: false,
        children: [
            `${version}/build`,
        ]
    },
    {
        title: 'Reference',
        collapsable: false,
        children: [
            `${version}/configuration`,
            `${version}/sdks-api`,
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
