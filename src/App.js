import React, {Component} from 'react';
import './App.css';
import GuestList from "./GuestList";

import Counter from "./Counter";

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: "Harry Potter 1",
        isConfirmed: false,
        isEditing: false,
        id: 0,
      }, {
        name: "Star Wars 1",
        isConfirmed: true,
        isEditing: false,
        id: 1,
      }, {
        name: "Star Wars 2",
        isConfirmed: false,
        isEditing: true,
        id: 2,
      }
    ]
  };

  lastGuestId = 3;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  toggleGuestPropertyAt = (property, id) => {
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });
  }

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index +1)
      ]
    });

  toggleEditingAt = id => this.toggleGuestPropertyAt("isEditing", id);

  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });
  }

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e =>
    this.setState({pendingGuest: e.target.value});

  newGuestSubmitHandler = e =>{
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [{
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
      },
      ...this.state.guests
    ],
    pendingGuest: ""
    });
  }

  getTotalInvited = () => this.state.guests.length;
  getAttendingGuests = () =>
    this.state.guests.reduce((total, guest) =>
      guest.isConfirmed ? total+1 : total
    , 0);
  // getUnconfirmedGuests = () =>

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">
        <header>
          <h1>Movie Tracker</h1>
          <p>So you never forget what you haven't seen</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Add a Movie"
            />
            <button
              type="submit"
              name="submit"
              value="submit"
              >Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Filter:</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              />
              Hide those which I've seen
            </label>
          </div>

          <Counter
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />

          <GuestList
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
