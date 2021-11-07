import { DataProvider } from "@pankod/refine";

const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

type DataProviderKey = Exclude<keyof Required<DataProvider>, "custom">;
type DataProviderMethod<T extends DataProviderKey> = DataProvider[T];
type DataProviderMethodParameters<T extends DataProviderKey> = Parameters<
  DataProviderMethod<T>
>;

type CustomizationsType = Record<string, Partial<DataProvider>>;

export function customize(
  source: DataProvider,
  // customizations?: CustomizationsType,
): DataProvider {
  // const customizedMethods: Record<string, CustomizationsType> = {};

  const proxiedSource = new Proxy(source, {
    get: function proxyGetHandler<
      T extends DataProviderKey,
      A extends DataProviderMethodParameters<T>,
      R extends ReturnType<DataProviderMethod<T>>,
    >(
      target: DataProvider,
      key: T,
    ) {
      return function customHandler(
        ...params: A
      ): R {
        const method: DataProviderMethod<T> = target[key];

        if (
          typeof method !== "function"
        ) {
          throw new Error(
            `"${key}" does not exist as a method.`,
          );
        }

        const targetResponse: R = (method as any)(...params);

        if (!targetResponse) {
          throw new Error(
            `${key} method of base data provider does not exist or did not return any value`,
          );
        }

        return targetResponse;
      };
    },
  });

  return proxiedSource;
}
