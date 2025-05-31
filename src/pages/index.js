import * as React from "react"
import { Link, graphql } from "gatsby"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal">
            <div className="terminal-header">System Status</div>
            <p style={{ color: 'var(--color-warning)' }}>
              No blog posts found. Initialize content database...
            </p>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Add markdown posts to "content/blog" to get started.
            </p>
          </div>
        </motion.div>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-16)',
          padding: 'var(--spacing-8)',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px'
        }}
      >
        <h2 className="glitch" data-text="Welcome to the Matrix">
          Welcome to the Matrix
        </h2>
        <p style={{ 
          fontSize: 'var(--fontSize-2)', 
          color: 'var(--color-text-light)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Dive deep into the world of cybersecurity law, ethical hacking, and digital rights. 
          Where code meets justice, and algorithms face accountability.
        </p>
        <div className="terminal" style={{ marginTop: 'var(--spacing-6)', textAlign: 'left' }}>
          <div className="terminal-header">Access Granted</div>
          <div style={{ fontFamily: 'var(--font-code)' }}>
            <span style={{ color: 'var(--color-accent)' }}>user@cyberlaw:~$</span> ls -la /blog/posts<br/>
            <span style={{ color: 'var(--color-text-muted)' }}>
              total {posts.length} articles found
            </span><br/>
            <span style={{ color: 'var(--color-primary)' }}>
              drwxr-xr-x cybersecurity law ethics hacking
            </span>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts */}
      <motion.ol 
        style={{ listStyle: `none` }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post, index) => {
          const title = post.frontmatter.title || post.fields.slug
          
          return (
            <PostItem 
              key={post.fields.slug}
              post={post}
              title={title}
              index={index}
            />
          )
        })}
      </motion.ol>
    </Layout>
  )
}

const PostItem = ({ post, title, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const itemVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.li
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small style={{ 
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-code)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {post.frontmatter.date}
          </small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
        <div className="terminal" style={{ marginTop: 'var(--spacing-4)', fontSize: '0.9em' }}>
          <span style={{ color: 'var(--color-accent)' }}>$</span> cat {post.fields.slug.replace(/\//g, '')}.md | wc -w
          <br/>
          <span style={{ color: 'var(--color-text-muted)' }}>
            ~{Math.ceil(post.excerpt.split(' ').length * 2)} words • {Math.ceil(post.excerpt.split(' ').length * 2 / 200)} min read
          </span>
        </div>
      </article>
    </motion.li>
  )
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`

