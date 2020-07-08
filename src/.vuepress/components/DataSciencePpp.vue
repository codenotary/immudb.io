<template>
    <div>
        <i-header class="_padding-bottom-1 _padding-top-0 _background-white">
            <h1 class="_font-weight-bold _margin-top-0 _padding-top-0">Paycheck Protection Program database search</h1>
            <p>
                The SBA (U.S. Small Business Administration) is an agency that works with lenders to provide loans to small businesses.
                This application analyzes data from the SBA database dump July 6th 2020, secured and tamper-proof using immudb.
                <a href="https://immudb.io">What is immudb?</a>
            </p>

            <a target="_blank" href="https://www.sba.gov/funding-programs/loans/coronavirus-relief-options/paycheck-protection-program">
                <strong>Get more information about the PPP program</strong>
            </a>

            <i-form v-model="form" @submit="search" class="_margin-top-2">
                <i-form-group>
                    <i-input :schema="form.query" :disabled="searching" placeholder="Search for a company.." class="search">
                        <template slot="suffix">
                            <i-button variant="default" type="submit" :loading="searching">
                                <font-awesome-icon icon="search" />
                                <template slot="loading">
                                    <img src="/loader.gif" alt="">
                                    Searching...
                                </template>
                            </i-button>
                        </template>
                    </i-input>
                </i-form-group>
            </i-form>
        </i-header>

        <i-container v-if="searched && results.length > 0">
            <i-row>
                <i-column>
                    <p class="_margin-top-0">
                        {{ results.length }} matching results found for "{{searched}}"
                    </p>
                </i-column>
            </i-row>
        </i-container>

        <i-container fluid>
            <i-row>
                <i-column>
                    <div class="table-responsive" v-if="searched">
                        <div class="table _margin-bottom-0">
                            <div class="tr">
                                <div class="th">Verified</div>
                                <div class="th">Business Name</div>
                                <div class="th">State</div>
                                <div class="th">City</div>
                                <div class="th">Loan Range</div>
                                <div class="th">Lender</div>
                                <div class="th">Race Ethnicity</div>
                                <div class="th">Gender</div>
                                <div class="th">Veteran</div>
                                <div class="th">NonProfit</div>
                                <div class="th">Jobs Retained</div>
                                <div class="th">Date Approved</div>
                                <div class="th">Business Type</div>
                                <div class="th">Zip</div>
                                <div class="th">Address</div>
                            </div>
                            <div class="tr" v-for="(result, index) in results">
                                <div class="td _text-success _text-center" v-if="result.verified">
                                    <i-tooltip placement="right">
                                        <font-awesome-icon icon="check-circle"></font-awesome-icon>
                                        <template slot="body">
                                            Authenticated and verified with immudb
                                        </template>
                                    </i-tooltip>
                                </div>
                                <div class="td _text-danger _text-center" v-else><i class="fa fa-close-circle"></i></div>
                                <div class="td">{{ result.value.BusinessName }}</div>
                                <div class="td">{{ result.value.State }}</div>
                                <div class="td">{{ result.value.City }}</div>
                                <div class="td">{{ result.value.LoanRange }}</div>
                                <div class="td">{{ result.value.Lender }}</div>
                                <div class="td">{{ result.value.RaceEthnicity }}</div>
                                <div class="td">{{ result.value.Gender }}</div>
                                <div class="td">{{ result.value.Veteran }}</div>
                                <div class="td">{{ result.value.NonProfit }}</div>
                                <div class="td">{{ result.value.JobsRetained }}</div>
                                <div class="td">{{ result.value.DateApproved }}</div>
                                <div class="td">{{ result.value.BusinessType }}</div>
                                <div class="td">{{ result.value.Zip }}</div>
                                <div class="td">{{ result.value.Address }}</div>
                            </div>
                        </div>
                        <div class="no-results" v-if="results.length === 0">
                            There are no results for "{{searched}}".
                        </div>
                    </div>
                </i-column>
            </i-row>
        </i-container>

        <hr class="_margin-y-2">

        <i-container>
            <i-row>
                <i-column>
                    <h3 class="_margin-top-0 _padding-top-0">Overview and charts</h3>
                    <p>Metabase is the easy, open source way for everyone in the company to ask questions and learn from data.</p>
                </i-column>
            </i-row>
            <i-row>
                <i-column>
                    <i-card class="link-card">
                        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                        <strong>PPP Loans Over $150,000</strong><br/>
                        <a class="_overlay-link" href="https://metabase.immudb.io/public/dashboard/930be307-0de5-422e-82a4-f2fbea8130c3">
                            overview and charts
                        </a>
                    </i-card>
                </i-column>
                <i-column>
                    <i-card class="link-card">
                        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                        <strong>PPP Loans Below $150,000</strong><br/>
                        <a class="_overlay-link" href="https://metabase.immudb.io/public/dashboard/ed1555e8-b68e-4b4a-991a-9f15ec1958da">
                            overview and charts
                        </a>
                    </i-card>
                </i-column>
            </i-row>
        </i-container>
    </div>
</template>

<style lang="scss">
.table-responsive {
    max-width: 100%;
    overflow: auto;
    border: 1px solid #e9ecef;
}

.table {
    display: table;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
    font-size: 14px;
}

.tr {
    display: table-row;
}

.th, .td {
    display: table-cell;
    padding: 1rem;
    border: 1px solid #e9ecef;
    white-space: nowrap;
}

.no-results {
    display: block;
    text-align: center;
    padding: 1rem;
}

.navbar {
    position: fixed !important;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    background: white !important;
    border-bottom: 1px solid #e9ecef;
    height: 3.6rem;
    padding: .7rem 1.5rem !important;
}

.navbar .container {
    padding: 0 !important;
}

.navbar .brand {
    padding: 0 !important;
}

.navbar .logo {
    height: 2.2rem;
    width: auto;
}

.navbar .nav {
    margin-top: 2px;
}

.navbar .item {
    font-size: 0.9rem;
    line-height: 1.4rem;
    padding: 0 !important;
    margin: 0 0.75rem -2px;
    border-bottom: 2px solid transparent;
    color: rgb(44, 62, 80) !important;
}

.navbar .item:hover {
    border-bottom-color: #3e649f;
}

.navbar .item:last-child {
    margin-right: 0 !important;
}

.navbar .item svg {
    color: #aaa;
    float: right;
    margin-top: 4px;
    margin-left: 4px;
}

._background-primary {
    background-color: #37598d !important;
}

a {
    color: #37598d;
}

a:hover {
    color: #2f4672;
}

.link-card .inkline-icon {
    position: absolute;
    right: 2rem;
    top: 50%;
    margin-top: -8px;
    transition: right 0.3s ease;
}

.link-card:hover .inkline-icon {
    right: 1rem;
}

.search .button {
    background-color: #37598d !important;
    color: white !important;
    margin-right: -10px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    height: 34px;
}

.search .button img {
    height: 34px;
}

.search .button .loader > .loader-item {
    background-color: white !important;
}

.footer {
    margin-top: 2rem;
    padding: 2rem 0;
    border-top: 1px solid #e9ecef;
    color: gray;
}

.footer .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            searching: false,
            searched: false,
            form: this.$inkline.form({
                query: {
                    validators: [
                        { rule: 'required' }
                    ]
                }
            }),
            results: []
        };
    },
    watch:{
        $route(to){
            if (to.query.query) {
                this.form.query.value = to.query.query;
                this.search();
            } else {
                this.searched = false;
            }
        }
    },
    methods: {
        search: function() {
            if (this.searched === this.form.query.value) {
                return;
            }

            this.searching = true;

            axios.get('https://ppp.immudb.io/search', {
                params: {
                    query: this.form.query.value
                }
            }).then((response) => {
                if (response.data.success) {
                    this.results = response.data.items;
                }
            }).finally(() => {
                this.searching = false;
                this.searched = this.form.query.value;

                if (this.$route.query.query !== this.searched) {
                    this.$router.push({
                        path: this.$route.path,
                        query: { query: this.searched }
                    });
                }

                this.$nextTick(() => {
                    this.$set(this.form.query, 'value', '');
                });
            });
        }
    },
    mounted() {
        if (this.$route.query.query) {
            this.form.query.value = this.$route.query.query;
            this.search();
        }
    }
}
</script>
