import * as React from "react"
import { Link, graphql } from "gatsby"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  
  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  }

  const navVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <motion.article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 itemProp="headline" className="glitch" data-text={post.frontmatter.title}>
            {post.frontmatter.title}
          </h1>
          <div className="terminal" style={{ marginBottom: 'var(--spacing-6)' }}>
            <div className="terminal-header">Article Metadata</div>
            <div style={{ fontFamily: 'var(--font-code)' }}>
              <span style={{ color: 'var(--color-accent)' }}>published:</span> {post.frontmatter.date}<br/>
              <span style={{ color: 'var(--color-accent)' }}>author:</span> {site.siteMetadata.author.name}<br/>
              <span style={{ color: 'var(--color-accent)' }}>category:</span> cybersecurity-law<br/>
              <span style={{ color: 'var(--color-accent)' }}>status:</span> <span style={{ color: 'var(--color-primary)' }}>ACTIVE</span>
            </div>
          </div>
        </motion.header>
        
        <motion.section
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          variants={contentVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          style={{
            lineHeight: 'var(--lineHeight-relaxed)',
            fontSize: 'var(--fontSize-1)'
          }}
        />
        
        <motion.hr
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        
        <motion.footer
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <Bio />
        </motion.footer>
      </motion.article>

      <motion.nav 
        className="blog-post-nav"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={previous.fields.slug} rel="prev">
                  <div className="terminal" style={{ textAlign: 'left' }}>
                    <span style={{ color: 'var(--color-accent)' }}>←</span> Previous
                    <br/>
                    <span style={{ color: 'var(--color-primary)' }}>
                      {previous.frontmatter.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </li>
          <li>
            {next && (
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={next.fields.slug} rel="next">
                  <div className="terminal" style={{ textAlign: 'right' }}>
                    Next <span style={{ color: 'var(--color-accent)' }}>→</span>
                    <br/>
                    <span style={{ color: 'var(--color-primary)' }}>
                      {next.frontmatter.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </li>
        </ul>
      </motion.nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

