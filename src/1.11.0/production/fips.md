# FIPS 140-2

<WrappedSection>

The Federal Information Processing Standard (FIPS) 140-2 publication describes United States government-approved security requirements for cryptographic modules. [FIPS-140](https://csrc.nist.gov/publications/detail/fips/140/2/final) series is a collection of computer security standards set by the National Institute of Standards and Technology (NIST) for the United States government. FIPS 140–2 defines the critical security parameters vendors must use for encryption before selling their products to the U.S government.

For a fully FIPS-compliant deployment of immudb a few things are required:

- immudb must be compiled with a FIPS validated cryptographic module
- immudb must be configured to use FIPS-approved cryptographic algorithms
- immudb components (immuadmin and immuclient) must be compiled with a FIPS-validated cryptographic module

For immudb, adherence to FIPS 140-2 is ensured by:

- Using FIPS approved / NIST-recommended cryptographic algorithms through the use of `goboring/golang` container image. Since the native go crypto standard library is not FIPS compliant, we use the Google-provided Go implementation that has patches on top of standard Go to enable integrating BoringCrypto. immudb components are built with this image as a build base.
- Enabling [`fipsonly`](https://go.googlesource.com/go/+/dev.boringcrypto/src/crypto/tls/fipsonly/fipsonly.go) mode to restrict all TLS configuration in immudb binaries to FIPS-approved settings.

</WrappedSection>

<WrappedSection>

### Limitations

- Currently the builds with FIPS-compliance are only available on `linux-amd64` architecture.
- There is an overhead in calling into BoringCrypto via cgo for the crypto library functions, which incurs a performance penalty. The library performs slower than the built-in crypto library. Hence you could see a performance drop of ~15% when using a FIPS-compliant immudb server.

</WrappedSection>

<WrappedSection>

### Using FIPS-compliant binaries

You can download the immudb binary from the [latest releases](https://github.com/codenotary/immudb/releases) on Github. The FIPS-compliant binaries have a `-fips` suffix. (e.g. immudb-v1.4.x-Linux-amd64-fips)

</WrappedSection>

<WrappedSection>

### Using FIPS-compliant docker images

You can pull immudb FIPS-compliant docker images from [DockerHub](https://hub.docker.com/r/codenotary/immudb) and run it in a ready-to-use container. The FIPS-compliant docker images have a `-fips` suffix. (e.g. codenotary/immudb-fips:latest)

</WrappedSection>
