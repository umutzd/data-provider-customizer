import { DataProvider } from '@pankod/refine';
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

const testResource = 'posts';
const testApiUrl = 'https://example.org';

const mockedDataProviderBase: DataProvider = {
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
} as DataProvider;

const callAllMethods = (dataProvider: DataProvider) => {
  dataProvider.create({ resource: testResource, variables: posts[0] });
  dataProvider.createMany({ resource: testResource, variables: posts });
  dataProvider.deleteOne({ resource: testResource, id: posts[0].id });
  dataProvider.deleteMany({ resource: testResource, ids: [posts[0].id] });
  dataProvider.getList({ resource: testResource });
  dataProvider.getMany({ resource: testResource, ids: [posts[0].id] });
  dataProvider.getOne({ resource: testResource, id: posts[0].id });
  dataProvider.update({
    resource: testResource,
    id: posts[0].id,
    variables: posts[1],
  });
  dataProvider.updateMany({
    resource: testResource,
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

    callAllMethods(dataProvider);

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

  // it('calls customized methods for customized resources if overrides are configured', () => {
  //   const customResourceOverrides: Partial<DataProvider> = {
  //     create: () => Promise.resolve({ data: posts[0] }),
  //     deleteMany: () => Promise.resolve({ data: [] }),
  //   } as Partial<DataProvider>;

  //   const dataProvider = customize(dummyBaseDataProvider);
  // });
});
