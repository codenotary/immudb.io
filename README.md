## CodeNotary Docs 

Site: [docs.codenotary.io](https://docs.codenotary.io/)

Repository: vchain-us/docs

This project is an auto-updating readme hub for all the user manuals we have in our projects. 

We have two different type of source files (md files) in the repository: 

- Project specific user guides which are synced from other repositories (eg. vchain-us/vcn) 
- Other generic user guides

## Editing 

IMPORTANT! Synced content should be edited in the source repository (eg. vcn, dashboard, etc.)
The generic ones are directly editable in the vchain-us/docs repo.

### Github's UI

The best way to edit the documentation is just browsing the markdown files under /site and editing them via Github's UI. Please be careful, in master all the saved (commited) changes are getting published immediately. 

### Local 

You can check out the project and edit the markdown files. Also you can run Vuepress locally to have a full-featured preview.

```
npm i 
npm 



## Auto sync 

To reduce duplications between repositories and the documentation website we have syncronization Github Actions in place which are syncing markdown files from other repositories (eg. vcn, dashboard) to the docs repository.

This way 

- the documentation is always up-to-date in both places
- the markdown files can stay in the source repo and evolutionary change with the code/product 
- the documentation stays accessible via Github's UI as well (for both users and Google).

The sync. Github Actions you can find in the source repositories. Syncing is triggered on every push to the source repo.

## Auto build

The project has it's own automatic build process (also powered by Github Actions). 
On every commit (push) or direct manual editing on Github's UI the GH Action executes the VuePress site's build process and builds a new version.   


## Auto publishing, hosting

The built static VuePress site is served by Github Pages from the standard /docs folder. 
Publication is automatic on every change in the repo because the output of the build process is the /docs folder.  

Please note Github's caching is causing some seconds (sometimes minutes) of delay and you need to wait a little bit to see the newly built site on docs.codenotary.io.


## Implementation details 

The docs application was built with the popular VuePress Static Site Generator. It uses the default template and follows the standard VuePress structure. 

