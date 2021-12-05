import React from 'react';
import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from '@pankod/refine';

import { IUser } from 'interfaces';

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>First Name</Title>
      <Text>{record?.firstName}</Text>

      <Title level={5}>Last Name</Title>
      <Text>{record?.lastName}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>
    </Show>
  );
};
