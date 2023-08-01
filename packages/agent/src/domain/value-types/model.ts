export const modelTypes = ['gpt-3.5-turbo'] as const;
export type ModelType = (typeof modelTypes)[number];

export const parseModelType = (typeToParse: unknown): ModelType => {
  const identifiedElement = modelTypes.find(
    (element) => element === typeToParse
  );
  if (identifiedElement) return identifiedElement;
  throw new Error('Provision of invalid type');
};
