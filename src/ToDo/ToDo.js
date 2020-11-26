import React, { Component } from 'react';
import './ToDo.css';
import Tasks from './Tasks'

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTasks = () => {
        if (this.state.inputValue === '') {return}
        const newtasks = [...this.state.tasks]
        newtasks.push(this.state.inputValue)

        this.setState({
            tasks: newtasks,
            inputValue: '',
        })
    }

    clear = () => {
        const newtasks = []
        this.setState({
            tasks: newtasks,
            inputValue: '',
        })
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='Add new task' value={this.state.inputValue} onChange={this.handleChange} />
                <input type='button' value='Add' onClick={this.addTasks} />
                <input type='button' value='Clear' onClick={this.clear} />
                <ol>
                    {
                        this.state.tasks.map((tasks, index) => {
                            return <Tasks key={index} data={tasks} />
                        })
                    }
                </ol>
            </div>
        )

    }
}


export default ToDo
