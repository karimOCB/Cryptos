import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
require('dotenv').config();

const exchangesApiHeaders = {
  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  'x-rapidapi-host': 'crypto-market-prices.p.rapidapi.com'
}

const baseUrl = 'https://crypto-market-prices.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: exchangesApiHeaders})

export const exchangesApi = createApi({
  reducerPath: 'exchangesApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`)
    }),
  }) 
});

export const {
   useGetExchangesQuery
} = exchangesApi;