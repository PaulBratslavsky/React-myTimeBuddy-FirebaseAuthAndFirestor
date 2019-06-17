import React, { Component } from 'react';
import './App.css';
import fire from './firebase';

import LogIn from './components/LogIn';
import MainView from './components/MainView';


class App extends Component {
  state = {
    currentView: 'login',
    user: null,
  }

  componentDidMount = () => {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        this.handleUserAuth();
        console.log(user, "From Auth Listener!")
        console.log('user found');
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        console.log('no user found');
      }
    });
  }

  handleUserAuth = () => {
    this.setState({
      currentView: 'main'
    });
  }
  handleUserLogOut = () => {
    fire.auth().signOut();
    this.setState({
      currentView: 'login'
    })
  }

  showView = () => {
    switch (this.state.currentView) {
      
      case 'login': 
        return(
          <LogIn />
        );

      case 'main': 
        return(
          <MainView handleUserLogOut={this.handleUserLogOut}/>
        )
      
      default: 
        return(
          <h1>NO VIEW</h1>
        );
    }
  }

  render() {
    return (
      <div className="App">
        
        {this.showView()}
        
      </div>
    );
  }
}

export default App;
