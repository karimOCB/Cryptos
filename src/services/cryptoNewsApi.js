import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
}

const baseUrl = 'https://news-api14.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNews',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  }) 
});

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;