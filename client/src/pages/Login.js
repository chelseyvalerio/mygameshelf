import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error: newError }] = useMutation(ADD_USER);
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const addUserSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: { email: formState.newEmail, password: formState.newPassword },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <h2>Login/SignUp</h2>
      <form onSubmit={handleFormSubmit} className="login">
        <div className="flex-row space-between my-2">
          <h4>Login</h4>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
     
      <form onSubmit={addUserSubmit} className="login">
        <div className="flex-row space-between my-2">
        <h4>Signup</h4>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="newEmail"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="newPassword"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {newError ? (
          <div>
            <p className="error-text">Please use a unique email address.</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="addUser">SignUp</button>
        </div>
      </form>
      
      </div>
  );
}

export default Login;
