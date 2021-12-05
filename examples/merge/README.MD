# data-provider-customizer - Merged Data Providers Example

This project is an example of merging two data providers into one with [data-provider-customizer 💖🚀][dpc]. 

You'll see two resources in the menu: "Users" and "Posts". "Users" sources it's data from [@pankod/refine-simple-rest][simple-rest], "Posts" resource is fetched from [@pankod/refine-supabase][supabase-example]. 

Also, since managing posts requires the application to make requests at a "categories" resource on supabase, `categories` resource is also set to use `supabase`.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## License

MIT

[dpc]: https://github.com/miyavsu-limited/data-provider-customizer
[supabase-example]: https://refine.dev/docs/examples/data-provider/supabase/
[simple-rest]: https://github.com/pankod/refine/tree/master/packages/simple-rest