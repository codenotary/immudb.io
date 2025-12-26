<template>
  <CnButton variant="social" v-bind="$attrs" inline>
    <font-awesome-icon
      :icon="socialButtonInfo.iconInfo"
      class="social-button-icon"
      :color="socialButtonInfo.iconColor"
    />
    <div>
      {{ socialButtonInfo.buttonText }}
    </div>
    <div class="count" v-if="count !== null">
      {{ socialButtonInfo.countText }}
    </div>
  </CnButton>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Props {
  social: 'discord' | 'twitter'
}

interface SocialButtonInfo {
  iconInfo: [string, string]
  iconColor: string
  buttonText: string
  countText?: string
}

const props = defineProps<Props>()

const count = ref<number | null>(null)

const socialButtonInfo = computed((): SocialButtonInfo => {
  switch (props.social) {
    case 'discord':
      return {
        iconInfo: ['fab', 'discord'],
        iconColor: '#7289DA',
        buttonText: 'Chat',
        countText: `${count.value} members`,
      }
    case 'twitter':
      return {
        iconInfo: ['fab', 'twitter'],
        iconColor: '#00ACEE',
        buttonText: 'Tweet about immudb',
      }
    default:
      return {
        iconInfo: ['fab', 'discord'],
        iconColor: '#7289DA',
        buttonText: 'Chat',
      }
  }
})

onMounted(async () => {
  if (props.social === 'discord') {
    try {
      const response = await axios.get('https://discord.com/api/v9/invites/ThSJxNEHhZ?with_counts=true', {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      })

      count.value = response.data.approximate_member_count
    } catch (error) {
      console.error('Failed to fetch Discord member count:', error)
    }
  }
})
</script>

<style scoped lang="scss">
.social-button-icon {
  height: 20px;
  width: auto;
}
</style>
