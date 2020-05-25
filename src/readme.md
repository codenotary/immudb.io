---
home: true
heroImage: '/mascot.png'
actionText: Get started 
actionLink: /docs/introduction
copyright: Copyright &copy; CodeNotary 2020
---

<section class="section" aria-labelledby="main-title">
    <div class="features">
        <div class="feature">
            <img src="/features/immutable2.svg" alt="Immutable"/>
            <h2>Immutable</h2>
            <p>Any kind of key-value. Clients can choose how to structure data.</p>
            <p><strong>No data mutation APIs</strong> are provided.</p>
            <p>Data is never overwritten, so multiple versions of the same key can co-exist and can be inspected.</p>
        </div>
        <div class="feature">
            <img src="/features/auditable3.svg" alt="Immutable"/>
            <h2>Auditable</h2>
            <p>Tamper-evident history system.</p>
            <p>Clients and auditors ask for <strong>cryptographic proofs</strong>  of data inclusion and historical consistency in real time.</p>
            <p>If tampered, clients and auditors will be able to notice that and take actions.</p>
        </div>
        <div class="feature">
            <img src="/features/secure2.svg" alt="Immutable"/>
            <h2>Secure</h2>
            <p>If needed, clients and auditors can verify data ownership.</p>
            <p>Data can be signed using <strong>Public-Key Cryptography</strong>.</p>
            <p>Keys additions and revocations can be immutably stored into the database</p>
        </div>
    </div>
</section>

<section id="easy-setup-section" class="section _text-center _padding-top-0">
    <h2>Easy setup</h2>
    <p>
        You can either build Docker images based on the Dockerfiles in the GitHub repository
        for the most common architectures or use the prebuild ones on Dockerhub for Linux.
    </p>
<div class="language-bash extra-class">
        
~~~bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
~~~
        
</div>
</section>

<div id="video-section" class="section-wrapper -primary">
    <section class="section">
<div class="section-center">
        
## Why immudb?
immudb has been developed with performance, scalability and versatility in mind. The user feedback has shown that they love the very high throughput and being able to store hashes as well as data. They see it as a great alternative to using a blockchain or ledger service.
        
</div>
        <div class="video-features">
            <div class="video">
                <div class="_embed _embed-16by9">
                    <iframe width="560" height="315" frameborder="0"
                            src="https://www.youtube.com/embed/rQ4iZAM14m0?controls=0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
            </div>
            <ul>
                <li>
                    <font-awesome-icon icon="check-circle" />
                    Easy setup
                </li>
                <li>
                    <font-awesome-icon icon="check-circle" />
                    Fast and reliable immutable database
                </li>
                <li>
                    <font-awesome-icon icon="check-circle" />
                    Secure REST API gateway
                </li>
                <li>
                    <font-awesome-icon icon="check-circle" />
                    Powerful, easy to use admin
                </li>
                <li>
                    <font-awesome-icon icon="check-circle" />
                    Open source
                </li>
            </ul>
        </div>
    </section>
</div>


<div class="section-wrapper">
    <section class="section">
        <div class="columns">
<div class="column">
            
## Made for the real world
Immudb is an indispensable asset when it comes to tamperproof data:

- Store every update to sensitive database fields (credit card or bank account data) of an existing application database
- Store CI/CD recipes in immudb to protect build and deployment pipelines
- Store public certificates in immudb
- Store tamperproof log streams (i. e. audit logs) 

</div>
<div class="column">
<terminal title="immudb">

~~~sql
SELECT * from immudb
~~~

</terminal>
</div>
        </div>
    </section>
    <section class="section" id="usedby">
        <div class="columns">
            <div class="column">
                <img src="/logos/codenotary.png" width="150" alt="Immudb - Written records per ms" />
            </div>
        </div> 
    </section>
</div>


<div class="section-wrapper -gray-10" id="performance">
    <section class="section">
            
<div class="section-center">

## Unmatched performance
Immudb is often compared to Amazon QLDB. We compared the performance using a simple demo application to write data (without using any unfair optimization).

</div>

<div class="columns">
    <div class="column">
        <img src="/benchmark/throughput_read.png" alt="Immudb - Throughput read" />
    </div>
    <div class="column">
        <img src="/benchmark/throughput_write.png" alt="Immudb - Throughput write" />
    </div>
</div>
<div class="columns">
    <div class="column">
        <img src="/benchmark/exectime.png" alt="Immudb - Written records per ms" />
    </div>
    <div class="column">
        <img src="/benchmark/query_bm.png" alt="Immudb - Queried records per ms" />
    </div>
</div>
    </section>
</div>
