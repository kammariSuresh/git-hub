import {Component} from 'react'

import './index.css'

class GitHubApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      addedRepos: [],
      page: 1,
    }
    this.isLoading = false // Track if data is being loaded
  }

  componentDidMount() {
    this.fetchGitHubRepos()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchGitHubRepos = async () => {
    if (this.isLoading) return // If already loading, skip

    const {page, repos} = this.state
    const apiUrl = `https://api.github.com/search/repositories?q=created:>2022-01-01&sort=stars&order=desc&page=${page}`

    this.isLoading = true // Set loading state to true

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({repos: [...repos, ...data.items], page: page + 1})
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      this.isLoading = false // Reset loading state
    }
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.fetchGitHubRepos()
    }
  }

  handleAddRepo = repo => {
    const {addedRepos} = this.state
    if (!addedRepos.some(r => r.id === repo.id)) {
      this.setState({addedRepos: [...addedRepos, repo]})
    }
  }

  handleRemoveRepo = repo => {
    const {addedRepos} = this.state
    const updatedRepos = addedRepos.filter(r => r.id !== repo.id)
    this.setState({addedRepos: updatedRepos})
  }

  render() {
    const {repos, addedRepos} = this.state

    return (
      <div className="github-app">
        <h1>Most Starred GitHub Repositories (Last 30 Days)</h1>
        <ul className="repo-list">
          {repos.map(repo => (
            <li key={repo.id} className="repo-item">
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s Avatar`}
                className="repo-image"
              />
              <div>
                <a href={`/repo/${repo.owner.login}/${repo.name}`}>
                  {repo.name}
                </a>
                <div>
                  <p>{repo.description}</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => this.handleAddRepo(repo)}
                  >
                    Add Repo
                  </button>
                  <button
                    type="button"
                    onClick={() => this.handleRemoveRepo(repo)}
                  >
                    Remove Repo
                  </button>

                  <p>{`last published by ${repo.name}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="added-repos">Added Repositories</h2>
        <ul className="repo-list">
          {addedRepos.map(repo => (
            <li key={repo.id} className="repo-item">
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s Avatar`}
                className="repo-image"
              />
              <div>{repo.name}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default GitHubApp
