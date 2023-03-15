import Head from 'next/head'
import React from 'react'
import { Layout } from '../components'
import './styles/index.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          Demo Site
        </title>
        <link rel="icon" href={require('../public/images/favicon.png')} />

      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}

export default MyApp