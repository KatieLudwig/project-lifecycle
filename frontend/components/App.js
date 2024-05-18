import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true
  }

  onTodoInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  resetForm = () => this.setState({...this.setState, todoNameInput: ''})

  setAxiosResponseError = err => this.setState({...this.setState, error: err.response.data.message})

  postNewTodo= () => {
    axios.post(URL, { name: this.state.todoNameInput})
    .then(res => {
      this.setState({...this.setState, todos: this.state.todos.concat(res.data.data) })
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.setState, todos: res.data.data })
    })
    .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({...this.setState, todos: this.state.todos.map(td => {
        if(td.id !== id) return td
        return res.data.data
        })
      })
    })
    .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted:!this.state.displayCompleted})
  }

  componentDidMount(){
    //fetch all todos from servers
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
        <h1>Todos: </h1>
        {
          this.state.todos.reduce((acc, td) => {
            if(this.state.displayCompleted || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</div>
            )
              return acc
          }, [])
        }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoInputChange} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
      </div>
    )
  }
}
