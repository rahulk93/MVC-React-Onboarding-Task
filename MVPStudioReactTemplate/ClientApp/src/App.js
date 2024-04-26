import React, { Component } from 'react';
import { Home } from './pages/Home';

export default class App extends Component {
  displayName = App.name

  render() {
      return (
        <Home></Home>
    );
  }
}
