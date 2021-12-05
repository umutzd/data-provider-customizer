# data-provider-customizer

![Codacy grade](https://img.shields.io/codacy/grade/db7039142c874076a63b46851a92f998) ![Codacy coverage](https://img.shields.io/codacy/coverage/db7039142c874076a63b46851a92f998) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/data-provider-customizer@latest) 

With this tool, you can customize your [refine][refine] [data providers][data-provider] per resource. You can use different data providers for different resources, override one method for just one specific resource etc. 

If you have a non-standard API or some endpoint that refine should hit and your data provider methods don't work for that endpoint, you can use this tool to override a method for that resource. 

```ts
function customize(source: DataProvider, customizations?: CustomizationsType): DataProvider
```

`customize` function accepts a data provider and a customization configuration. Returns a data provider.

## Examples

### Specific override

```ts
export const dataProvider = customize(baseDataProvider, {
  posts: {
    getOne: () => {
      // specific getOne implementation ...
    }
  },
});

// baseDataProvider.getOne (not "posts")
dataProvider.getOne({ resource: "foo", ... }); 

// customized getOne ("posts" override)
dataProvider.getOne({ resource: "posts", ... });
```

Any invocation of any method of `dataProvider` triggers the same method in `baseDataProvider` except if the resource is "posts" for `getOne` method. If `getOne` method of `dataProvider` is invoked, for "posts" resource, the customized method runs.

### Different data provider for a resource

```ts
export const dataProvider = customize(baseDataProvider, {
  posts: supabaseDataProvider,
  categories: supabaseDataProvider,
});


// baseDataProvider.getOne (no overrides for "foo")
dataProvider.getOne({ resource: "foo", ... }); 

// supabaseDataProvider.getOne ("posts" override)
dataProvider.getOne({ resource: "posts", ... });

// supabaseDataProvider.getOne ("categories" override)
dataProvider.getOne({ resource: "categories", ... });
```

In this example, `posts` and `categories` resources use a different data provider: `supabaseDataProvider`. Any request that is invoked for "posts" and "categories" goes through `supabasedataProvider`. Rest goes for `baseDataProvider`.

### Advanced Customization

```ts
export const dataProvider = customize(baseDataProvider, {
  posts: supabaseDataProvider,
  categories: customize(supabaseDataProvider, {
    getMany: () => {
      // specific getMany implementation ...
    }
  }),
});

// baseDataProvider.getOne (no overrides)
dataProvider.getOne({ resource: "foo", ... }); 

// supabaseDataProvider.getOne (for "categories")
dataProvider.getOne({ resource: "categories", ... }); 

// specific getMany implementation (for "categories")
dataProvider.getMany({ resource: "categories", ... }); 
```

In this example all requests except for "posts" and "categories" are made through `baseDataProvider`. "posts" and "categories" resources use `supabaseDataProvider`. There is one exception: `getMany` method for "categories" resource goes through the user defined method.

## Run tests

Jest tests are set up to run with `npm test`.

[refine]: https://refine.dev/
[data-provider]: https://refine.dev/docs/api-references/providers/data-provider/