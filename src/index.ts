import { DataProvider } from "@pankod/refine";

const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

type DataProviderKey = keyof DataProvider;
type DataProviderMethod<T extends DataProviderKey> = Required<DataProvider>[T];
type DataProviderMethodParameters<T extends DataProviderKey> = Parameters<
  DataProviderMethod<T>
>;

type CustomizationsType = Record<string, Partial<Omit<DataProvider, "custom">>>;

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
      if(key === "custom") {
        return target[key];
      }

      return function customizerHandler(
        ...params: A
      ): R {
        const methodOnBase = target[key];

        if (
          typeof methodOnBase !== "function"
        ) {
          throw new Error(
            `"${key}" does not exist as a method.`,
          );
        }

        const targetResponse: R = (methodOnBase as any)(...params);

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
