import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
      <h2>Todo</h2>
        {
          this.props.todos.reduce((acc, td) => {
            if(this.props.displayCompleted || !td.completed)
              return acc.concat(
            <Todo 
              key={td.id}
              toggleCompleted={this.props.toggleCompleted}
              todo={td}
            />
        // <div 
        //   onClick={this.props.toggleCompleted(td.id)}
        //   key={td.id}>
        //   {td.name} {td.completed ? ' ✔️' : ''}
        // </div>
      )
        return acc
      }, [])
    }
    </div>
    )
  }
}
