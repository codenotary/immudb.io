<template>
    <i-modal class="subscribe-modal" size="lg" :value="value" @input="onVisibilityChange">
        <template slot="header">
            Sign up for beta of Cloud Ledger DB
        </template>
        <p class="_text-muted _margin-top-0">
            Be the first to know when our Cloud Ledger DB service is released and get exclusive subscriber content.
        </p>
        <i-form v-model="form" @submit="onSubmit">
            <i-form-group>
                <i-input :schema="form.contactName" placeholder="Enter your name" />
            </i-form-group>
            <i-form-group>
                <i-input :schema="form.contactEmail" placeholder="Enter your email" />
            </i-form-group>
            <i-form-group>
                <i-button type="submit" variant="primary" block>Subscribe</i-button>
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

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: this.$inkline.form({
                contactName: {
                    validators: [
                        { rule: 'required' }
                    ]
                },
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
            const email = this.form.contactEmail.value;
            const names = this.form.contactName.value.split(' ');
            const firstName = names[0];
            const lastName = names[1];

            const data = {
                contact: {
                    email,
                    firstName,
                    lastName
                }
            };

            await axios.post(`${API_URL}/subscribe`, data);

            this.$emit('input', false);
        }
    }
};
</script>
