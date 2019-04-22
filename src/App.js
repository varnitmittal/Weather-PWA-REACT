import React from 'react';
import './App.css';
import Container from './components/container/container.component'

class App extends React.Component {
  render() {
    return (
      <div style={{ background: '#000000' }} >
        <Container />
      </div>
    )
  }
}

export default App;
