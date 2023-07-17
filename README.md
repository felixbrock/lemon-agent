# 🍋 Lemon AI

![Heatmap Example](heatmap-example.gif)

## 🔗🍋 About

**Lemon AI helps you build powerful AI assistants in minutes and automate workflows by allowing for accurate and reliable read and write operations in tools like Airtable, Hubspot, Discord, Notion, Slack and Github.**

Most connectors available today are focused on read-only operations, limiting the potential of LLMs. Agents, on the other hand, have a tendency to hallucinate from time to time due to missing context or instructions.

With Lemon AI, it is possible to give your agents access to well-defined APIs for reliable read and write operations. In addition, Lemon AI functions allow you to further reduce the risk of hallucinations by providing a way to statically define workflows that the model can rely on in case of uncertainty.

## ⚡️ Quick Start

The following quick start demonstrates how to use Lemon AI in combination with Agents to automate workflows that involve interaction with internal tooling.

### 1. Install Lemon AI

Requires Python 3.8.1 and above.

To use Lemon AI in your Python project run `pip install lemonai`

This will install the corresponding Lemon AI client which you can then import into your script.

The tool uses Python packages langchain and loguru. In case of any installation errors with Lemon AI, install both packages first and then install the Lemon AI package.

### 2. Launch the Server

The interaction of your agents and all tools provided by Lemon AI is handled by the [Lemon AI Server](https://github.com/felixbrock/lemonai-server). To use Lemon AI you need to run the server on your local machine so the Lemon AI Python client can connect to it.

### 3. Use Lemon AI with Langchain

Lemon AI automatically solves given tasks by finding the right combination of relevant tools or uses Lemon AI Functions as an alternative. The following example demonstrates how to retrieve a user from Hackernews and write it to a table in Airtable:

#### (Optional) Define your Lemon AI Functions

Similar to [OpenAI functions](https://openai.com/blog/function-calling-and-other-api-updates), Lemon AI provides the option to define workflows as reusable functions. These functions can be defined for use cases where it is especially important to move as close as possible to near-deterministic behavior. Specific workflows can be defined in a separate lemonai.json:

```json
[
  {
    "name": "Hackernews Airtable User Workflow",
    "description": "retrieves user data from Hackernews and appends it to a table in Airtable",
    "tools": ["hackernews-get-user", "airtable-append-data"]
  }
]
```

Your model will have access to these functions and will prefer them over self-selecting tools to solve a given task. All you have to do is to let the agent know that it should use a given function by including the function name in the prompt.

#### Install LLM provider's dependencies

The following example uses OpenAI's API to operate the workflow, so before you start, install `openai` dependency with `pip`:

```bash
pip install openai
```

#### Include Lemon AI in your Langchain project

```Python
import os
from lemonai import execute_workflow
from langchain import OpenAI
```

#### Load API Keys and Access Tokens

To use tools that require authentication, you have to store the corresponding access credentials in your environment in the format "{tool name}\_{authentication string}" where the authentication string is one of ["API_KEY", "SECRET_KEY", "SUBSCRIPTION_KEY", "ACCESS_KEY"] for API keys or ["ACCESS_TOKEN", "SECRET_TOKEN"] for authentication tokens. Examples are "OPENAI_API_KEY", "BING_SUBSCRIPTION_KEY", "AIRTABLE_ACCESS_TOKEN".

```Python
""" Load all relevant API Keys and Access Tokens into your environment variables """
os.environ["OPENAI_API_KEY"] = "*INSERT OPENAI API KEY HERE*"
os.environ["GITHUB_API_KEY"] = "*INSERT GITHUB API KEY HERE*"
os.environ["DISCORD_WEBHOOK_URL"] = "*INSERT DISCORD CHANNEL WEBHOOK URL HERE*"
```

#### Example of defining your prompt and executing the Langchain Agent

The following example makes use of several Lemon AI tools to

1. Retrieve details about a personal repository on GitHub
2. Get the top growing starred repositories of my account
3. Send a Discord message with results and review.

![Use Case Example](use-case-example.png)

```Python
lemonai_repo_owner = "felixbrock"
github_username = "Abdus2609"

""" Define your instruction to be given to your LLM """
prompt = f"""Get the description for a repository I am working with called lemonai (owner {lemonai_repo_owner}).
Also, get my top growing starred repositories (username {github_username}). Analyze the descriptions of both
the LemonAI repository and my top-starred repositories. Then, send a Discord message that first displays a
numerically bullet-pointed leaderboard of the top growing starred repositories and their growth, and secondly
discuss how each tool could be useful specifically to lemonai's use case based on your analysis of the
descriptions of each repository."""

"""
Use the Lemon AI execute_workflow wrapper
to run your Langchain agent in combination with Lemon AI
"""
model = OpenAI(temperature=0)

execute_workflow(llm=model, prompt_string=prompt)
```

### 4. Gain transparency on your Agent's decision making

To gain transparency on how your Agent interacts with Lemon AI tools to solve a given task, all decisions made, tools used and operations performed are written to a local `lemonai.log` file. Every time your LLM agent is interacting with the Lemon AI tool stack a corresponding log entry is created:

```log
2023-06-26T11:50:27.708785+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - hackernews-get-user
2023-06-26T11:50:39.624035+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - airtable-append-data
2023-06-26T11:58:32.925228+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - hackernews-get-user
2023-06-26T11:58:43.988788+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - airtable-append-data
```

By using the [Lemon AI Analytics Tool](https://github.com/felixbrock/lemonai-analytics) you can easily gain a better understanding of how frequently and in which order tools are used. As a result, you can identify weak spots in your agent’s decision-making capabilities and move to a more deterministic behavior by defining Lemon AI functions.

![Heatmap Example](heatmap-example.png)

## 👥 Community

[Join our discord community](https://discord.gg/EBbZkCqT) to connect with other Lemon AI developers, ask questions, get support, and stay updated with the latest news and announcements!

## 🧩 Supported Tools

Below is a list of all tools supported by Lemon AI and their ids (those need to be used in the lemonai.json file to define functions):

### HackerNews

- Get User: hackernews-get-user
- Get Article: hackernews-get-article

### Airtable

- Append data to a table: airtable-append-data
- Delete data from a table: airtable-delete-data
- List all data from a table: airtable-list-data
- Read data from a table: airtable-read-data
- Update data in a table: airtable-update-data

### Slack

- Archive channel: slack-channel-archive
- Close channel: slack-channel-close
- Create channel: slack-channel-create
- Get channel: slack-channel-get
- Get many channels: slack-channel-get-many
- Get channel history: slack-channel-history
- Invite to channel: slack-channel-invite
- Join channel: slack-channel-join
- Kick from channel: slack-channel-kick
- Leave channel: slack-channel-leave
- Get channel members: slack-channel-member
- Open channel: slack-channel-open
- Rename channel: slack-channel-rename
- Reply in channel: slack-channel-reply
- Set channel purpose: slack-channel-set-purpose
- Set channel topic: slack-channel-set-topic
- Unarchive channel: slack-channel-unarchive
- Get file: slack-file-get
- Get many files: slack-file-get-many
- Delete message: slack-message-delete
- Get message permalink: slack-message-get-permalink
- Search for message: slack-message-search
- Send message: slack-message-send
- Update message: slack-message-update
- Add message reaction: slack-reaction-add
- Get message reaction: slack-reaction-get
- Remove message reaction: slack-reaction-remove
- Add star: slack-star-add
- Delete star: slack-star-delete
- Get many stars: slack-star-get-many
- Get user: slack-user-get
- Get many users: slack-user-get-many
- Get user's status: slack-user-get-status
- Update user's profile: slack-user-update-profile
- Create user group: slack-user-group-create
- Disable user group: slack-user-group-disable
- Enable user group: slack-user-group-enable
- Get many user groups: slack-user-group-get-many
- Update user group: slack-user-group-update

### HubSpot

- Create/Update a contact: hubspot-create-update-contact
- Delete a contact: hubspot-delete-contact
- Get a contact: hubspot-get-contact
- Get all contacts: hubspot-get-all-contacts
- Get recently created/updated contacts: hubspot-get-recently-created-updated-contacts
- Search contacts: hubspot-search-contacts
- Add contact to a list: hubspot-add-contact-to-list
- Remove a contact from a list: hubspot-remove-contact-from-list
- Create a company: hubspot-create-company
- Delete a company: hubspot-delete-company
- Get a company: hubspot-get-company
- Get all companies: hubspot-get-all-companies
- Get recently created companies: hubspot-get-recently-created-updated-companies
- Search companies by domain: hubspot-search-companies-by-domain
- Update a company: hubspot-update-company
- Create a deal: hubspot-create-deal
- Delete a deal: hubspot-delete-deal
- Get a deal: hubspot-get-deal
- Get all deals: hubspot-get-all-deals
- Get recently created deals: hubspot-get-recently-created-updated-deals
- Search deals: hubspot-search-deals
- Update a deal: hubspot-update-deal
- Create an engagement: hubspot-create-an-engagement
- Delete an engagement: hubspot-delete-an-engagement
- Get an engagement: hubspot-get-an-engagement
- Get all engagements: hubspot-get-all-engagements
- Get all fields from a form: hubspot-get-fields-form
- Create a ticket: hubspot-create-ticket
- Delete a ticket: hubspot-delete-ticket
- Get a ticket: hubspot-get-ticket
- Get all tickets: hubspot-get-all-tickets
- Update a ticket: hubspot-update-ticket

### Github

- Create a new file in repository: github-file-create
- Delete a file in repository: github-file-delete
- Edit a file in repository: github-file-edit
- Get the data of a single file: github-file-get
- Create a new issue: github-issue-create
- Create a new comment on an issue: github-issue-comment
- Edit an issue: github-issue-edit
- Get the data of a single issue: github-issue-get
- Lock an issue: github-issue-lock
- Get the data of a single repository: github-repo-get
- Return the contents of the repository's license file, if one is detected: github-repo-license
- Return issues of a repository: github-repo-issues
- Get the top 10 popular content paths over the last 14 days: github-repo-top-paths
- Get the top 10 referring domains over the last 14 days: github-repo-top-domains
- Create a new release: github-release-create
- Get a release: github-release-get
- Get all repository releases: github-release-get-all
- Delete a release: github-release-delete
- Update a release: github-release-update
- Create a new review: github-review-create
- Get a review for a pull request: github-review-get
- Get all reviews for a pull request: github-review-get-all
- Update a review: github-review-update
- Return the repositories of a user: github-user-repos
- Invite a user to an organisation: github-user-org-invite
- Return the repositories of an organisation: github-org-repos-get
- Get the top growing starred repositories of a user: github-user-get-star-growth

### Notion

- Append block child: notion-append-after-block
- Get block children: notion-get-child-blocks
- Get database: notion-get-database
- Get all databases: notion-get-many-database
- Search database: notion-search-database
- Create database page: notion-create-database-page
- Get database page: notion-get-database-page
- Get all database pages: notion-get-many-database-page
- Update database page: notion-update-database-page
- Archive page: notion-archive-page
- Create page: notion-create-page
- Search page: notion-search-page
- Get user: notion-get-user
- Get all users: notion-get-many-user

### Discord

- Send message in channel: discord-message-send

## 🏎️ Next Up

- [x] Github
- [x] Notion
- [x] Discord
- [ ] Gmail
- [ ] Google Calendar
- [ ] Kafka
- [ ] Pipedrive
- [ ] Monday.com
- [ ] Stripe
- [ ] Medium
- [ ] Google Cloud Realtime Database
- [ ] Salesforce

## 🔥 Contributing

Great to see you here 🫶 We are extremely open to contributions! You can find more information in our [CONTRIBUTING.md](https://github.com/felixbrock/lemonai-py-client/blob/main/.github/CONTRIBUTING.md).
