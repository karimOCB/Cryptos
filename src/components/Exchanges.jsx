import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd'


import { useGetExchangesQuery } from '../services/exchangesApi';

const Exchanges = () => {
  const { data } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;
  console.log(data, exchanges);

  return (
    <>
      <List 
          itemLayout='horizontal'
          dataSource={exchanges}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.website} rel='noreferrer' target='_blank'>{item.name}</a>}
                description={item.slug}
             />
            </List.Item>
          )}
      />
    </>
  )
}

export default Exchanges