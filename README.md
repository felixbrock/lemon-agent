# 🍋 Lemon AI Python Client

## About

**Build powerful copilots in minutes and execute highly efficient workflow automations by accessing internal tools like Airtable, Hubspot, Notion and Salesforce. With Lemon AI, it is possible to seamlessly grant access to a wide range of APIs for read and write operations, creating copilots in minutes and unlocking the true potential of LLMs.**

## Getting Started

To use Lemon AI in your Python project just run:

```bash
pip install lemon-ai
```

This will install the corresponding Lemon AI client which you then can import into your script.

The tool uses Python packages `langchain` and `loguru`. In the case of any installation errors with Lemon AI, install both packages first and then install the Lemon AI package.

Requires Python 3.8.1 and above.

To use tools that require authentication, you have to store the corresponding access credentials in your environment in the format "{tool name}\_{authentication string}" where the authentication string is one of ["API_KEY", "SECRET_KEY", "SUBSCRIPTION_KEY", "ACCESS_KEY"] for API keys or ["ACCESS_TOKEN", "SECRET_TOKEN"] for authentication tokens. Examples are "OPENAI_API_KEY", "BING_SUBSCRIPTION_KEY", "AIRTABLE_ACCESS_TOKEN".

## Features

### Lemon AI Out-Of-The-Box Workflow Automation

Get started in minutes by giving access to relevant tools and defining a task. Lemon AI handles the rest by finding a combination of relevant tools to solve the given task. Example of retrieving user data from Hackernews and writing it to a table in Airtable:

```python
import os
from lemon_ai import execute_workflow
from langchain import OpenAI

# Make sure all API keys and access tokens are set in the environment
os.environ["OPENAI_API_KEY"] = "*INSERT OPENAI API KEY HERE*"
os.environ["AIRTABLE_ACCESS_TOKEN"] = "*INSERT AIRTABLE TOKEN HERE*"

hackernews_username = "*INSERT HACKERNEWS USERNAME HERE*"
airtable_base_id = "*INSERT BASE ID HERE*"
airtable_table_id = "*INSERT TABLE ID HERE*"

# Give your instruction to be given to your LLM
prompt = f"""Read information from Hackernews for user {hackernews_username} and then write the results to
Airtable (baseId: {airtable_base_id}, tableId: {airtable_table_id}). Only write the fields "username", "karma"
and "created_at_i". Please make sure that Airtable does NOT automatically convert the field types.
"""

# Initialise your model before passing it into the execute_workflow() function
model = OpenAI(temperature=0)

execute_workflow(llm=model, prompt_string=prompt)
```

It is crucial to ensure the parameters are specified in the prompt otherwise the execution will fail.

### Lemon AI Functions - Solve Tasks Based on Predefined Workflows

Similar to [OpenAI's functions](https://openai.com/blog/function-calling-and-other-api-updates), Lemon AI provides the option to define workflows as reusable functions. Specific workflows can be defined in a separate lemonai.json:

```json
[
  {
    "name": "Hackernews Airtable User Workflow",
    "description": "retrieves user data from Hackernews and appends it to a table in Airtable",
    "tools": ["hackernews-get-user", "airtable-append-data"]
  }
]
```

In addition to Lemon AI's common set of tools, those workflow functions will also be provided to the model. Workflow functions can help to solve tasks in a specific way. This is especially helpful in situations where more deterministic model behavior is needed.

Please make sure to provide a proper workflow 'description' and provide the 'tools' in the right order to allow the correct execution of the workflow '['tool to be used first', ...]'.

Users can ask the LLM to run a specific workflow for them:

```python
import os
from lemon_ai import execute_workflow
from langchain import OpenAI

# Make sure all API keys and access tokens are set in the environment
os.environ["OPENAI_API_KEY"] = "*INSERT OPENAI API KEY HERE*"
os.environ["AIRTABLE_SECRET_TOKEN"] = "*INSERT AIRTABLE TOKEN HERE*"

hackernews_username = "*INSERT HACKERNEWS USERNAME HERE*"
airtable_base_id = "*INSERT BASE ID HERE*"
airtable_table_id = "*INSERT TABLE ID HERE*"

# Give your instruction to be given to your LLM
prompt = f"""Run the Hackernews Airtable User Workflow for user {hackernews_username}, baseId {airtable_base_id}
and tableId {airtable_table_id}. Only write the fields 'username', 'karma' and 'created_at_i' to the Airtable
table. Please make sure that Airtable does NOT automatically convert the field types."
"""

# Initialise your model before passing it into the execute_workflow() function
model = OpenAI(temperature=0)

execute_workflow(llm=model, prompt_string=prompt)
```

## Traceability

To allow you to gain full transparency on how your model interacted with your Lemon AI tools to solve the given task, we are writing all decisions made, tools used and operations performed to a local output.log file.

```log
2023-06-26T11:50:27.708785+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - HackerNews: Get User
2023-06-26T11:50:39.624035+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - Airtable: Append the data to a table
2023-06-26T11:58:32.925228+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - HackerNews: Get User
2023-06-26T11:58:43.988788+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - Airtable: Append the data to a table
```

## Supported Tools

Below is a list of all supported tools by Lemon AI and their ids (for use in the lemonai.json workflow file):

#### HackerNews:

- Get User: hackernews-get-user
- Get Article: hackernews-get-article

#### Airtable:

- Append data to a table: airtable-append-data
- Delete data from a table: airtable-delete-data
- List all data from a table: airtable-list-data
- Read data from a table: airtable-read-data
- Update data in a table: airtable-update-data

#### Slack:

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

#### HubSpot:

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
