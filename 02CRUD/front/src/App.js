import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], error: "" };
  }

  getContactList = async () => {
    try {
      const res = await fetch("http://localhost:8000/contacts");
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
          <li>{contact.name}</li>
        ))}
        </ul>
      </div>
    );
  }
}

export default App;