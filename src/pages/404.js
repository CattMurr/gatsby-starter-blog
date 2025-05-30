import * as React from "react"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const glitchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  const terminalVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.3 }
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <motion.div
        style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}
        variants={glitchVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="glitch" 
          data-text="404"
          style={{ 
            fontSize: '8rem', 
            margin: '0',
            color: 'var(--color-danger)',
            textShadow: '0 0 20px var(--color-danger)'
          }}
          animate={{ 
            textShadow: [
              '0 0 20px var(--color-danger)',
              '0 0 40px var(--color-danger), 0 0 60px var(--color-danger)',
              '0 0 20px var(--color-danger)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>
        
        <motion.h2
          style={{ 
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            margin: 'var(--spacing-4) 0'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Access Denied
        </motion.h2>
      </motion.div>

      <motion.div
        variants={terminalVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <div className="terminal">
          <div className="terminal-header">System Error Log</div>
          <div style={{ fontFamily: 'var(--font-code)', lineHeight: '1.6' }}>
            <span style={{ color: 'var(--color-danger)' }}>ERROR:</span> Page not found<br/>
            <span style={{ color: 'var(--color-accent)' }}>PATH:</span> {location.pathname}<br/>
            <span style={{ color: 'var(--color-accent)' }}>STATUS:</span> 404 - Resource not found<br/>
            <span style={{ color: 'var(--color-accent)' }}>TIME:</span> {new Date().toISOString()}<br/>
            <br/>
            <span style={{ color: 'var(--color-warning)' }}>SUGGESTION:</span> Try one of these commands:<br/>
            <span style={{ color: 'var(--color-text-muted)' }}>$ cd /home</span><br/>
            <span style={{ color: 'var(--color-text-muted)' }}>$ ls -la /blog</span><br/>
            <span style={{ color: 'var(--color-text-muted)' }}>$ grep -r "cybersecurity" /articles</span><br/>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ textAlign: 'center', marginTop: 'var(--spacing-8)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.a
          href="/"
          style={{
            display: 'inline-block',
            padding: 'var(--spacing-3) var(--spacing-6)',
            background: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-primary)',
            borderRadius: '8px',
            color: 'var(--color-primary)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 'bold',
            transition: 'var(--transition-normal)'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px var(--color-primary)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg-primary)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Base
        </motion.a>
      </motion.div>

      <motion.div
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20rem',
          color: 'var(--color-border)',
          zIndex: -1,
          fontFamily: 'var(--font-code)',
          opacity: 0.1
        }}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        404
      </motion.div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

