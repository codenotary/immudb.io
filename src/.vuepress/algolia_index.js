const algoliasearch = require('algoliasearch')
require('dotenv').config()
const glob = require("glob")
const {
  readFileSync
} = require("fs")
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRIGHT_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX)
var MarkdownIt = require('markdown-it');
const cliProgress = require('cli-progress');
var slugify = require('slugify')


try {
  /**
   * For this documentation we use vue press.
   * VuePress uses file system for routing. That means for creating a new documentation
   * you need to create a new file as an md and this will create a new route for you.
   * 
   * So for mapping all the routes - documents in this project we just load all the .md files
   * under src folder.
   */
  glob("./src/**/*.md", {}, async function (er, files) {
    const itemsToIndex = []
    await index.clearObjects()

    /**
     * We loop through all md files so we can scrap each one of them and finally index them into algolia.
     */
    files.map(file => {
      /**
       * We open each file of the loop.
       * We do this for creating sections and after selecting one result
       * navigates you in the hash as well.
       */
      const content = readFileSync(file).toString();

      /**
       * lvl1 and lvl2 variables remained from he previous indexing and represents 
       * The h1 and the header 2 of the scrapped page.
       * H1 - lvl1 is the title of the document
       * H2 - lvl is the sections - hash
       */
      let lvl1 = ''
      let lvl2 = ''

      /**
       * In vue press README.md is like index.html so when a README.md exists is not appearing in the url
       * VuePress adds .html in the end of each file.
       * ex. master/my/path/README.md becomes https://my-doc/master/my/path
       * ex2.  master/my/path/about.md becomes https://my-doc/master/my/path/about.html
       * 
       * For this reason i remove the README.mf and replace the .md with .html
       */
      const url = file.replace('./src', 'https://docs.immudb.io').replace('README.md', '').replace('.md', '.html');

      /**
       * Using MarkdownIt for opening md files and parse sections
       */
      var md = new MarkdownIt();
      var result = md.parse(content, {});
      return result.map((r, i) => {
        /**
         * The h1 is the lvl1 key in indexing document 
         * and remains as the main lvl1 for the rest of the file.
         */
        if (r.tag == 'h1' && !r.type.endsWith('close')) {
          lvl1 = result[i + 1].content
        }

        /**
         * The h2 is the lvl2 key in indexing document 
         * and represents the current indexing section.
         */
        if (r.tag == 'h2' && !r.type.endsWith('close')) {
          lvl2 = result[i + 1].content
        }

        /**
         * We create the indexing item to push.
         * from lvl3 to lvl6 not sure how i could handle that.
         * 
         * Needs further investigation.
         * 
         * The anchor in the h2 - lvl of the current section that creates the id of that.
         * We use that for visiting the section.
         * 
         * ex. my/path/about.html#who-we-are
         */
        if (!!r.content) {
          itemsToIndex.push({
            anchor: slugify(lvl2.toLowerCase()),
            content: r.parent != 'h2' ? r.content : null,
            url,
            hierarchy: {
              lvl0: 'Documentation',
              lvl1,
              lvl2,
              lvl3: '',
              lvl4: '',
              lvl5: '',
              lvl6: '',
            }
          })


        }
      })
    })

    console.log("Items to index:", itemsToIndex.length)

    /**
     * Its a big process and for this reason i am using progressBar
     * and letting the user know that the app is not stuck and actually is processing 
     */
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(itemsToIndex.length, 0);

    batchSize = 1000

    /**
     * Apologies for using for loop instead of Promise.all map
     * But seems like it wasn't working as expected.
     * TODO: replace for loop with Promise.all
     * 
     * We loop thought all the items and indexing them to algolia
     */
    for (let i = 0; i < itemsToIndex.length; i+= batchSize) {
      try {
        progressBar.update(i);
        await index.saveObjects(itemsToIndex.slice(i, i+batchSize), {
          autoGenerateObjectIDIfNotExist: true
        })
      } catch (error) {
        console.log(error);
      }
    }
  })
} catch (error) {
  console.log(error)
}
