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
    collapsable: true,
    children: [
    ]
  };

  const minVersion = minVer => versions.indexOf(minVer) <= versions.indexOf(version.slice(1))
  const maxVersion = maxVer => versions.indexOf(maxVer) >= versions.indexOf(version.slice(1))

  if (minVersion('1.0.0') && maxVersion('1.2.4')) {
    getStarted.children.push(`${version}/quickstart`);
    getStarted.children.push(`${version}/getstarted/webconsole`);
    getStarted.children.push(`${version}/jumpstart`);
  } else if (minVersion('1.3.0')) {
      getStarted.children.push(`${version}/getstarted/quickstart`);
      getStarted.children.push(`${version}/getstarted/build`);
      getStarted.children.push(`${version}/getstarted/clitools`);
      getStarted.children.push(`${version}/getstarted/webconsole`);
      getStarted.children.push(`${version}/getstarted/jumpstart`);
  } else {
    getStarted.children.push(`${version}/quickstart`);
    getStarted.children.push(`${version}/jumpstart`);
  }

  /* GETSTARTED SECTION END */

  /* OPERATIONS SECTION START */
  const operations = {
    title: 'Operations',
    collapsable: true,
    sidebarDepth: 0,
    children: [
      `${version}/operations/planning`,
      `${version}/operations/service`,
      `${version}/operations/monitoring`,
    ]
  };
  if (minVersion('1.1.0') && maxVersion('1.2.4')) {
    operations.children.push(`${version}/develop/auditor`);
  }
  if (minVersion('1.3.0')) {
    operations.children.push(`${version}/operations/auditor`);
  }
  if (minVersion('1.2.2')) {
    operations.children.push(`${version}/operations/replication`);
    operations.children.push(`${version}/operations/backup`);
  }
  if (minVersion('1.2.3')) {
    operations.children.push(`${version}/operations/backwards-compatibility`);
  }
  if (minVersion('1.1.0')) {
    operations.children.push(`${version}/operations/specs`);
  }

  /* OPERATIONS SECTION END */

  /* DEVELOP INTRODUCTION SECTION START */
  let developIntroduction = {
      title: 'Develop',
      collapsable: true,
      children: [
      ]
  };

  if (minVersion('1.3.0')) {
    developIntroduction.children.push(`${version}/develop/connection`);
    developIntroduction.children.push(`${version}/develop/operations`);
    developIntroduction.children.push(`${version}/develop/management`);
    developIntroduction.children.push(`${version}/develop/immugw`);
    developIntroduction.children.push(`${version}/develop/apis`);
  }
  /* DEVELOP INTRODUCTION SECTION END */

  /* DEVELOP KV SECTION START */
  let developKV = {
      title: 'Develop with Key Value',
      collapsable: true,
      children: [
      ]
  };

  if (minVersion('1.3.0')) {
    developKV.children.push(`${version}/develop/reading`);
    developKV.children.push(`${version}/develop/history`);
    developKV.children.push(`${version}/develop/indexes`);
    developKV.children.push(`${version}/develop/transactions`);
    developKV.children.push(`${version}/develop/deleting`);
    developKV.children.push(`${version}/develop/expiration`);
    developKV.children.push(`${version}/develop/embedding`);
  }
  /* DEVELOP KV SECTION END */

  /* DEVELOP SQL SECTION START */
  let developSQL = {
      title: 'Develop with SQL',
      collapsable: true,
      children: [
      ]
  };

  if (minVersion('1.3.0')) {
    developSQL.children.push(`${version}/develop/sql/transactions`);
    developSQL.children.push(`${version}/develop/sql/datatypes`);
    developSQL.children.push(`${version}/develop/sql/tablescreate`);
    developSQL.children.push(`${version}/develop/sql/tablesalter`);
    developSQL.children.push(`${version}/develop/sql/insertupdate`);
    developSQL.children.push(`${version}/develop/sql/indexes`);
    developSQL.children.push(`${version}/develop/sql/querying`);
    developSQL.children.push(`${version}/develop/sql/catalog`);
    developSQL.children.push(`${version}/develop/sql/sqlstdlib`);
    developSQL.children.push(`${version}/develop/sql/pg`);
    developSQL.children.push(`${version}/develop/sql/embeddingSQL`);
  }
  /* DEVELOP SQL SECTION END */

  /* RELEASE NOTES SECTION START */
  let releaseNotes = {
    title: 'Release Notes',
    collapsable: true,
    children: [
    ]
  };

  if (minVersion('1.3.0')) {
    releaseNotes.children.push(`${version}/releasenotes`);
  }

  /* RELEASE NOTES SECTION END */

  /* DEVELOP SECTION START */
  let develop = {
    title: 'Develop',
    collapsable: false,
    children: [
    ]
  };

  if (maxVersion('1.2.4')) {
    if (minVersion('1.0.0') ) {
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
    } else {
        develop.children.push(
        `${version}/sdk-api`, // Content needs to be updated
        );
    }

    if (minVersion('1.1.0')) {
        develop.children.push(`${version}/develop/sqlstdlib`);
        develop.children.push(`${version}/develop/auditor`);
    }

    if (minVersion('1.2.1')) {
        develop.children.push(`${version}/develop/deleting`);
        develop.children.push(`${version}/develop/expiration`);
    }

    develop.children.push(
        `${version}/develop/pg`,
        `${version}/develop/embedding`,
        `${version}/build`,

    );
  }

  /* DEVELOP SECTION END */

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
  if (minVersion('1.0.0')) {
    sidebar.push(learn);
  }
  sidebar.push(getStarted);
  if (minVersion('1.0.0')) {
    sidebar.push(operations);
  }
  if (minVersion('1.3.0')) {
    sidebar.push(developIntroduction);
  }
  if (minVersion('1.3.0')) {
    sidebar.push(developKV);
  }
  if (minVersion('1.3.0')) {
    sidebar.push(developSQL);
  }
  if (minVersion('1.3.0')) {
      sidebar.push(releaseNotes);
  }
  if (minVersion('1.0.0') && maxVersion('1.2.4')) {
    sidebar.push(develop);
  }
  if (minVersion('1.0.0') && maxVersion('1.2.4')) {
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
