<!-- This is a temporary file for conversion - will replace original -->
<template>
  <main id="homepage">
    <research-paper v-model="researchPaperModalVisible" />
    <header class="hero">
      <div class="hero-content">
        <img
          v-if="frontmatter.heroImage"
          :src="withBase(frontmatter.heroImage)"
          :alt="frontmatter.heroAlt || 'hero'"
        >

        <h1 v-if="frontmatter.heroText !== null" id="main-title">
          {{ frontmatter.heroText || site.title || 'Hello' }}
        </h1>

        <p v-if="frontmatter.tagline !== null" class="description">
          {{ frontmatter.tagline || site.description || 'Welcome to your VitePress site' }}
        </p>

        <p v-if="frontmatter.actionText && frontmatter.actionLink" class="action">
          <i-button size="lg" variant="primary" :to="frontmatter.actionLink">
            {{ frontmatter.actionText }}
          </i-button>
        </p>

        <p class="_margin-top-3">
          <i-button
            id="research-paper-button"
            link
            variant="primary"
            @click="researchPaperModalVisible = true"
          >
            <i-badge size="sm" variant="success" class="_margin-right-1-2">New</i-badge>
            <span>Download Research Paper</span>
          </i-button>
        </p>

        <div id="github-button">
          <github-button
            href="https://github.com/codenotary/immudb"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star codenotary/immudb on GitHub"
          >
            Star
          </github-button>
        </div>
      </div>
    </header>

    <Content />

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import Footer from '../Footer.vue'
import ResearchPaper from '../ResearchPaper.vue'
import GithubButton from 'vue-github-button'

// VitePress composables
const { frontmatter, site } = useData()
const router = useRouter()

// State
const researchPaperModalVisible = ref(false)

// Lifecycle
onMounted(() => {
  const query = new URLSearchParams(window.location.search)
  if (query.has('research-paper')) {
    researchPaperModalVisible.value = true
  }
})
</script>

<style>
.home {
  padding: var(--navbar-height) 2rem 0;
  max-width: var(--home-page-width);
  margin: 0px auto;
  display: block;
}

.home .hero {
  text-align: center;
}

.home .hero img {
  max-width: 100%;
  max-height: 280px;
  display: block;
  margin: 3rem auto 1.5rem;
}

.home .hero h1 {
  font-size: 3rem;
}

.home .hero h1,
.home .hero .description,
.home .hero .action {
  margin: 1.8rem auto;
}

.home .hero .description {
  max-width: 35rem;
  font-size: 1.6rem;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.6);
}

.home .hero .action-button {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: var(--accent-color);
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid color-mix(in srgb, var(--accent-color) 90%, black);
}

.home .hero .action-button:hover {
  background-color: color-mix(in srgb, var(--accent-color) 110%, white);
}

.home .features {
  border-top: 1px solid var(--border-color);
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.home .feature {
  flex-grow: 1;
  flex-basis: 30%;
  max-width: 30%;
}

.home .feature h2 {
  font-size: 1.4rem;
  font-weight: 500;
  border-bottom: none;
  padding-bottom: 0;
  color: rgba(255, 255, 255, 0.9);
}

.home .feature p {
  color: rgba(255, 255, 255, 0.75);
}

.home .footer {
  padding: 2.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
}

#github-button {
  height: 28px;
}

@media (max-width: 920px) {
  .home .features {
    flex-direction: column;
  }

  .home .feature {
    max-width: 100%;
    padding: 0 2.5rem;
  }
}

@media (max-width: 419px) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .home .hero img {
    max-height: 210px;
    margin: 2rem auto 1.2rem;
  }

  .home .hero h1 {
    font-size: 2rem;
  }

  .home .hero h1,
  .home .hero .description,
  .home .hero .action {
    margin: 1.2rem auto;
  }

  .home .hero .description {
    font-size: 1.2rem;
  }

  .home .hero .action-button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .home .feature h2 {
    font-size: 1.25rem;
  }
}

#research-paper-button:hover,
#research-paper-button:focus {
  text-decoration: none !important;
}

#research-paper-button:hover span,
#research-paper-button:focus span {
  text-decoration: underline !important;
}
</style>
