import React, { Component } from "react";
import Chance from "chance";

import { connect } from "react-redux";
import { setLoading, addOrder, getUsers } from "./store";

var chance = new Chance();

class App extends Component {
  generateOrder() {
    return {
      id: Math.floor(Math.random() * 100),
      name: chance.name({ gender: "female" })
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.getUsers()}>Get Users</button>
        <button onClick={() => this.props.addOrder(this.generateOrder())}>
          Add Order
        </button>
        <pre style={{ fontSize: "23px" }} className="App">
          {JSON.stringify(this.props, null, " ")}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setLoading,
  addOrder,
  getUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
