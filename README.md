# 🍋 Lemon AI Python Client

## About

Lemon AI Python Client. Craft internal co-pilots in a matter of minutes and execute highly efficient workflow automation by accessing internal tools like Airtable, Hubspot, Notion, or Salesforce. With Lemon AI, users can seamlessly grant their LLMs access to a wide range of APIs, creating co-pilots in minutes and unlocking the potential for streamlined, automated workflows.

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

Get started in minutes, by giving access to relevant external tooling and defining a task. Lemon AI handles the rest by finding a combination of external tools to solve the given task. Example of retrieving user data from Hackernews and writing it to a table in Airtable:

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

execute_workflow(model=model, prompt_string=prompt)
```

It is crucial to ensure the parameters are specified in the prompt otherwise the execution will fail.

### Lemon AI Functions - Solve Tasks Based on Predefined Workflows

Similar to [OpenAI's functions](https://openai.com/blog/function-calling-and-other-api-updates), Lemon AI provides the option to define workflows as reusable functions. Specific workflows can be defined in a separate lemonai.json:

```json
// lemonai.json

[
  {
    "name": "Hackernews Airtable User Workflow",
    "description": "retrieves user data from Hackernews and appends it to a table in Airtable",
    "tools": ["hackernews-get-user", "airtable-append-data"]
  }

  //...
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

execute_workflow(model=model, prompt_string=prompt)
```

The console output should show the intermediate steps taken by the Langchain agent to execute your prompt as well as the final answer. There will also be an output.log file which will log all tools/workflows used in each session and the final result of execution.

```log
2023-06-26T11:50:27.708785+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - HackerNews: Get User -
2023-06-26T11:50:39.624035+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - Airtable: Append the data to a table -
2023-06-26T11:50:45.792924+0100 - b5f91c59-8487-45c2-800a-156eac0c7dae - I read the user information for 'kimburgess' from Hackernews and wrote it to Airtable. The result was a record with the fields 'username', 'karma' and 'created_at_i' with the values 'kimburgess', 2454 and 1362302320 respectively.
2023-06-26T11:58:32.925228+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - HackerNews: Get User -
2023-06-26T11:58:43.988788+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - Airtable: Append the data to a table -
2023-06-26T11:58:52.504537+0100 - 5efe603c-9898-4143-b99a-55b50007ed9d - I read the user information for 'kimburgess' from Hackernews and wrote it to Airtable. The result was a record with the fields 'username', 'karma' and 'created_at_i' with the values 'kimburgess', 2454 and 1362302320 respectively.
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
