from langchain.tools import BaseTool
from lemonai.tool import Tool
from typing import List

class Workflow(BaseTool):

    name: str = ""
    description: str = ""
    tools: List[Tool] = []

    def _run(self, action_input: str) -> str:
        return "Need to run every tool in this workflow's tools list"

    async def _arun(self):
        raise NotImplementedError("Tool does not support async")