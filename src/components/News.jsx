import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://i.ibb.co/Z11pcGG/cryptocurrency.png'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const numberOfNews = simplified ? 10 : 100;
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: numberOfNews })
  const { data: dataCoins } = useGetCryptosQuery(100);

  if(!cryptoNews?.articles) return 'Loading...';
  
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {dataCoins?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.slice(0, numberOfNews).map((news, i) => (
        <Col xs={24} sm={12} lg={10} xxl={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.title}</Title>
              </div>
              <p>
                {news.publisher.name} <br />
                {news.published_date.substring(0,10)}
              </p>
              <div className="provider-container">
                <Text>{moment(news.published_date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News