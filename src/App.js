import React, { Component } from 'react';
// import styled from 'styled-components';

import classes from './App.css';
import Person from './Person/Person';

/*
const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue; 
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;
*/

class App extends Component {
  state = {
    persons: [
      { id: 'asedasd', name: 'Max', age: 28 },
      { id: 'asdjas', name: 'Manu', age: 29 },
      { id: 'fgjghgfh', name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Getting the person without mutating the original one.
    const person = {
      ...this.state.persons[personIndex]
    }

    // Alternative and ugly but equally good way.
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {
      persons: persons
    } )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    // these two ways get data in a new array without mutating the state
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    /*
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    */

    let persons = null;
    let btnClass = [classes.button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={ () => {this.deletePersonHandler(index)}}
            name={person.name}
            age={person.age}
            key={person.id} 
            changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );
      
      btnClass.push(classes.redd);
      /*
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
      */
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}

export default App;

