import Link from 'next/link'
import client from '../lib/apollo-client'
import Name from '@/components/name'
import Head from 'next/head'
import Container from '@/components/container'
import { getNameQuery } from '@/queries/name.query'

export default function Home({ name }: { name: string }) {
  return (
    <>
      <Head>
        <title>Demo Home</title>
      </Head>
      <Container>
        <h1 data-testid="welcome-text" className="mb-3">
          Welcome, <Name name={name} />
        </h1>
        <nav className="nav">
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/users">
            Users
          </Link>
        </nav>
      </Container>
    </>
  )
}
export async function getServerSideProps() {
  const { data } = await client.query({
    query: getNameQuery,
  })

  return {
    props: {
      name: data.name,
    },
  }
}

