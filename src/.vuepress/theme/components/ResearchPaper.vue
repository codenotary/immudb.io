<template>
    <i-modal class="subscribe-modal" size="lg" :value="value" @input="onVisibilityChange">
        <template slot="header">
            Download Research Paper
        </template>

        <i-alert variant="success" class="_margin-bottom-1" v-if="sent">
            <template slot="icon"><font-awesome-icon icon="check-circle"></font-awesome-icon></template>
            <p>Email sent successfully!</p>
        </i-alert>

        <i-alert variant="danger" class="_margin-bottom-1" v-if="error">
            <template slot="icon"><font-awesome-icon icon="times-circle"></font-awesome-icon></template>
            <p>Something went wrong. Please try again later!</p>
        </i-alert>

        <p class="_margin-top-0">
            We'll send you the research paper via email.
        </p>

        <i-form v-model="form" @submit.prevent="onSubmit">
            <i-form-group>
                <i-input :schema="form.contactEmail" placeholder="Enter your email" />
            </i-form-group>
            <i-form-group>
                <vue-recaptcha ref="recaptcha" :loadRecaptchaScript="true" :sitekey="sitekey" @verify="onVerify" />
            </i-form-group>
            <i-form-group>
                <i-button type="submit" variant="primary" :disabled="!verified || sending" block>
                    {{ sending ? 'Sending..' : 'Send me the document' }}
                </i-button>
            </i-form-group>
        </i-form>
    </i-modal>
</template>

<style lang="scss">
.subscribe-modal {
    .close {
        .icon {
            display: none;
        }

        &::before {
            font-family: Helvetica, monospace;
            content: "x";
            font-size: 12px;
            display: inline-block;
        }
    }
}
</style>

<script>
import { API_URL, API_CONFIG } from '../util/api';
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';

export default {
    components: {
        VueRecaptcha
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            verified: false,
            sending: false,
            error: false,
            sent: false,
            sitekey: '6LeHGL4ZAAAAALlN7PGMzqnNBM6GVwhlJ-ZeiCV8',
            form: this.$inkline.form({
                contactEmail: {
                    validators: [
                        { rule: 'required' },
                        { rule: 'email' }
                    ]
                }
            })
        }
    },
    methods: {
        onVisibilityChange(value) {
            this.$emit('input', value);
        },
        async onSubmit() {
            if (!this.verified) {
                return;
            }

            this.sending = true;

            const email = this.form.contactEmail.value;
            const data = {
                email
            };

            try {
                await axios.post(`${API_URL}/research-paper`, data, {
                    withCredentials: true
                });

                this.sent = true;
            } catch (error) {
                this.error = true;
            } finally {
                this.sending = false;
                this.verified = false;

                setTimeout(() => {
                    this.sent = false;
                    this.error = false;
                    this.$emit('input', false);
                }, 3000);
            }
        },
        async onVerify(response) {
            if (response) {
                this.verified = true;
            }
        }
    }
};
</script>
