import React, { Component } from 'react';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number } = this.state;

    if (this.checkContacts(this.props.contacts, name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.props.onSubmit({
        id: uuidv4(),
        name,
        number,
      });

      this.reset();
    }
  };

  checkContacts = (arr, target) => {
    return arr.find(({ name }) => name.toLowerCase() === target.toLowerCase());
  };

  changeInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={s.section}>
      <form className={s.newContacsForm} onSubmit={this.handleSubmit}>
        <h2 className={s.title}>Добавить новый контакт:</h2>
        <label className={s.label}>
          <span className={s.labelTitle}>Имя:</span>
          <input
            type="text"
            onChange={this.changeInput}
            value={name}
            name="name"
            placeholder="введите имя"
            required
          />
        </label>
        <label className={s.label}>
          <span className={s.labelTitle}>Номер:</span>
          <input
            type="text"
            onChange={this.changeInput}
            value={number}
            name="number"
            placeholder="введите номер телефона"
            required
          />
        </label>

        <button type="submit" className={s.button}>
          Добавить
        </button>
      </form>
      </div>
    );
  }
}

export default ContactForm;