import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Project ${Date.now()}`
    })

    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`)

    const filteredProjects = repositories.filter(project => project.id !== id)

    setRepositories(filteredProjects)


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
