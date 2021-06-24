<template>
  <CnButton variant="social" v-bind="$attrs" inline>
    <font-awesome-icon :icon="socialButtonInfo.iconInfo" class="social-button-icon" :color="socialButtonInfo.iconColor"/>
    <div>
      {{ socialButtonInfo.buttonText }}
    </div>
    <div class="count" v-if="count !== null">
      {{ socialButtonInfo.countText }}
    </div>
  </CnButton>
</template>

<script>
import axios from 'axios';

export default {
  name: "CnSocialButton",
  data() {
    return {
      count: null,
    };
  },
  props: {
    social: {
      type: String,
      required: true,
    },
  },
  computed: {
    socialButtonInfo() {
      switch (this.social) {
        case 'discord':
          return {
            iconInfo: ['fab', 'discord'],
            iconColor: '#7289DA',
            buttonText: 'Chat',
            countText: `${this.count} members`,
          };
        case 'twitter':
          return {
            iconInfo: ['fab', 'twitter'],
            iconColor: '#00ACEE',
            buttonText: 'Tweet about immudb',
          };
      }
    }
  },
  async mounted() {
    if (this.social === 'discord') {
     const response = await axios.get('https://discord.com/api/v9/invites/ThSJxNEHhZ?with_counts=true', {
       headers: {
         common: {
           'content-type': 'application/json; charset=utf-8',
         },
       },
     });

     this.count = response.data.approximate_member_count;
    }
  }
}
</script>

<style scoped lang="scss">
.social-button-icon {
  height: 20px;
  width: auto;
}
</style>
