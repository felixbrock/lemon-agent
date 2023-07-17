import json
import requests
from requests import Request, Session
from typing import List, Dict, Optional
from langchain.llms.base import BaseLLM

class APIWrapper():

    api_base_url: str = "http://localhost:1313/api/v0/"
    _llm: BaseLLM
    _task: str

    def __init__(self, llm: BaseLLM, task: str):
        self._llm = llm
        self._task = task

    def _get_session(self) -> Session:
        
        session = requests.session()
        session.headers.update(
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        )

        return session

    def get_tool_list(self) -> List[Dict]:

        session = self._get_session()
        url = f"{self.api_base_url}tools"
        response = session.get(url)
        response.raise_for_status()

        return response.json()
    
    def _get_action_request(
        self, id: str, action_input: str, params: Optional[Dict]
    ) -> Request:
        
        data = params if params else {}
        if action_input[-1] == ":":
            action_input = action_input + "\"\""
        json_obj = json.loads(action_input.replace("None", "\"\""))

        data.update(json_obj)

        return Request(
            method="POST",
            url=f"{self.api_base_url}tool/{id}/execute",
            json=data,
        )

    def run(self, id: str, action_input: str, params: Optional[Dict], api_key: Optional[str], access_token: Optional[str]):
        
        session = self._get_session()
        request = self._get_action_request(id, action_input, params)

        if api_key:
            request.json["authToken"] = api_key
        elif access_token:
            request.json["authToken"] = access_token

        response = session.send(session.prepare_request(request))
        response.raise_for_status()

        json_list = response.json()

        if json_list:
            while isinstance(json_list, list):
                json_list = json_list[0]
            
            keys = list(json_list.keys())

            prompt = f"Based on the following task: '{self._task}', tell me which of the following keys: {keys} would be necessary to complete the task. Be as MINIMAL as possible. Focus on the entire task and specifically what values it is asking for. If the task mentions a specific key, this key MUST be in your final list. If the task does not specify what it is asking for, return the entire list of keys. Do not include any keys that are not in the given list. Your answer should be a valid LIST of keys (the minimum should be a list of 1 key) from the given list that would be necessary to complete the task."
            answer = self._llm.generate(prompts=[prompt]).generations[0][0].text
            list_string = answer.strip()

            key_list = eval(list_string)

            if isinstance(response.json(), list):
                json_list = response.json()

                flattened_list = []

                if isinstance(json_list[0], list):
                    for elem in json_list:
                        flattened_list.extend(elem)
                else:
                    flattened_list = json_list

                reduced_response = []
                for i in range(0, len(flattened_list)):
                    reduced_obj = {}
                    for key in key_list:
                        reduced_obj[key] = flattened_list[i][key]
                    
                    reduced_response.append(reduced_obj)
            else:
                reduced_response = {}
                for key in key_list:
                    reduced_response[key] = json_list[key]

            return reduced_response
