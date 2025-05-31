import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // The author data (if it exists)
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const bioVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  }

  return (
    <motion.div 
      className="bio"
      ref={ref}
      variants={bioVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        variants={avatarVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.jpg"
          width={60}
          height={60}
          quality={95}
          alt="Profile picture"
        />
      </motion.div>
      {author?.name && (
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <strong className="glitch" data-text={author.name}>
            {author.name}
          </strong>
          {` `}
          <span style={{ color: 'var(--color-text-muted)' }}>
            {author?.summary || null}
          </span>
          {` `}
          {social?.twitter && (
            <a 
              href={`https://twitter.com/${social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)' }}
            >
              @{social.twitter}
            </a>
          )}
        </motion.p>
      )}
    </motion.div>
  )
}

export default Bio

