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
        programs: {},
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
      const ids=response.channels.map((channel) => channel.groupID);
      const Channeldata = await getPrograms(ids);
      this.setState({ loading: true });
      this.setState({
        channels: [...this.state.channels, ...response.channels],
        initialized: true,
        programs: {...this.state.programs,...Channeldata},
        loading:false
      })
    }

    render() {
    console.log(!!Object.values(this.state.programs).length&&new Date(parseInt(Object.keys(Object.values(this.state.programs)[0])[0])).toString())
      return (
        <main>
        {!!Object.values(this.state.programs).length&&<h1>
        {new Date(parseInt(Object.keys(Object.values(this.state.programs)[0])[0])).toString()}

        </h1>}
        <section
          className="Data-Table"
          ref="myscroll"
          style={{ height: '420px', overflow: 'auto' }}
        >
          {!!Object.keys(this.state.programs).length&&<DataTable
            headings={times}
            programs={this.state.programs}
          />}
          {this.state.loading
            ? (
              <p className="">
                loading ...
              </p>
            )
            : ''}

        </section>
        </main>
      );
    }
  }


