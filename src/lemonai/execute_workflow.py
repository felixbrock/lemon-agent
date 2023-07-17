import uuid
from loguru import logger
from langchain.llms.base import BaseLLM
from langchain.agents import initialize_agent, AgentType
from lemonai.get_integrations import get_apis_from_env
from lemonai.api_wrapper import APIWrapper
from lemonai.toolkit import Toolkit
from lemonai.filter_tools import filter_tools
from typing import Optional


def execute_workflow(llm: BaseLLM, prompt_string: str, server_domain: Optional[str] = None):

    logfile_path = "lemonai.log"
    logger.remove(handler_id=None)
    logger.add(logfile_path, format="{time} - {extra[session_id]} - {extra[operation_name]}")

    api_keys_dict, access_tokens_dict = get_apis_from_env()
    session_id = uuid.uuid4()

    _wrapper = APIWrapper(llm, task=prompt_string, api_domain=server_domain)
    toolkit = Toolkit.from_api_wrapper(_wrapper, api_keys_dict, access_tokens_dict, logger, str(session_id))
    tools = toolkit.get_tools()

    prompt = f"Your task is '{prompt_string}'. Focus on the ordering of the tasks given. Do not use a workflow unless it is mentioned. Your action input should be a valid JSON object where the keys are the params and the values are the value for each input parameter. The description of the tool may provide the JSON structure of the action input using round brackets () instead of curly brackets. Follow this structure for your action input. Ensure all strings in the action input are valid and terminated correctly. Your final answer should give a brief conversational overview of what you did."    
    filtered_tools = filter_tools(llm=llm, task=prompt_string, tools=tools)
    
    agent = initialize_agent(
        tools=filtered_tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )

    agent.run(prompt)
