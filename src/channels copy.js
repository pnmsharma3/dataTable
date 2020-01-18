import React, { useState, useEffect, useRef } from 'react';
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
  const [initialized, setInitialized] = useState(false);

  const loadMore = async () => {
    const sIndex = channels.length ? channels.length - 1 : 0;
    const eIndex = sIndex + perPage;

    const response = await getChannels(sIndex, eIndex);
    const ids = channels.concat(response.channels).map((channel) => channel.groupID);
    const data = await getPrograms(ids);
    setPrograms(data);
    setChannels([...channels, ...response.channels]);
    setInitialized(true);

    console.log('response.totalChannels', response.totalChannels, response.channels.length);
    // setIsLoadMore(response.totalChannels > channels.concat(response.channels.length));
    // console.log('totalChannels',totalChannels,channels.length);
  };

  useEffect(() => {
    if (!initialized) {
      loadMore();
    }
    myscroll.current.addEventListener('scroll', () => {
      console.log('get next');
      if (
        myscroll.current.scrollTop + myscroll.current.clientHeight
        >= myscroll.current.scrollHeight
      ) {
        loadMore();
      }
    });
  });

  const headings = times;
  //   const rows = channels;
  // console.log(rows)
  return (
    <div>
      <div
        title="Data table"
        ref={myscroll}
        style={{ height: '420px', overflow: 'auto' }}
      >
        {channels.length && (
        <DataTable
          headings={headings}
          programs={programs}
        />
        )}
      </div>

    </div>
  );
}
