from langchain.tools import BaseTool
from lemon_ai.cito_tool import CitoTool
from typing import List
from loguru._logger import Logger

class CitoWorkflow(BaseTool):

    name: str = ""
    description: str = ""
    tools: List[CitoTool] = []
    logger: Logger
    session_id: str

    def _run(self, action_input: str) -> str:
        
        self.logger.bind(session_id=self.session_id, operation_name=self.name).info("WORKFLOW STARTED")
        return "Need to run every tool in this workflow's tools list"

    async def _arun(self):
        raise NotImplementedError("Cito Tool does not support async")