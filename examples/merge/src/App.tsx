import React from 'react';
import { Refine } from '@pankod/refine';
import routerProvider from '@pankod/refine-react-router';

import { dataProvider, authProvider } from './utility';
import { Login } from 'pages/login';
import { UserList, UserShow } from 'pages/users';
import { PostList, PostCreate, PostEdit, PostShow } from 'pages/posts';

import '@pankod/refine/dist/styles.min.css';

function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
      LoginPage={Login}
      resources={[
        {
          name: 'users',
          list: UserList,
          show: UserShow,
        },
        {
          name: 'posts',
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
    ></Refine>
  );
}

export default App;
