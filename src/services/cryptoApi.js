import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
require('dotenv').config();

const cryptoApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinuuid) => createRequest(`/coin/${coinuuid}`)
    }),
    getCryptoHistory: builder.query({
      query: ({coinuuid, timePeriod}) => createRequest(`/coin/${coinuuid}/history?timePeriod=${timePeriod}`)
    })
  }) 
});

export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
} = cryptoApi;

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'X-RapidAPI-Key': '029486e6eamsh1f97eafb294ca96p12fefajsn0d7ad892effc',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };