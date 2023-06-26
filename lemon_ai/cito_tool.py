from langchain.tools import BaseTool
from pydantic import Field
from lemon_ai.cito_api_wrapper import CitoAPIWrapper
from typing import Dict, Optional
from loguru._logger import Logger

class CitoTool(BaseTool):

    api_wrapper: CitoAPIWrapper = Field(default_factory=CitoAPIWrapper)
    id: str = ""
    name: str = ""
    description: str = ""
    params: Optional[Dict] = None
    api_key: Optional[str] = None
    access_token: Optional[str] = None
    logger: Logger
    session_id: str

    def _run(self, action_input: str) -> Dict:
        
        self.logger.bind(session_id=self.session_id, operation_name=self.name).info("")
        return self.api_wrapper.run(self.id, action_input, self.params, self.api_key, self.access_token)

    async def _arun(self):
        raise NotImplementedError("Cito Tool does not support async")