export default class Result<T> {
  #error?: string;

  #success: boolean;

  #value?: T;

  private constructor(success: boolean, value?: T, error?: string) {
    this.#error = error;
    this.#success = success;
    this.#value = value;
  }

  get error(): string | undefined {
    return this.#error;
  }

  get success(): boolean {
    return this.#success;
  }

  get value(): T | undefined {
    if (!this.#success)
      throw new Error(
        `An error occurred. Cannot get the value of an error result: ${
          this.#error || 'unknown error'
        }`
      );
    return this.#value;
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value, undefined);
  }

  static fail<U>(error: string): Result<U> {
    return new Result<U>(false, undefined, error);
  }
}
