## CodeNotary Docs 

Site: [docs.codenotary.io](https://docs.codenotary.io/)

Repository: vchain-us/docs

This project is an auto-updating readme hub for all the user manuals we have in our projects. 

You can find two different types of source files (md files) in this repository: 

- Project specific user guides which are synced from other repositories (eg. vchain-us/vcn, vchain-us/docs) 
- Other generic user guides

## Editing 

IMPORTANT! Synced content should be edited in the source repository
The generic user guides are directly editable in the vchain-us/docs repo.

#### Github 

The best and most convenient way to edit the documentation site is to use Github's UI: browse for the markdown files under the /site folder and edit them via Github's md editor directly. 

Please be careful, in the master branch all the saved (commited) changes are getting published immediately. 

#### Local 

You can also clone the project and edit the markdown files locally. 
Also you can run Vuepress locally to have a full-featured preview: 

```
npm i 
npm run build

```

## Auto sync 

To reduce duplications between repositories and the documentation website we have Github Actions in place which are syncing markdown files from other repositories (eg. vcn, dashboard) to the docs repository.

This way 

- the documentation is always up-to-date in both places
- the markdown files can stay in the source repo and evolutionary change with the code/product 
- the documentation stays accessible via Github's UI as well (for both users and Google).

These Github Actions you can find in the source repositories!
Syncing is usually triggered on every push on the source repo's master branch.


## Auto build

The project has it's own automatic build process which is also powered by Github Actions. 
On every commit (push) or direct manual editing on Github's UI the GH Action executes the VuePress build process and builds a new version.   


## Auto publishing - hosting

The static built site is served by Github Pages from the /docs folder. 
Publication is automatic on every change in the repo because the output of the build process is the /docs folder.  

Please note Github's caching is causing some seconds (sometimes minutes) of delay and you need to wait a little bit before you see the newly built site on docs.codenotary.io.


## Implementation details, development


The  application was built with the popular VuePress Static Site Generator. 
It uses the default template and follows the standard VuePress structure. 

You can find more information about VuePress here:
[VuePress Official Website](https://vuepress.vuejs.org/)

