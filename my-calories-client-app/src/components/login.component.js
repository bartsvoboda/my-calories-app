import React , { Component } from 'react';

export default class AddFood extends Component {
  constructor(props) {
      super(props);

      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    
      this.state = {
          email: '',
          password:''
      }
  }

  onChangeEmail(e){
      this.setState({
          email: e.target.value
      });
  }

  onChangePassword(e){
      this.setState({
          password: e.target.value
      });
  }


  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    
    console.log(user);
    
  }


  render() {
      return (
          <div>
            <h3>Zaloguj się</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Email: </label>
                <input type ="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>
              <div className="form-group"> 
                <label>Hasło: </label>
                <input type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
            
              <div className="form-group">
                <input type="submit" value="Zaloguj" className="btn btn-primary" />
              </div>
            </form>
          </div>
          )
  }
}