import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.setState, todos: res.data.data })
    })
    .catch(err => {
      debugger
    })
  }

  componentDidMount(){
    //fetch all todos from servers
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: no error here</div>
        <div id="todos">
        <h1>Todos: </h1>
        {
          this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })
        }
        </div>
        <form id='todoForm'>
          <input type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
