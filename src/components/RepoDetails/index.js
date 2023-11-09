import {Component} from 'react'
import './index.css'

class RepoDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repo: null,
      loading: true,
      error: null, // Add error state
    }
  }

  componentDidMount() {
    this.fetchRepoDetails()
  }

  fetchRepoDetails = () => {
    const {match} = this.props

    if (match && match.params) {
      const apiUrl = `https://api.github.com/search/repositories?q=created:%3E2022-01-01&sort=stars&order=desc&page=1&access_token=YOUR_TOKEN`

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          this.setState({repo: data, loading: false})
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.setState({
            loading: false,
            error: 'Unable to fetch repository details.',
          })
        })
    } else {
      console.error('Match or match.params not defined')
      this.setState({
        loading: false,
        error: 'Match or match.params not defined',
      })
    }
  }

  render() {
    const {repo, loading, error} = this.state

    if (loading) {
      return <div className="loading">Loading...</div>
    }

    if (error) {
      return <div className="error">{error}</div>
    }

    if (!repo) {
      return <div className="error">Unable to fetch repository details.</div>
    }

    return (
      <div className="repo-details">
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Language: {repo.language}</p>
        <p>Created At: {repo.created_at}</p>
      </div>
    )
  }
}

export default RepoDetails
