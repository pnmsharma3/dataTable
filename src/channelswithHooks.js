import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import { getChannels, getPrograms } from './request';
import DataTable from './DataTable';

const perPage = 5;
const quarterHours = ['00', '15', '30', '45'];

const times = [...Array(24).keys()].reduce((p, c) => {
  const value = quarterHours.map((min) => `${c.toString().padStart(2, '0')}:${min}`);
  return [...p, ...value];
}, []);
export default function Channels() {
  const myscroll = useRef();
  const [channels, setChannels] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const[initialized,setInitialized]=useState(false);

  const loadMore = async () => {
    const sIndex = channels.length ? channels.length - 1 : 0;
    const eIndex = sIndex + perPage;

    const response = await getChannels(sIndex, eIndex);
    const ids = channels.concat(response.channels).map((channel) => channel.groupID);
    const data = await getPrograms(ids);
    setPrograms(data);
    setChannels([...channels, ...response.channels]);
    setInitialized(true);
  };


  useEffect(() => {
    if (!initialized) {
      loadMore();
    }

    myscroll.current.addEventListener('scroll', () => {
      if (
        myscroll.current.scrollTop + myscroll.current.clientHeight
        >= myscroll.current.scrollHeight
      ) {
        return loadMore();
      }
    });
  },[])


  



    return (
      <div
        className="Data-Table"
        ref={myscroll}
        style={{ height: '420px', overflow: 'auto' }}
      >
        <DataTable
          headings={times}
          programs={programs}
        />
        {loading
          ? (
            <p className="App-intro">
              loading ...
            </p>
          )
          : ''}

      </div>
    );
  }

