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

const getSidebar = version => {
  let sidebar = []
  const introduction = {
    title: 'Welcome',
    collapsable: false,
    sidebarDepth: 0,
    initialOpenGroupIndex: -1,
    // path: `${version}/`,
    children: [
      `${version}/`
    ]
  };
  const learn = {
    title: 'Learn about immudb',
    collapsable: false,
    sidebarDepth: 1,
    initialOpenGroupIndex: -1,
    children: [
      `${version}/about`,
      `${version}/concepts`,
    ]
  };
  const getStarted = {
    title: 'Get started',
    collapsable: false,
    children: [
      `${version}/quickstart`,
      `${version}/getstarted/webconsole`,
      `${version}/jumpstart`,
    ]
  };
  const operations = {
    title: 'Operations',
    collapsable: false,
    sidebarDepth: 0,
    children: [
      `${version}/operations/planning`,
      `${version}/operations/service`,
      `${version}/operations/monitoring`,
    ]
  };
  let develop = {
    title: 'Develop',
    collapsable: false,
    children: [
    ]
  };

  if (['/master'/*, '/1.0.0'*/].includes(version)) {
    develop.children.push(`${version}/develop/connection`);
    develop.children.push(`${version}/develop/reading`);
    develop.children.push(`${version}/develop/operations`);
    develop.children.push(`${version}/develop/history`);
    develop.children.push(`${version}/develop/streams`);
    develop.children.push(`${version}/develop/management`);
    develop.children.push(`${version}/develop/indexes`);
    develop.children.push(`${version}/develop/transactions`);
    develop.children.push(`${version}/develop/utilities`);
    develop.children.push(`${version}/develop/additional`);
  }
  else {
    develop.children.push(
      `${version}/sdk`,
    );
  }
  develop.children.push(
    `${version}/develop/pg`,
    `${version}/develop/embedding`,
    `${version}/build`,
  );

  const reference = {
    title: 'Reference',
    collapsable: false,
    children: [
      `${version}/reference/configuration`,
      `${version}/reference/sql`,
      `${version}/reference/sdk`,
    ]
  };

  sidebar.push(introduction);
  sidebar.push(learn);
  sidebar.push(getStarted);
  sidebar.push(operations);
  sidebar.push(develop);
  sidebar.push(reference);

  return sidebar;
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
    /* Homepage redirect as route middleware | Not reliable if built
    router.afterEach((to, from) => {
      if (to.path === '/') {
        router.replace({ path: `/${ latestVersion }/` })
      }
    });
    */
}
