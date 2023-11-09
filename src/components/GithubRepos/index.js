import {useEffect, useState} from 'react'

const GithubRepos = () => {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch(
      'https://api.github.com/search/repositories?q=created:>2022-01-01&sort=stars&order=desc',
    )
      .then(response => response.json())
      .then(data => setRepos(data.items))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1>Most Starred Github Repos</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default GithubRepos
