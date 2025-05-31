import * as React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import MatrixRain from "./matrix-rain"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 }
    }
  }

  if (isRootPath) {
    header = (
      <motion.h1 
        className="main-heading"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to="/">{title}</Link>
      </motion.h1>
    )
  } else {
    header = (
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <MatrixRain />
      <motion.header 
        className="global-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {header}
      </motion.header>
      <motion.main
        variants={mainVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="terminal">
          <div className="terminal-header">CyberLaw Chronicles Terminal</div>
          © {new Date().getFullYear()} • Exploring the intersection of technology and law
          {` `}
          <Link to="/" style={{ color: 'var(--color-accent)' }}>
            [HOME]
          </Link>
        </div>
      </motion.footer>
    </div>
  )
}

export default Layout
