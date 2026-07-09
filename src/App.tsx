import { useEffect } from 'react'
import { Router, Route, Switch, useLocation } from 'wouter'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Companies from './pages/Companies'
import Investors from './pages/Investors'
import BusinessOwners from './pages/BusinessOwners'
import Intermediaries from './pages/Intermediaries'
import Entrepreneurs from './pages/Entrepreneurs'
import TalkToAnExpert from './pages/TalkToAnExpert'
import NotFound from './pages/NotFound'

// GitHub Pages project site base. Matches vite `base` and the 404.html redirect.
const BASE = '/kingsway-wireframes'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return null
}

export default function App() {
  return (
    <Router base={BASE}>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/companies" component={Companies} />
          <Route path="/investors" component={Investors} />
          <Route path="/business-owners" component={BusinessOwners} />
          <Route path="/intermediaries" component={Intermediaries} />
          <Route path="/entrepreneurs" component={Entrepreneurs} />
          <Route path="/talk-to-an-expert" component={TalkToAnExpert} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}
