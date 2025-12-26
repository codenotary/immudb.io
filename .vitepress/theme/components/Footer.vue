<template>
  <div class="footer">
    <div class="flex row main-section">
      <div class="flex column brand">
        <img
          class="logo"
          src="/logos/logo_white_codenotary.svg"
          alt="Codenotary"
        >
        <p class="brand-description cn-text-xs">
          Immutable notarization for all your sensitive data. On-premise or in the cloud, easy to use tamperproof storage with cryptographic verification, processing millions of transactions a second.
        </p>
        <div class="social-links">
          <a href="https://github.com/codenotary">
            <font-awesome-icon :icon="['fab', 'github-square']" />
          </a>
          <a href="https://twitter.com/Codenotary">
            <font-awesome-icon :icon="['fab', 'twitter-square']" />
          </a>
          <a href="https://www.facebook.com/Codenotary-Inc-106257094666687">
            <font-awesome-icon :icon="['fab', 'facebook-square']" />
          </a>
          <a href="https://www.linkedin.com/company/codenotary/">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
        </div>
      </div>
      <div class="flex column table" v-for="(table, index) in content.footer.tables" :key="index">
        <p class="table_title cn-font-weight-bold"> {{ table.title }} </p>
        <div v-for="(link, linkIndex) in table.links" :key="linkIndex">
          <a v-if="link.href !== null"  class="table_link" :href="link.href" target="_blank" rel="noopener nofollow noreferrer">
            {{ link.label }}
          </a>
          <a v-else class="table_link" :href="link.internalLink">
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="flex row align-center justify-between copyright">
      <span class="">Copyright © {{ year }} Codenotary, Inc. All rights reserved.</span>
      <div class="row justify-center tos">
        <a href="https://www.codenotary.com/terms-of-service/">
          Terms of Service
        </a>
        <a href="https://www.codenotary.com/privacy-statement">
          Privacy statement
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlobalContent from '../content/global'

const year = ref((new Date()).getFullYear())
const content = GlobalContent
</script>

<style>
.footer {
  border-top: 1px solid var(--border-color);
  color: rgba(255, 255, 255, 0.75);
  z-index: 11;
  background-color: var(--cn-color-dark);
  position: relative;
}

.footer .column {
  justify-content: space-between;
}

@media screen and (max-width: 767px) {
  .footer .column {
    flex-direction: column-reverse;
    align-items: center;
  }

  .footer .column .nav {
    margin-bottom: 1rem;
  }
}

.footer {
  background-color: var(--cn-color-dark) !important;
}

.footer .main-section {
  padding: 40px var(--cn-md-padding);
  flex-wrap: wrap;
  gap: 2rem;
}

.footer .brand {
  flex: 0 0 auto;
  min-width: 340px;
  margin-right: 3rem;
}

.footer .logo {
  height: auto;
  width: 141px;
}

.footer p {
  color: white !important;
}

.footer p.brand-description {
  color: var(--cn-color-primary) !important;
  max-width: 340px;
  font-size: 14px;
  line-height: 17px;
}

.footer a {
  color: #c1c1c1;
}

.footer a:hover,
.footer a:active {
  color: var(--cn-color-primary-light);
}

.footer li {
  margin-bottom: 16px;
}

.footer .social-links {
  display: flex;
  gap: 12px;
  font-size: 30px;
}

.footer .social-links a {
  color: white;
}

.footer .table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 0 0 200px;
  line-height: 19px;
  margin-top: 18px;
}

.footer .table:last-of-type {
  flex: 0 0 auto;
}

.footer .table > * {
  margin: 7px 0 0;
  width: 100%;
}

.footer .table .table_title {
  margin-bottom: 2px;
  font-size: 18px;
  margin-top: 0;
  line-height: 22px;
}

.footer .table .table_link {
  color: var(--cn-color-primary) !important;
  font-size: 14px;
  line-height: 17px;
}

.footer .table .table_link:hover {
  color: var(--cn-color-secondary) !important;
}

@media (max-width: 1600px) {
  .footer .main-section,
  .footer .copyright {
    padding-left: var(--cn-sm-padding) !important;
    padding-right: var(--cn-sm-padding) !important;
  }
}

@media (max-width: 920px) {
  .footer .main-section,
  .footer .copyright {
    padding-left: var(--cn-xs-padding) !important;
    padding-right: var(--cn-xs-padding) !important;
  }

  .footer .brand {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
    justify-content: center;
    align-items: center;
  }

  .footer .brand .brand-description {
    max-width: unset;
  }
}

.copyright {
  height: 100px;
  box-sizing: border-box;
  padding: 1.5rem 140px !important;
  color: #c1c1c1;
  text-align: center;
  font-size: 14px;
  line-height: 17px;
  background-color: var(--cn-color-primary-dark) !important;
}

@media (max-width: 920px) {
  .copyright {
    flex-direction: column !important;
  }
}

.copyright .tos {
  margin-top: 10px;
}

.copyright .tos a {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: bold;
}
</style>
