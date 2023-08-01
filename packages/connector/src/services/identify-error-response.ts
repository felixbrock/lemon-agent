interface ApiErrorResponse {
  stack: string;
}

export const isApiErrorResponse = (obj: unknown): obj is ApiErrorResponse => {
  if (!obj || typeof obj !== 'object') return false;

  const error: Partial<ApiErrorResponse> = obj;

  return (
    'stack' in error && typeof (error as { stack: unknown }).stack === 'string'
  );
};

interface RichApiErrorResponse extends ApiErrorResponse {
  response: { data: { error: { message: string } } };
}

export const isRichApiErrorResponse = (
  obj: ApiErrorResponse & unknown
): obj is RichApiErrorResponse => {
  const error: Partial<RichApiErrorResponse> = obj;

  return (
    'response' in error &&
    !!error.response &&
    typeof error.response === 'object' &&
    !!error.response.data &&
    typeof error.response.data === 'object' &&
    !!error.response.data.error &&
    typeof error.response.data.error === 'object' &&
    'message' in error.response.data.error &&
    typeof error.response.data.error.message === 'string'
  );
};

export const hasMessage = (error: unknown): error is { message: string } =>
  !!error && typeof error === 'object' && 'message' in error;
