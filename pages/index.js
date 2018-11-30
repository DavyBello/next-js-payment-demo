import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import GlobalStyle from '../components/GlobalStyle'
import Head from '../components/head'
import Nav from '../components/nav'
import Card from '../components/Card'
import Row from '../components/Row'

const Hero = styled.div`
  width: 100%;
  color: #333;
`
const Description = styled.p`
  text-align: center;
`
const Title = styled.h1`
  margin: 0;
  width: 100%;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
`

const links = [{
  title: 'Getting Started',
  body: 'Learn more about Next on Github and in their examples',
  url: 'https://github.com/zeit/next.js#getting-started'
}, {
  title: 'Examples',
  body: () => <>Find other example boilerplates on the <code>create-next-app</code> site</>,
  url: 'https://open.segment.com/create-next-app'
}, {
  title: 'Create Next App',
  body: 'Was this tool helpful? Let us know how we can improve it',
  url: 'https://open.segment.com/create-next-app'
}]

const Home = () => (
  <>
    <GlobalStyle />
    <Head title="Home" />
    <Nav />

    <Hero>
      <Title>Welcome to Next!</Title>
      <Description>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </Description>
      
      <Row>
        {links.map((link, index) => <Link href={link.url} key={index}>
          <Card>
            <Card.Header>{link.title} &rarr;</Card.Header>
            <Card.Body>{link.body}</Card.Body>
          </Card>
        </Link>)}
      </Row>
    </Hero>
  </>
)

export default Home
