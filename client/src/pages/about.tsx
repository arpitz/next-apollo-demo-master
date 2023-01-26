import Link from 'next/link'
import Head from 'next/head'
import Container from '@/components/container'

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Container>
        <h1 className="mb-3">About Page</h1>
        <Link href="/">Go Back</Link>
      </Container>
    </>
  )
}
