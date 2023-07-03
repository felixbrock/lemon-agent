from langchain.llms.base import BaseLLM 
from lemonai.tool import Tool
from typing import List

def filter_tools(llm: BaseLLM, task: str, tools: List[Tool]) -> List[Tool]:

    tool_names = [tool.name for tool in tools]
    prompt = f"Given the following list of tools: {tool_names}, return a list of possible tools to be used to complete the following task: '{task}'. If the task mentions any workflow, you MUST include this workflow in your final answer. You should split the task into subtasks and for each subtask, think about the possible tools that could be used to complete each subtask. Pay attention to tool names mentioned and verbs that are used (and their synonyms). Return as a single list which tools could be used to complete this task."

    answer = llm.generate(prompts=[prompt]).generations[0][0].text
    list_string = answer.strip()

    filtered_tool_names = eval(list_string)

    filtered_tools = list(filter(lambda x: x.name in filtered_tool_names, tools))

    return filtered_tools