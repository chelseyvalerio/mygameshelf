import React, { useState } from 'react';
import { validateEmail } from './utils/helpers';

function Contact() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;
    //const inputType = target.name;
    //const inputValue = target.value;

    if (name === 'email') {
      setEmail(value);
      setErrorMessage(''); // reset error message display 
    }
      else if (name === 'name') {
        setName(value);
      }
      else if (name === 'message') {
        setMessage(value);
      }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Email field is invalid');
    
      return;    
    }

    setEmail('');
    setName('');
    setMessage('');
    setErrorMessage('');
  };

  return (
    <div className="contact">
      <h2>Contact</h2>
      <ul>
        <li>Email: </li>
        <li>Phone: </li>
        <li><a href="https://www.google.com" target="_blank" rel="noreferrer">External Link Here</a></li>
      </ul>
      <p>Use the form below to send a message or to get in contact. </p>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <input
          value={name}
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder="name"
        />
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        <input
          value={message}
          name="message"
          onChange={handleInputChange}
          type="textarea"
          placeholder="Message here"
        />
        <button type="submit" className="submit" onClick={handleFormSubmit}>Submit</button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Contact;