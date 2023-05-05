import PropTypes from 'prop-types'
import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const siteName = 'Pushlinks'

function Layout({ children, title, description, hideHeader }) {
  return (
    <>
      <Head>
        <title>{title ? `${title}—${siteName}` : siteName}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {!hideHeader ? <Navbar /> : ''}

      <div>{children}</div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.element,
  hideHeader: PropTypes.bool,
}

Layout.defaultProps = {
  description: 'Making sustainability accessible',
  hideHeader: false,
}

export default Layout
