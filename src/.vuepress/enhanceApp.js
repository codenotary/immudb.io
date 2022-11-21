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
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
  faFacebookSquare,
  faDiscord,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './styles/index.scss';
import './theme/styles/grid.styl';

import { getVersionFromRoute, versions, getDefaultVersion } from './theme/util'

import getSidebarBeforeV1_3_1 from './sidebar_before_v1_3_1'
import getSidebarV1_3_1 from './sidebar_v1_3_1'
import getSidebarV1_3_2 from './sidebar_v1_3_2'
import getSidebarV1_4_0 from './sidebar_v1_4_0'
import getSidebarV1_4_1 from './sidebar_v1_4_1'
import getSidebarMaster from './sidebar_master'

const getSidebar = version => {
  const maxVersion = maxVer => versions.indexOf(maxVer) >= versions.indexOf(version.slice(1))

  if (maxVersion('1.3.0')) {
    return getSidebarBeforeV1_3_1(version);
  }

  if (version == '/1.3.1') {
    return getSidebarV1_3_1(version);
  }

  if (version == '/1.3.2') {
    return getSidebarV1_3_2(version);
  }

  if (version == '/1.4.0') {
    return getSidebarV1_4_0(version);
  }

  if (version == '/1.4.1') {
    return getSidebarV1_4_1(version);
  }

  return getSidebarMaster(version);
}

library.add(faCheckCircle);
library.add(faTimesCircle);
library.add(faGlobeAmericas);
library.add(faPaperPlane);
library.add(faLink);
library.add(faBolt);
library.add(faSearch);
library.add(faChevronRight);
library.add(faLinkedin);
library.add(faGithubSquare);
library.add(faTwitterSquare);
library.add(faFacebookSquare);
library.add(faDiscord);
library.add(faTwitter);

export default ({ Vue, router, siteData, }) => {
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
}
