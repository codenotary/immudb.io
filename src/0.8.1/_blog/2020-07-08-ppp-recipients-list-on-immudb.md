---
title: PPP Recipients List on immudb
image: /blog/ppp.jpg
excerpt:
    The tamper-proof full list of PPP recipients on immudb, the immutable database.
date: 2020-07-08
tags:
  - GitHub
  - Go
  - Trending
  - PPP
  - PaymentProtectionProgram
author: Filippo
location: Italy
---

<div>

# The tamper-proof full list of PPP recipients on immudb, the immutable database

The intense public debate about the criteria used by the government to identify eligible companies for the Paycheck Protection Program [PPP](https://www.sba.gov/funding-programs/loans/coronavirus-relief-options/paycheck-protection-program) and whether the allocated $349 billion for small business (< 500 employees) ended up in the most needing hands, on Monday the U.S. Treasury Department released the full list with the names of those companies who benefited from the program and how much they received.

The PPP is part of the government’s Coronavirus Aid, Relief and Economic Security (CARES) Act. Loans are available for up to 2.5 times the average monthly payroll during the year preceding the application, with a maximum loan of $10 million. If employers maintain their payroll and use loan funds for allowed expenses like payroll, rent, and utilities for the first 24 weeks after the loan is issued, the loan amount is forgiven.

The move from the U.S. Government was highly anticipated, which also gave the opportunity to some of the entitled companies to reassess whether the grant was actually necessary or not. As the Governmental agency released the full list, a number of companies took distance from it, claiming that it had not been updated and contained still names of companies, that while entitled at first decided to not get the grant.

Everyone can access the data directly from the U.S. Government’s website here and download the very large comma-separated value file where he can find the company he’s looking for. Here at vChain, we wanted to make your life simpler and put that list into a searchable db based on our lightweight high-speed immutable database immudb. Thanks to immudb you can, in fact, be sure that the data you see has not been tampered with by anyone. Immudb is used by a number of organizations to track changes to sensitive data in their transactional databases, such as bank, debit, or credit card transactions, and then record those changes permanently in a tamperproof way. That makes immudb the perfect platform to store highly scrutinized data, making sure that no one can manipulate it to his own benefit and then leverage the modified output to spread fake news.

The searchable interface is available [here](https://ppp.immudb.io/). In this dashboard, you can easily query the list and see whether a company has been granted the PPP loan.

</div>
<i-card class="link-card">
    <font-awesome-icon class="icon" icon="chevron-right"></font-awesome-icon>
    <a class="_overlay-link" href="https://ppp.immudb.io">
        <strong>U.S. Federal Reserve PPP Searchable Interface</strong>
    </a>
</i-card>

You can download and install immudb from the [immudb GitHub Repository](https://github.com/codenotary/immudb), it’s Open-Source.

For those who are wondering it, vChain Inc., the company behind immudb, did not apply nor received any PPP funding.
