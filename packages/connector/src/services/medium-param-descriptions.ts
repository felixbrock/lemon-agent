export default {
    postCreateParamDescriptions: {
        publication: "Whether you are posting for a publication",
        publicationId: "Publication IDs. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        title: "Title of the post. Max Length : 100 characters.",
        contentFormat: "html | markdown",
        content: "The body of the post, in a valid semantic HTML fragment, or Markdown",
        additionalFields: {
            canonicalUrl: "The original home of this content, if it was originally published elsewhere",
            license: "all-rights-reserved | cc-40-by | cc-40-by-nc | cc-40-by-nc-nd | cc-40-by-nc-sa | cc-40-by-nd | cc-40-by-sa | cc-40-zero | public-domain",
            notifyFollowers: "Whether to notify followers that the user has published",
            publishStatus: "public | draft | unlisted",
            tags: "Comma-separated strings to be used as tags for post classification. Max allowed tags: 5. Max tag length: 25 characters."
        }
    },
    publicationGetAllParamDescriptions: {
        returnAll: "Whether to return all results or only up to a given limit",
        limit: "Max number of results to return"
    }
}