import React, { Component } from 'react';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = newContact => {
    const { id, name, number } = newContact;

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

  getVisibleContacts = () => {
    const value = this.state.filter;
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  changeInput = evt => {
    this.setState({ filter: evt.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>

        <div className={s.myPhonebook}>
          <h2 className={s.bigHeader}>Моя телефонная книга</h2>
          <ContactForm onSubmit={this.handleSubmit} contacts={contacts} />
          <Filter value={filter} onChange={this.changeInput} />
          <h2 className={s.smallHeader}>Мои контакты:</h2>
          <ContactList
            contacts={this.getVisibleContacts()}
            onDelete={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
