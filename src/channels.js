import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { getChannels, getPrograms } from './request';
import DataTable from './DataTable';

const perPage = 5;
const quarterHours = ['00', '15', '30', '45'];

const times = [...Array(24).keys()].reduce((p, c) => {
  const value = quarterHours.map((min) => `${c.toString().padStart(2, '0')}:${min}`);
  return [...p, ...value];
}, []);
class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      loading: false,
      initialized: false,
      programs: [],
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
    const ids = [...this.state.channels, ...response.channels].map((channel) => channel.groupID);
    const data = await getPrograms(ids);

    this.setState({
      channels: [...this.state.channels, ...response.channels],
      initialized: true,
      programs: data,
    });
  }

  render() {
    return (
      <div
        className="Data-Table"
        ref="myscroll"
        style={{ height: '420px', overflow: 'auto' }}
      >
        <DataTable
          headings={times}
          programs={this.state.programs}
        />
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
