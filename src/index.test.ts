import { DataProvider as RefineDataProvider } from '@pankod/refine';
import { DataProvider } from './DataProvider';
import { customize } from '../src';

export const posts = [
  {
    id: '1',
    title: 'Necessitatibus',
  },
  {
    id: '2',
    title: 'Recusandae',
  },
];

// const testResource = "posts";
const testApiUrl = 'https://example.org';

const mockedDataProviderBase: RefineDataProvider = {
  create: jest.fn(() => Promise.resolve({ data: posts[0] })),
  createMany: jest.fn(() => Promise.resolve({ data: posts })),
  deleteOne: jest.fn(() => Promise.resolve({ data: posts[0] })),
  deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
  getList: jest.fn(() => Promise.resolve({ data: posts, total: 2 })),
  getMany: jest.fn(() => Promise.resolve({ data: posts })),
  getOne: jest.fn(() => Promise.resolve({ data: posts[0] })),
  update: jest.fn(() => Promise.resolve({ data: posts[0] })),
  updateMany: jest.fn(() => Promise.resolve({ data: [] })),
  getApiUrl: jest.fn(() => testApiUrl),
  custom: jest.fn(() => Promise.resolve({ data: [...posts] })),
} as RefineDataProvider;

const callAllMethods = (dataProvider: DataProvider, resourceName: string) => {
  dataProvider.create({ resource: resourceName, variables: posts[0] });
  dataProvider.createMany({ resource: resourceName, variables: posts });
  dataProvider.deleteOne({ resource: resourceName, id: posts[0].id });
  dataProvider.deleteMany({ resource: resourceName, ids: [posts[0].id] });
  dataProvider.getList({ resource: resourceName });
  dataProvider.getMany({ resource: resourceName, ids: [posts[0].id] });
  dataProvider.getOne({ resource: resourceName, id: posts[0].id });
  dataProvider.update({
    resource: resourceName,
    id: posts[0].id,
    variables: posts[1],
  });
  dataProvider.updateMany({
    resource: resourceName,
    ids: [posts[0].id],
    variables: posts[1],
  });
  dataProvider.getApiUrl();
  dataProvider.custom?.({ url: testApiUrl, method: 'get' });
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('extendDataProvider', () => {
  it('does not interrupt any calls if no overrides are configured', () => {
    const dataProvider = customize(mockedDataProviderBase);

    callAllMethods(dataProvider, 'posts');

    expect(mockedDataProviderBase.create).toHaveBeenCalled();
    expect(mockedDataProviderBase.createMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getList).toHaveBeenCalled();
    expect(mockedDataProviderBase.getMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.update).toHaveBeenCalled();
    expect(mockedDataProviderBase.updateMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getApiUrl).toHaveBeenCalled();
    expect(mockedDataProviderBase.custom).toHaveBeenCalled();
  });

  it('calls customized methods for customized resources if overrides are configured', () => {
    const customResourcePostsOverrides: Partial<DataProvider> = {
      create: jest.fn(() => Promise.resolve({ data: posts[0] })),
      deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
    };

    const dataProvider = customize(mockedDataProviderBase, {
      posts: customResourcePostsOverrides,
    });

    callAllMethods(dataProvider, 'posts');

    expect(mockedDataProviderBase.create).not.toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteMany).not.toHaveBeenCalled();

    expect(customResourcePostsOverrides.create).toHaveBeenCalled();
    expect(customResourcePostsOverrides.deleteMany).toHaveBeenCalled();

    expect(mockedDataProviderBase.createMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.getList).toHaveBeenCalled();
    expect(mockedDataProviderBase.getMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.update).toHaveBeenCalled();
    expect(mockedDataProviderBase.updateMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getApiUrl).toHaveBeenCalled();
    expect(mockedDataProviderBase.custom).toHaveBeenCalled();
  });

  it('calls base methods for not customized resources', () => {
    const customResourcePostsOverrides: Partial<DataProvider> = {
      create: jest.fn(() => Promise.resolve({ data: posts[0] })),
      deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
    };

    const dataProvider = customize(mockedDataProviderBase, {
      posts: customResourcePostsOverrides,
    });

    callAllMethods(dataProvider, 'categories');

    expect(customResourcePostsOverrides.create).not.toHaveBeenCalled();
    expect(customResourcePostsOverrides.deleteMany).not.toHaveBeenCalled();

    expect(mockedDataProviderBase.create).toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.createMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.deleteOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.getList).toHaveBeenCalled();
    expect(mockedDataProviderBase.getMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getOne).toHaveBeenCalled();
    expect(mockedDataProviderBase.update).toHaveBeenCalled();
    expect(mockedDataProviderBase.updateMany).toHaveBeenCalled();
    expect(mockedDataProviderBase.getApiUrl).toHaveBeenCalled();
    expect(mockedDataProviderBase.custom).toHaveBeenCalled();
  });
});
