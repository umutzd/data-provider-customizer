import { DataProvider } from "@pankod/refine";

const customizableDataProviderKeys = [
  "getList",
  "getMany",
  "getOne",
  "create",
  "createMany",
  "update",
  "updateMany",
  "deleteOne",
  "deleteMany",
] as const;

type DataProviderKey = keyof DataProvider;
type CustomizableDataProviderKey = typeof customizableDataProviderKeys[number];
type DataProviderMethod<T extends DataProviderKey> = Required<DataProvider>[T];
type DataProviderMethodParameters<T extends DataProviderKey> = Parameters<
  DataProviderMethod<T>
>;
type DataProviderCustomizableMethodParameters<T extends CustomizableDataProviderKey> = Parameters<
  DataProviderMethod<T>
>;

type CustomizationsType = Record<string, Partial<Omit<DataProvider, "custom">>>;

function keyIsCustomizable(key: any): key is CustomizableDataProviderKey {
  return customizableDataProviderKeys.includes(key);
}

const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T =>
  k in obj;

export function customize(
  source: DataProvider,
  customizations?: CustomizationsType,
): DataProvider {
  const proxiedSource = new Proxy(source, {
    get: function proxyGetHandler<
      K extends DataProviderKey,
      R extends ReturnType<DataProviderMethod<K>>,
    >(
      target: DataProvider,
      key: K,
    ) {
      if (!keyIsCustomizable(key)) {
        return target[key];
      }

      return function customizerHandler<
      M extends DataProviderCustomizableMethodParameters<typeof key>>(
        ...params: M
      ): R {
        const firstParam = params?.[0];

        if(!firstParam) {
          throw new Error("Please pass arguments to data provider method");
        }

        const resource = firstParam.resource;

        if (typeof customizations?.[resource] !== "undefined") {

        }

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
