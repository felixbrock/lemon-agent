import os
from typing import Dict, Tuple

def get_apis_from_env() -> Tuple[Dict[str, str], Dict[str, str]]:

    api_key_search_strings = ['_API_KEY', '_SECRET_KEY', '_SUBSCRIPTION_KEY', '_ACCESS_KEY']
    access_token_search_strings = ['_ACCESS_TOKEN', '_SECRET_TOKEN', '_WEBHOOK_URL']

    api_keys = {}
    access_tokens = {}

    for key, value in os.environ.items():
        for search_string in api_key_search_strings:
            if search_string in key:
                name = key.split(search_string)[0].lower().replace("_", "-")
                api_keys[name] = value
        
        for search_string in access_token_search_strings:
            if search_string in key:
                name = key.split(search_string)[0].lower().replace("_", "-")
                access_tokens[name] = value

    return api_keys, access_tokens