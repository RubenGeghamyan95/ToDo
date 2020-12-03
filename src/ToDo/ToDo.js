import React, { Component } from 'react';
import './ToDo.css';
//import Tasks from './Tasks'
import { Container, Row, Col, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class ToDo extends Component {
    state = {
        tasks: [],
        inputValue: '',
        _id: 0,
        selectedTasks: new Set(),
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTasks = () => {
        const { inputValue } = this.state;
        if (inputValue === '') { return }
        const newID = this.state._id + 1

        const newInputValue = {
            text: inputValue,
            _id: newID
        }
        const newtasks = [newInputValue, ...this.state.tasks]

        this.setState({
            tasks: newtasks,
            inputValue: '',
            _id: newID,
        })
    }

    clear = () => {
        const newtasks = []
        this.setState({
            tasks: newtasks,
            inputValue: '',
            _id: 0,
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTasks();
        }
    }

    handleDelete = (taskID) => {
        const newtasks = this.state.tasks.filter(task => task._id !== taskID)
        let selectedTasks = new Set(this.state.selectedTasks)
        selectedTasks.delete(taskID)

        this.setState({
            tasks: newtasks,
            selectedTasks
        })

    }
    handleCheck = (taskID) => {

        let selectedTasks = new Set(this.state.selectedTasks)
        if (selectedTasks.has(taskID)) {
            selectedTasks.delete(taskID)
        } else {
            selectedTasks.add(taskID)
        }

        this.setState({
            selectedTasks,
        })
    }

    removeSelected = () => {

        let newtasks = this.state.tasks

        this.state.selectedTasks.forEach(id => {
            newtasks = newtasks.filter(task => task._id !== id)
        })

        this.setState({
            tasks: newtasks,
            selectedTasks: new Set(),
        })
    }

    render() {
        const tasks = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
                    <Card className="mb-3">
                        <Card.Body>
                            <input
                                type="checkbox"
                                onClick={() => this.handleCheck(task._id)}
                                key = {task._id}
                                defaultChecked = {this.state.selectedTasks.has(task._id)}
                            />
                            <Card.Title>
                                {task.text}
                            </Card.Title>
                            <Card.Text>
                                {task.text}
                            </Card.Text>
                            <Button 
                                variant="primary" 
                                onClick={() => this.handleDelete(task._id)} 
                                //disabled = {this.state.selectedTasks.has(task._id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

        return (
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Add new task"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        onKeyDown={(event) => this.handleKeyDown(event)}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary" onClick={this.addTasks} >Add</Button>
                        <Button variant="outline-primary" onClick={this.clear} >Clear</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Container>
                    <Row>
                        {tasks}
                    </Row>
                </Container>
                <Button variant="outline-primary" onClick={this.removeSelected} disabled={this.state.selectedTasks.size === 0}>Remove Selected</Button>
            </div>
        )

    }
}


export default ToDo
