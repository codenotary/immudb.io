# Notarization

Notarization is a process of creating an immutable blockchain entry that contains asset metadata so it can be used in the future authentication of a digital asset. It is a three-part process that includes the vetting of a signer's identity, the signer testifying to the asset's [status](#Statuses), and the recording of that asset's metadata (signer identity, unique digital fingerprint, [status](#Statuses), etc.) into an official record stored on the blockchain. This way interested parties can authenticate with certainty if an asset is trusted, who testified to its trust and how they have proven who they are.

**Part 1 of Notarization - Signer Identity Verification**

The first part of the notary process happens when a user verifies their identity through one or more of the following ways: email, social, government ID, or address verification. Identity verification changes a user’s trust [level](#Levels). The trust [level](#Levels) a user has when they notarize an asset is inserted into that asset’s metadata and appended to the blockchain. 

Note: If the user later changes their trust [level](#Levels), the assets they notarized prior to the change will still reflect their previous trust [level](#Levels), i.e. the trust [level](#Levels) the user had when they originally notarized that specific asset. For example, say a user notarizes an asset when they had a trust [level](#Levels) of 2, but they later upgraded their trust [level](#Levels) to 3. When that asset is authenticated, it would return metadata saying the notarizing user had a trust [level](#Levels) of 2, even after the user upgraded their trust [level](#Levels). This is why you want to verify your identity at the highest trust [level](#Levels) before you start notarizing assets.

**Part 2 of Notarization - Testifying to an Asset’s Trustworthiness**

CodeNotary allows users to independently testify to an asset’s trust [status](#Statuses) and immutably store their attestation on the blockchain through the notarization process. The notary process is initiated by a user (the signer) and executed by running the command: 

- `vcn notarize` which sets the asset’s [status](#Statuses) equal to **TRUSTED**

(Subsequent changes in status are revocations of trust. See the section below on Revocation for more information.)

**Part 3 of Notarization - Creating Asset Metadata and Recording it on the Blockchain**

When the signer initiates the notarization process, their block of digital data (*the asset*) is input into a [SHA-256](https://en.wikipedia.org/wiki/SHA-2) hashing function in order to produce their asset’s unique digital fingerprint. (The digital fingerprint is also known as the digest or simply *the hash*.)

Then, the hash (not the asset itself, which is never uploaded to nor shared with CodeNotary) along with the desired [status](#Statuses) is cryptographically signed by using the signer's secret (private key). Signing takes place locally on the signer’s machine. 
Once signed, this metadata (i.e. the signed hash and status) is sent to a Smart Contract on the blockchain. The Smart Contract then adds the signer’s trust [level](#Levels) and a timestamp to the already existing metadata. 

In the end, the output of the notarization process is a new entry on the [ZTC](https://zerotrustconsortium.org/) blockchain, where it remains forever and can never be changed. The entry contains the asset’s signed hash, signed [status](#Statuses), [level](#Levels), and timestamp, which are all bound together.  Attribute mapping and descriptions are below:

Field | Label | Description 
------------ | ------------- | ------------- 
`Owner` | **SignerID** | The public address derived from the user's secret.
`Level` | **Level** | The signer's [level](#Levels) at the time when the notarization was made. It indicates how the signer verified their identity.
`Status` | **Status** | The asset's [status](#Statuses) chosen by the signer at the time when the notarization was made.
`Timestamp` | **Date** | The date and time of the notarization.
> *Field*s are names used to map [the data stored onto the blockchain](https://github.com/vchain-us/vcn/blob/0.5.0/pkg/api/verify.go#L26), *Label*s are used by `vcn` when printing results.

# Revocation

Revocation is the process of removing an asset’s trust by changing its [status](#Statuses). 
Each change in [status](#Statuses) is an additional blockchain entry and includes the same fields of metadata as notarization does. Trust revocation can made by running the commands:

- `vcn untrust` to set an asset's [status](#Statuses) to equal **UNTRUSTED**
- `vcn unsupport` to set an asset's [status](#Statuses) to equal **UNSUPPORTED**

# Authentication

Authentication is the process of confirming an asset's [status](#Statuses) that is recorded on the blockchain. This is usually done by running `vcn authenticate` against an asset.

Given an asset as an input, the hash is computed in the same way it is in the notarization process. If any blockchain entry has a hash that matches the local asset’s newly calculated hash, then the matching result [status](#Statuses) is returned (the authentication) along with the metadata that’s bound to the matching hash. Otherwise, the returned result status equals **UNKNOWN**.

Authentication is always free and can be performed by anyone, anywhere, at any time, regardless of organizational affiliation or customer freemium status.

## Authentication of Co-notarized Assets

CodeNotary's `vcn` application allows multiple users to notarize the same asset. The act is known as co-notarization. By default, when running the command `vcn authenticate`, a user’s last blockchain entry for the asset will be returned to them when they are logged in, regardless if the asset was co-notarized. However, all other users will be returned the last blockchain entry made by the user with the highest trust level. 

Alternatively, it is also possible to retrieve the authentication matching a specific signer (a user or an organization) using the flag `--signerID`.

## Statuses

Code | Status | Color | Description | Error message | Explanation
------------ | ------------- | ------------- | ------------ | ------------- | -------------
0 | **TRUSTED** | *green* | The asset was notarized. | *none* | The blockchain indicates that the asset is authentic and the signer trusts it.
2 | **UNKNOWN** | *yellow* | The asset is not notarized. | *hash* is not notarized *[by <key/list of keys/org>]* | No notarization is found on the blockchain for the asset.
1 | **UNTRUSTED** | *red* | The asset is untrusted. | *hash* is untrusted *[by <key/list of keys/org>]* | The  blockchain indicates that the signer DOES NOT trust the asset.
3 | **UNSUPPORTED** | *red* | The asset is unsupported. | *hash* is unsupported *[by <key/list of keys/org>]* | The blockchain indicates that the signer DOES NOT trust the asset because it is not supported anymore (e.g. deprecated).

## Levels

Level | Label | Description 
------------ | ------------- | ------------- 
-1 | **DISABLED** | The signer's account is disabled.
0 | **UNKNOWN** | The signer's identity is unknown.
1 | **EMAIL_VERIFIED** | The signer's email is verified by CodeNotary platform.
2 | **SOCIAL_VERIFIED** | The signer's identity is verified by social media profiles.
3 | **ID_VERIFIED** | The signer provided an ID document.
4 | **LOCATION_VERIFIED** | The signer provided a proof-of-address.
99 | **VCHAIN** | *Reserved*

## FAQs

### Who/what is performing the act of notarization?

  Notarization is performed by a combination of user action, CodeNotary OpenSource software, and a CodeNotary smart contract.
 
### Who is the witness?

  The CodeNotary smart contract and every member node of ZTC blockchain are the witnesses who attest to the authenticity of the records stored on the blockchain. 
 
### Who guarantees that nothing gets changed after the notarization has been processed?

  The blockchain and the collective protection of the ZTC member nodes guarantee the records stored on the blockchain are forever immutable and authentic.
 
### Who is the ZTC?
 
  The [ZTC](https://zerotrustconsortium.org/) (Zero Trust Consortium) is the software industry’s first blockchain-based consortium that adheres to a community-led, group governance model. Its decentralized design prevents any one member from dominating control over the others, allowing verified truth to only come through group consensus. No member has the ability to unilaterally adjust, role back, or delete the history that has been recorded. The consortium makes its ledger available to the public for inspection year round, day or night. 

