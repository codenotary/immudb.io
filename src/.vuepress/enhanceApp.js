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

  /* WELCOME SECTION START */
  const introduction = {
    title: 'Welcome',
    collapsable: false,
    sidebarDepth: 1,
    initialOpenGroupIndex: -1,
    // path: `${version}/`,
    children: [
      `${version}/`
    ]
  };

  /* WELCOME SECTION END */

  /* LEARN SECTION START */
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

  /* LEARN SECTION END */

  /* GETSTARTED SECTION START */
  const getStarted = {
    title: 'Get started',
    collapsable: false,
    children: [
    ]
  };

  switch(version) {
    case '/master':
    case '/1.2.2':
    case '/1.2.1':
    case '/1.1.0':
	  case '/1.0.0':
    {
      getStarted.children.push(`${version}/quickstart`);
      getStarted.children.push(`${version}/getstarted/webconsole`);
      getStarted.children.push(`${version}/jumpstart`);
      break;
    }
    case '/0.9.2':
    case '/0.8.1':
    {
      getStarted.children.push(`${version}/quickstart`);
      getStarted.children.push(`${version}/jumpstart`);
      break;
    }
    default: {
    }
  }

  /* GETSTARTED SECTION END */

  /* OPERATIONS SECTION START */
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

  switch(version) {
    case '/master':
    case '/1.2.2':
    {
      operations.children.push(`${version}/operations/replication`);
      operations.children.push(`${version}/operations/backup`);
    }
    case '/1.2.1':
    case '/1.1.0':
    {
      operations.children.push(`${version}/operations/specs`);
      break;
    }
    default: {
    }
  }


  /* OPERATIONS SECTION END */

  /* DEVELOP SECTION START */
  let develop = {
    title: 'Develop',
    collapsable: false,
    children: [
    ]
  };

  switch (version) {
    case '/master':
    case '/1.2.2':
    case '/1.2.1':
    case '/1.1.0':
	  case '/1.0.0':
    {
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
      break;
    }
    default: {
      develop.children.push(
        `${version}/sdk-api`, // Content needs to be updated
      );
    }
  }

  if (version === '/master' || version === '/1.1.0' || version === '/1.2.1' || version === '/1.2.2') {
    develop.children.push(`${version}/develop/sqlstdlib`);
    develop.children.push(`${version}/develop/auditor`);
  }

  if (version === '/master' || version === '/1.2.1' || version === '/1.2.2') {
      develop.children.push(`${version}/develop/deleting`);
      develop.children.push(`${version}/develop/expiration`);
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

  /* DEVELOP SECTION END */

  sidebar.push(introduction);
  if (['/master', '/1.2.2', '/1.2.1', '/1.1.0', '/1.0.0'].includes(version)) {
    sidebar.push(learn);
  }
  sidebar.push(getStarted);
  if (['/master', '/1.2.2', '/1.2.1', '/1.1.0', '/1.0.0'].includes(version)) {
    sidebar.push(operations);
  }
  if (['/master', '/1.2.2', '/1.2.1', '/1.1.0', '/1.0.0'].includes(version)) {
    sidebar.push(develop);
  }
  if (['/master', '/1.2.2', '/1.2.1', '/1.1.0', '/1.0.0'].includes(version)) {
    sidebar.push(reference);
  }

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
}
