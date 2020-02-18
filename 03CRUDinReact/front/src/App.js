import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], error: "" };
  }

  getContact = async (id) => {
    const prevContact = this.state.contacts.find(contact => contact.id === id);
    if (prevContact) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/contact/${id}`);
      const result = await res.json();
      if (result.success) {
        const contact = result.result;
        const contacts = [...this.state.contacts, contact];
        this.setState({ contacts, error: "" });
      }
      else {
        this.setState({ error: result.message });
      }
    }
    catch (error) {
      this.setState({ error: error });
    }
  };

  deleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/contacts/delete/${id}`);
      const result = await res.json();

      if (result.success) {
        const contacts = this.state.contacts.filter(contact => contact.id !== id);
        this.setState({ contacts, error: "" });
      }
      else {
        this.setState({ error: result.message });
      }
    }
    catch (error) {
      this.setState({ error: error });
    }
  };

  updateContact = async (id, props) => {
    try {
      if (!props && !props.name && !props.email) {
        throw new Error(`You must enter at least a name or email`);
      }

      let url = "";
      const { name, email } = props;

      if (name && email) {
        url = `http://localhost:8000/contacts/update/${id}?name=${name}&email=${email}`;
      }
      if (name) {
        url = `http://localhost:8000/contacts/update/${id}?name=${name}`;
      }
      if (email) {
        url = `http://localhost:8000/contacts/update/${id}?email=${email}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      if (result.success) {
        const contacts = this.state.contacts.map(contact => {
          if (contact.id === id) {
            const newContact = {
              id: contact.id,
              name: props.name || contact.name,
              email: props.email || contact.email
            };
            return newContact;
          }
          else {
            return contact;
          }
        });
        this.setState({ contacts, error: "" });
      }
      else {
        this.setState({ error: result.message });
      }
    }
    catch (error) {
      this.setState({ error: error });
    }
  };

  createContact = async props => {
    try {
      if (!props || !(props.name && props.email)) {
        throw new Error(`You must provide a name and email to create a contact`);
      }
      const { name, email } = props;
      const res = await fetch(`http://localhost:8000/contacts/create?name=${name}&email=${email}`);
      const result = await res.json();

      if (result.success) {
        const id = result.result;
        const contact = { name, email, id };
        const contacts = [...this.state.contacts, contact];
        this.setState({ contacts, error: "" });
      }
      else {
        this.setState({ error: result.message });
      }
    }
    catch (error) {
      this.setState({ error: error.message });
    }
  };

  getContactList = async () => {
    try {
      const res = await fetch(`http:localhose:8000/contacts`);
      const result = await res.json();

      if (result.success) {
        this.setState({ contacts: result.result, error: "" });
      }
      else {
        this.setState({ error: result.message });
      }
    }
    catch (error) {
      this.setState({ error: error });
    }
  };

  async componentDidMount() {
    this.getContactList();
  }

  render() {
    return (
      <div className="App">
        {this.state.error ? <p>{this.state.error}</p> : false}
        Contact List:
        <ul>{this.state.contacts.map(contact => (
          <li>{contact.name}</li>))}
        </ul>
      </div>
    );
  }
}

export default App;