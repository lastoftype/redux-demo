import React, { Component } from 'react';
import Chance from 'chance';

import { connect } from 'react-redux';
import { setLoading, addOrder, getUsers } from './store';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from '../node_modules/react-syntax-highlighter/dist/styles/prism';
import { Hook, Console, Decode } from 'console-feed';
import update from 'immutability-helper';

import './styles.scss';

var chance = new Chance();

class App extends Component {
  state = {
    logs: [],
  };

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(state => update(state, { logs: { $push: [Decode(log)] } }));
    });
  }

  generateOrder() {
    return {
      id: Math.floor(Math.random() * 100),
      name: chance.name({ gender: 'female' }),
    };
  }

  render() {
    const styles = {
      fontFamily: 'Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace',
      fontSize: '16px',
    };

    return (
      <div>
        <h1>React Redux + Redux Saga</h1>
        <div className="row">
          <div className="col">
            <button onClick={() => this.props.getUsers()}>Get Users</button>
            <button onClick={() => this.props.addOrder(this.generateOrder())}>Add Order</button>
            <SyntaxHighlighter language="json" style={atomDark}>
              {JSON.stringify(this.props, null, ' ')}
            </SyntaxHighlighter>
          </div>
          <div className="col">
            <h2>Console</h2>
            <Console style={styles} logs={this.state.logs} variant="dark" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setLoading,
  addOrder,
  getUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
