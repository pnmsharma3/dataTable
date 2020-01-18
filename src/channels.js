import React, { Component } from 'react';
import './App.scss';
import { getChannels, getPrograms } from './request';
import DataTable from './DataTable';
const perPage = 5;
const quarterHours = ['00', '15', '30', '45'];

const times = [...Array(24).keys()].reduce((p, c) => {
  const value = quarterHours.map((min) => `${c.toString().padStart(2, '0')}:${min}`);
  return [...p, ...value];
}, []);
export default class channels extends Component {
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
    this.setState({ loading: true });
    const sIndex = this.state.channels.length ? this.state.channels.length - 1 : 0;
    const eIndex = sIndex + perPage;
    const response = await getChannels(sIndex, eIndex);
    const ids = [...this.state.channels, ...response.channels].map((channel) => channel.groupID);
    const Channeldata = await getPrograms(ids);
    this.setState({ loading: true });
    this.setState({
      channels: [...this.state.channels, ...response.channels],
      initialized: true,
      programs: Channeldata,
      loading:false
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


