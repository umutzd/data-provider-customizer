import createSimpleRestDataProvider from '@pankod/refine-simple-rest';
import {
  createClient,
  dataProvider as createSupabaseDataProvider,
} from '@pankod/refine-supabase';
import { customize } from 'data-provider-customizer';

const REST_API_RUL = '<REST-URL>';

const SUPABASE_URL = '<SUPABASE-URL>';
const SUPABASE_KEY = '<SUPABASE-KEY>';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const baseDataProvider = createSimpleRestDataProvider(REST_API_RUL);
const supabaseDataProvider = createSupabaseDataProvider(supabaseClient);

export const dataProvider = customize(baseDataProvider, {
  posts: supabaseDataProvider,
  categories: supabaseDataProvider,
  files: supabaseDataProvider,
});
