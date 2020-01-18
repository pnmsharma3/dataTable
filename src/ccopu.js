import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { getChannels } from './request';


class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      loading: false,
      initialized: false,
    };
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.loadMore();
    }

    this.refs.myscroll.addEventListener('scroll', () => {
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight
        >= this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
  }

  async loadMore() {
    console.log('this.state.items', this.state.channels);

    const sIndex = this.state.channels.length ? this.state.channels.length - 1 : 0;
    const eIndex = sIndex + 7;

    const response = await getChannels(sIndex, eIndex);

    this.setState({ channels: [...this.state.channels, ...response.channels], initialized: true });
  }

  render() {
    return (
      <div
        className="Data-Table"
        ref="myscroll"
        style={{ height: '420px', overflow: 'auto' }}
      >
        <div>
          <div>

        <table className="Table">
       <tbody>
        {this.state.channels && this.state.channels.map((i, index) => (
          <tr  key={index}>
            <td>
              <img
                key={index}
                src={`https://cdn.hd-plus.de/senderlogos/bright-cropped/${i.groupID}.png`}
                alt={i.name}
                sizes={window.innerWidth / 3.5}
              />
            </td>

          </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div> 
       
        {/* <ul>
          {this.state.channels && this.state.channels.map((i, index) => (
            <li>
              <img
                key={index}
                src={`https://cdn.hd-plus.de/senderlogos/bright-cropped/${i.groupID}.png`}
                alt={i.name}

              />

            </li>
          ))}
        </ul> */}
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
