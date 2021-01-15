import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';
import UserContext from '../../contexts/UserContext';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = '';
        AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        })
          .then((result) => {
            username.value = '';
            password.value = '';
            this.context.processLogin(result.authToken);
            this.props.onLoginSuccess();
          })
          .catch((result) => {
            console.log(result);
          });
      })

      .catch((result) => {
        console.log({ error: result.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div className='registration-form'>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>
          <div>
            <Label htmlFor='registration-name-input'>
              Enter your name
              <Required />
            </Label>
            <Input ref={this.firstInput} id='registration-name-input' name='name' required />
          </div>
          <div>
            <Label htmlFor='registration-username-input'>
              Choose a username
              <Required />
            </Label>
            <Input id='registration-username-input' autoComplete='username' name='username' required />
          </div>
          <div>
            <Label htmlFor='registration-password-input'>
              Choose a password
              <Required />
            </Label>
            <Input
              id='registration-password-input'
              autoComplete='current-password'
              name='password'
              type='password'
              required
            />
          </div>
          <footer>
            <Button type='submit'>Sign up</Button>{' '}
            <p>
              <Link to='/login'>Already have an account?</Link>
            </p>
          </footer>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
