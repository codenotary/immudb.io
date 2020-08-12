<template>
    <i-modal class="subscribe-modal" size="lg" :value="value" @input="onVisibilityChange">
        <template slot="header">
            Download Research Paper
        </template>
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
                <i-button type="submit" variant="primary" :disabled="!verified" block>Send me the document</i-button>
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

            const email = this.form.contactEmail.value;
            const data = {
                email
            };

            await axios.post(`${API_URL}/research-paper`, data, {
                withCredentials: true
            });

            this.$emit('input', false);
        },
        async onVerify(response) {
            if (response) {
                this.verified = true;
            }
        }
    }
};
</script>
