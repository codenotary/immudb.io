
# Quick start

1. **Download CodeNotary vcn.** There are releases for different platforms:

- [Download the latest release](https://github.com/vchain-us/vcn/releases/latest) and then read the [Usage](#usage) section below.
- We recommend storing vcn in your PATH - Linux example:
   ```bash
   cp vcn-v0.6.1-linux-amd64 /usr/local/bin/vcn
   ```

2. **Authenticate digital objects** You can use the command as a starting point.

   ```bash
   vcn authenticate <file|ds://directory|docker://dockerimage|git://gitdirectory>
   ```

3. [**Create your identity (free)**](https://dashboard.codenotary.io/auth/signup) You need an identity at CodeNotary to notarize objects yourself (btw. we're a data-minimum company and only ask for data that is really required) 


4. **Notarize existing digital objects** Once you have an account you can start notarizing digital assets to give them an identity.

   ```bash
   vcn login
   vcn notarize <file|ds://directory|docker://dockerimage|git://gitdirectory>
   ```

