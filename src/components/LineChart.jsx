import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTitle, Tooltip, Legend);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  console.log(coinHistory)

  for(let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const reversedCoinPrice = coinPrice.reverse();
  const reversedCoinTimestamp = coinTimestamp.reverse();

  console.log('Coin History', coinHistory)
  console.log('Coin Timestamp', coinTimestamp)
  console.log('Coin Price', coinPrice)

  const data = {
    labels: reversedCoinTimestamp,
    datasets: [
      {
        label: 'Price in USD', 
        data: reversedCoinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      }
    }
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'> {coinName} Price Chart </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart