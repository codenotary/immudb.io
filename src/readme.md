---
home: true
heroImage: '/mascot.png'
actionText: Get started 
actionLink: /docs/introduction
copyright: Copyright &copy; vChain 2020
---

<section class="section" aria-labelledby="main-title">
    <div class="features">
        <div class="feature">
            <img :src="$withBase('/features/immutable2.svg')" alt="Immutable"/>
            <h2>Immutable</h2>
            <p>Any kind of key-value. Clients can choose how to structure data.</p>
            <p><strong>No data mutation APIs</strong> are provided.</p>
            <p>Data is never overwritten, so multiple versions of the same key co-exist and are verfiable.</p>
        </div>
        <div class="feature">
            <img :src="$withBase('/features/auditable3.svg')" alt="Auditable"/>
            <h2>Auditable</h2>
            <p>Tamper-evident history system.</p>
            <p>Clients and auditors want <strong>cryptographic proof</strong>  of data inclusion and historical consistency in real time.</p>
            <p>If tampered, clients and auditors will notice that and take actions.</p>
        </div>
        <div class="feature">
            <img :src="$withBase('/features/secure2.svg')" alt="Secure"/>
            <h2>Secure</h2>
            <p>Data ownership is verifiable by clients and auditors.</p>
            <p>Sign your data using <strong>Public-Key Cryptography</strong>.</p>
            <p>Keys additions and revocations is immutably stored into the database</p>
        </div>
    </div>
</section>

<section id="easy-setup-section" class="section _text-center _padding-top-0">
    <h2>Easy setup</h2>
    <p>
        Build Docker images based on the Dockerfiles in the GitHub repository
        for the most common architectures or use the prebuild ones on Dockerhub for Linux.
    </p>
        
~~~bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
~~~
        
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

<!-- TERMINAL SECTIONS START -->
<div class="section-wrapper" id="code-examples">
<!-- TERMINAL SECTION 1 -->
<section class="section">
<div class="columns">
<div class="column _padding-right-2">
<font-awesome-icon icon="globe-americas"></font-awesome-icon>

## Made for the real world
Immudb is an indispensable asset when it comes to tamper-proof data:
- Store every update to sensitive database fields (credit card or bank account data) of an existing application database
- Store CI/CD recipes to build and deployment pipelines
- Store public certificates
- Store tamper-proof log streams (i. e. audit logs) 

</div>
<div class="column terminal-column">
<terminal title="immudb">

~~~go
// Write value
key1, value1 := []byte("client"), []byte("Visa 1514284849020756 09/21")
index, err := client.Set(ctx, key1, value1)
if err != nil {
    exit(err)
}
~~~

</terminal>
</div>
</div>
</section>
<!-- TERMINAL SECTION 2 -->
<section class="section">
<div class="columns">
<div class="column terminal-column">
<terminal title="immudb">

~~~go
// Write value
key1, value1 := []byte("client"), []byte("Visa 1514284849020756 09/21")
index, err := client.Set(ctx, key1, value1)
if err != nil {
    exit(err)
}
~~~

</terminal>
</div>
<div class="column _padding-left-2">
<font-awesome-icon icon="paper-plane"></font-awesome-icon>
   
## Intuitive setup 
Lorem ipsum dolor sit amet:
- Aeneur cetir met
- Savem lorem livem

</div>
</div>
</section>
<!-- TERMINAL SECTION 3 -->
<section class="section">
<div class="columns">
<div class="column _padding-right-2">
<font-awesome-icon icon="link"></font-awesome-icon>
     
## Consistency check
Lorem ipsum dolor sit amet:
- Aeneur cetir met
- Savem lorem livem

</div>
<div class="column terminal-column">
<terminal title="immudb">

~~~go
// Write value
key1, value1 := []byte("client"), []byte("Visa 1514284849020756 09/21")
index, err := client.Set(ctx, key1, value1)
if err != nil {
    exit(err)
}
~~~

</terminal>
</div>
</div>
</section>
</div>
<!-- TERMINAL SECTIONS END -->


<div class="section-wrapper">
    <section class="section" id="usedby">
        <div class="columns">
            <div class="column">
                <img :src="$withBase('/logos/codenotary.png')" width="150" alt="Immudb - Written records per ms" />
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
        <img :src="$withBase('/benchmark/throughput_read.png')" alt="Immudb - Throughput read" />
    </div>
    <div class="column">
        <img :src="$withBase('/benchmark/throughput_write.png')" alt="Immudb - Throughput write" />
    </div>
</div>
<div class="columns">
    <div class="column">
        <img :src="$withBase('/benchmark/exectime.png')" alt="Immudb - Written records per ms" />
    </div>
    <div class="column">
        <img :src="$withBase('/benchmark/query_bm.png')" alt="Immudb - Queried records per ms" />
    </div>
</div>
    </section>
</div>
