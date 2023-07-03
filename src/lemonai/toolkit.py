import os
import json
from langchain.agents.agent_toolkits.base import BaseToolkit
from lemonai.api_wrapper import APIWrapper
from lemonai.tool import Tool
from lemonai.workflow import Workflow
from typing import List, Dict, Optional, Union, Tuple
from loguru._logger import Logger

class Toolkit(BaseToolkit):

    tools: List[Union[Tool, Workflow]] = []

    def _get_access_variable(self, api_key_dict: Dict[str, str], access_token_dict: Dict[str, str], action_id: str) -> Tuple[Optional[str], Optional[str]]:
        api_key = None
        access_token = None

        for key in api_key_dict:
            if key in action_id:
                api_key = api_key_dict[key]
        
        for key in access_token_dict:
            if key in action_id:
                access_token = access_token_dict[key]
    
        return api_key, access_token
    
    def _get_workflows_from_file(tools_list: List[Tool]) -> List[Workflow]:
        workflows = []

        with open("lemonai.json", "r") as file:
            data = json.load(file)
            tool_ids_list = [tool.id for tool in tools_list]

            for item in data:
                required_tools = item["tools"]
                tools_objs = []
                ignore = False
                for tool_id in required_tools:
                    index = tool_ids_list.index(tool_id) if tool_id in tool_ids_list else -1
                    if index == -1:
                        ignore = True
                        break
                    else:
                        tools_objs.append(tools_list[index])
                
                if not ignore:
                    tool_names = [tool.name for tool in tools_objs]
                    workflows.append(
                        Workflow(
                            name=item["name"],
                            description=Toolkit._build_workflow_description(item["name"], item["description"], tool_names),
                            tools=tools_objs,
                    ))

        return workflows

    def _build_workflow_description(name: str, description: str, tool_names: List[str]) -> str:
        return f"A wrapper around Lemon AI workflows. To run this workflow, run each tool in the workflow's tools list in the correct order to achieve the goal given by the workflow's description. You MUST take into account the params when executing each stage of the workflow. Sometimes, but not always, the output from a tool in the workflow may need to be used as the param for another tool in the workflow. For example, if the workflow's description is \"send the latest weather information in an email to maria.musterfrau@gmail.com\", first you would need to retrieve the latest weather information using one tool and then send that tool's output in an email to the given recipient, using the weather information as a param for the tool to send the email. You MUST use every tool that is given in the workflow's tools list once and in the same order as the list. Do not make up params, they will be explicitly specified in each tool's description. Do not use any tools that are not in this workflow's tools list. If you do not have enough information to fill in the params for a tool, just say 'not enough information provided in the instruction, missing <param>'. If you get a null or none response, STOP EXECUTION, do not try another tool! This workflow is named:{name} and has the goal:{description} and this workflow's tools list is: {tool_names}" 

    @classmethod
    def from_api_wrapper(
        cls,
        api_wrapper: APIWrapper,
        api_keys_dict: Dict[str, str],
        access_tokens_dict: Dict[str, str],
        logger: Logger,
        session_id: str,
    ) -> "Toolkit":
        
        actions = api_wrapper.get_tool_list()

        tools = []

        for action in actions:
            if action["authorizationType"] == "none":
                tools.append(Tool(
                    id=action["id"],
                    name=action["name"],
                    description=action["description"],
                    api_wrapper=api_wrapper,
                    logger=logger,
                    session_id=session_id
                ))
            else:
                api_key, access_token = cls._get_access_variable(cls, api_keys_dict, access_tokens_dict, action["id"])
                if api_key or access_token:
                    tools.append(Tool(
                        id=action["id"],
                        name=action["name"],
                        description=action["description"],
                        api_wrapper=api_wrapper,
                        api_key=api_key,
                        access_token=access_token,
                        logger=logger,
                        session_id=session_id
                    ))
        
        if os.path.exists("lemonai.json"):
            workflows = cls._get_workflows_from_file(tools)
            tools.extend(workflows)

        return cls(tools=tools)

    def get_tools(self) -> List[Tool]:
        return self.tools