import React, { Component } from 'react';
import fire from 'firebase';
import './login.css';

class LogIn extends Component {

  state = {
    userName: '',
    userPassword: '',
    showInvalidPasswordEmail: false,
    pleaseProvideValidEmail: false,
    weakPasswordError: false,
    currentEmailExists: false,
  }

  handleNameInput = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  handlePasswordInput = (e) => {
    this.setState({
      userPassword: e.target.value
    })
  }

  handleCreateUser = (e) => {
    e.preventDefault();

    this.setState({
      showInvalidPasswordEmail: false
    })
    
    
    fire.auth().createUserWithEmailAndPassword(this.state.userName, this.state.userPassword).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);

        switch (error.code) {
    
          case 'auth/invalid-email': 
            console.log('Please Provide Valid Email');
            this.setState({
              pleaseProvideValidEmail: true,
            });
            setTimeout( () => {
              this.setState({
                pleaseProvideValidEmail: false
              });
            }, 3000);
            break;

          case 'auth/weak-password':
            console.log('week password');  
            this.setState({
              weakPasswordError: true
            });
            setTimeout( () => {
              this.setState({
                weakPasswordError: false
              });
            }, 3000);
            break;

            case 'auth/email-already-in-use':
            console.log('Email already in use');  
            this.setState({
              currentEmailExists: true,
            });
            setTimeout( () => {
              this.setState({
                currentEmailExists: false
              });
            }, 3000);
            break;

          default: 
            console.log("No errors detected");
            break;
        }
    })
  
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');

    this.setState({
      pleaseProvideValidEmail: false
    })

      fire.auth()
      .signInWithEmailAndPassword(this.state.userName, this.state.userPassword)
      .then((u)=>{ })
      .then((u)=>{console.log(u)})
      .catch((error) => {
          console.log(error, "From error");

          switch (error.code) {
      
            case 'auth/invalid-email': 
            case 'auth/wrong-password':
              console.log('Invalid Email or Password');
              this.setState({
                showInvalidPasswordEmail: true
              });
              setTimeout( () => {
                this.setState({
                  showInvalidPasswordEmail: false
                });
              }, 3000);
              break;

            default: 
              console.log("No errors detected");
              break;
          }

      })

      this.setState({
        userName: '',
        userPassword: '',
        showUserNameError: false,
        showUserPasswordError: false,
      });
      

  
    


  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-group">
            { this.state.currentEmailExists && <p class="error">Email Already in Use.</p>}
            { this.state.showInvalidPasswordEmail && <p class="error">Invalid User Email or Password.</p>}
            { this.state.pleaseProvideValidEmail && <p class="error">Please Provide a Valid Email.</p>}
            <input onChange={this.handleNameInput} type="email" placeholder="Enter User Email" value={this.state.userName}/>
          </div>
  
          <div className="input-group">
            { this.state.weakPasswordError && <p class="error">Password must be 6 or more characters.</p>}
            <input onChange={this.handlePasswordInput} type="password" placeholder="Enter User Password" value={this.state.userPassword} />
          </div>

          

          <div className="input-group">
            <button type="submit"> Log In</button>|
            <button onClick={this.handleCreateUser}>Create Account</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;