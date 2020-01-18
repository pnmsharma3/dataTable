import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 20,
      loading: false,
    };
  }

  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener('scroll', () => {
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight
        >= this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
  }

  showItems() {
    const items = [];
    for (let i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>
Item
        {' '}
        {i}
      </li>);
    }
    return items;
  }

  loadMore() {
      console.log('this.state.items', this.state.items)
    // this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 20, loading: false });
    }, 2000);
  }

  render() {
    return (
      <div
        className="App"
        ref="myscroll"
        style={{ height: '420px', overflow: 'auto' }}
      >
       
        <ul>
          {this.showItems()}
        </ul>
        {this.state.loading
          ? (
            <p className="App-intro">
              loading ...
            </p>
          )
          : ''}

      </div>
    );
  }
}

export default Scroll;
