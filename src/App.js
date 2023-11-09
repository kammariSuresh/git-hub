// App.js

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import GitHubApp from './components/GithubApp'
import RepoDetails from './components/RepoDetails'
import Scrolling from './components/Scrolling'
import GithubRepos from './components/GithubRepos'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={GitHubApp} />
      <Route path="/repo/:owner/:repo" component={RepoDetails} />
      <Route path="/scrolling" component={Scrolling} />
      <Route path="/github-repos" component={GithubRepos} />
    </Switch>
  </Router>
)

export default App
