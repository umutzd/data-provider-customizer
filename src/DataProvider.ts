import {
  BaseRecord,
  CreateManyResponse,
  CreateResponse,
  CrudFilter,
  CrudFilters,
  CrudSorting,
  CustomResponse,
  DeleteManyResponse,
  DeleteOneResponse,
  GetListResponse,
  GetManyResponse,
  GetOneResponse,
  MetaDataQuery,
  Pagination,
  UpdateManyResponse,
  UpdateResponse,
} from '@pankod/refine/dist/interfaces';

export interface DataProvider {
  getList: (params: {
    resource: string;
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
    metaData?: MetaDataQuery;
  }) => Promise<GetListResponse<BaseRecord>>;
  getMany: (params: {
    resource: string;
    ids: string[];
    metaData?: MetaDataQuery;
  }) => Promise<GetManyResponse<BaseRecord>>;
  getOne: (params: {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
  }) => Promise<GetOneResponse<BaseRecord>>;
  create: <TVariables = {}>(params: {
    resource: string;
    variables: TVariables;
    metaData?: MetaDataQuery;
  }) => Promise<CreateResponse<BaseRecord>>;
  createMany: <TVariables = {}>(params: {
    resource: string;
    variables: TVariables[];
    metaData?: MetaDataQuery;
  }) => Promise<CreateManyResponse<BaseRecord>>;
  update: <TVariables = {}>(params: {
    resource: string;
    id: string;
    variables: TVariables;
    metaData?: MetaDataQuery;
  }) => Promise<UpdateResponse<BaseRecord>>;
  updateMany: <TVariables = {}>(params: {
    resource: string;
    ids: string[];
    variables: TVariables;
    metaData?: MetaDataQuery;
  }) => Promise<UpdateManyResponse<BaseRecord>>;
  deleteOne: (params: {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
  }) => Promise<DeleteOneResponse<BaseRecord>>;
  deleteMany: (params: {
    resource: string;
    ids: string[];
    metaData?: MetaDataQuery;
  }) => Promise<DeleteManyResponse<BaseRecord>>;
  getApiUrl: () => string;
  custom?: (params: {
    url: string;
    method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';
    sort?: CrudSorting;
    filters?: CrudFilter[];
    payload?: {};
    query?: {};
    headers?: {};
    metaData?: MetaDataQuery;
  }) => Promise<CustomResponse<BaseRecord>>;
}
