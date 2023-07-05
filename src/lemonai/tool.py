from langchain.tools import BaseTool
from pydantic import Field
from lemonai.api_wrapper import APIWrapper
from typing import Dict, Optional
from loguru._logger import Logger

class Tool(BaseTool):

    api_wrapper: APIWrapper = Field(default_factory=APIWrapper)
    id: str = ""
    name: str = ""
    description: str = ""
    params: Optional[Dict] = None
    api_key: Optional[str] = None
    access_token: Optional[str] = None
    logger: Logger
    session_id: str

    def _run(self, action_input: str) -> Dict:
        
        self.logger.bind(session_id=self.session_id, operation_name=self.id).info("")
        return self.api_wrapper.run(self.id, action_input, self.params, self.api_key, self.access_token)

    async def _arun(self):
        raise NotImplementedError(" Tool does not support async")