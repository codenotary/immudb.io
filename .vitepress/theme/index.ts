import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// Import custom styles
import './styles/index.css'
import './styles/vars.css'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faCode,
  faDatabase,
  faRocket,
  faShieldAlt,
  faBolt,
  faCloud,
  faCog,
  faUsers,
  faChartLine,
  faLock,
  faKey,
  faServer,
  faNetworkWired,
  faDownload,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faExclamationTriangle,
  faSearch,
  faBars,
  faTimes,
  faChevronDown,
  faChevronRight,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

// Import custom components
import {
  BlogIndex,
  BlogCard,
  BlogPost,
  ReadingTime,
  Tabs,
  TabPanel,
  Footer,
  PageEdit,
  AlgoliaSearchBox,
  DropdownLink,
  DropdownTransition,
  ResearchPaper,
  DiscordChatWidget,
  Subscribe,
  WrappedSection,
  RedirectToDefaultVersion
} from './components'

// Add icons to library
library.add(
  // Brand icons
  faGithub,
  faTwitter,
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
  faFacebookSquare,
  // Solid icons
  faBook,
  faCode,
  faDatabase,
  faRocket,
  faShieldAlt,
  faBolt,
  faCloud,
  faCog,
  faUsers,
  faChartLine,
  faLock,
  faKey,
  faServer,
  faNetworkWired,
  faDownload,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faExclamationTriangle,
  faSearch,
  faBars,
  faTimes,
  faChevronDown,
  faChevronRight,
  faArrowRight,
  faArrowLeft
)

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Register FontAwesome component
    app.component('font-awesome-icon', FontAwesomeIcon)

    // Register custom components globally
    // Blog components
    app.component('BlogIndex', BlogIndex)
    app.component('BlogCard', BlogCard)
    app.component('BlogPost', BlogPost)
    app.component('ReadingTime', ReadingTime)

    // Tab components
    app.component('Tabs', Tabs)
    app.component('TabPanel', TabPanel)

    // Content components
    app.component('Footer', Footer)
    app.component('PageEdit', PageEdit)
    app.component('AlgoliaSearchBox', AlgoliaSearchBox)
    app.component('DropdownLink', DropdownLink)
    app.component('DropdownTransition', DropdownTransition)

    // Special components
    app.component('ResearchPaper', ResearchPaper)
    app.component('DiscordChatWidget', DiscordChatWidget)
    app.component('Subscribe', Subscribe)
    app.component('WrappedSection', WrappedSection)
    app.component('RedirectToDefaultVersion', RedirectToDefaultVersion)

    // Custom functionality can be added here
    // Example: Global filters, directives, etc.
  }
} satisfies Theme
