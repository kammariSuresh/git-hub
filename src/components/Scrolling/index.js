import {Component} from 'react'

import './index.css'

class Scrolling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      page: 1,
    }
  }

  componentDidMount() {
    this.fetchGitHubRepos()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchGitHubRepos = () => {
    const {page, repos} = this.state
    const apiUrl = `https://api.github.com/search/repositories?q=created:>2022-01-01&sort=stars&order=desc&page=${page}`

    fetch(apiUrl)
      .then(response => response.json())
      .then(data =>
        this.setState({repos: [...repos, ...data.items], page: page + 1}),
      )
      .catch(error => console.error('Error fetching data:', error))
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.fetchGitHubRepos()
    }
  }

  render() {
    const {repos} = this.state

    return (
      <div className="scrolling">
        <h1>Most Starred Github Repos</h1>
        <ul className="scroll-list">
          {repos.map(repo => (
            <li key={repo.id} className="scroll-item">
              {repo.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Scrolling
