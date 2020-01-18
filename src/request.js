import { result } from './data/channels.json';
import data from './data/1.json';
// import Axios from 'axios'

// export const getChannels =fetchData=>(
//     Axios.get('http://localhost:3000/data/channels.json').then(res => {
//     console.log('hhhhh',res.data)

//     }
//     ));

export const getChannels = (sIndex, eIndex) => {
  console.log('sIndex, eIndex', sIndex, eIndex);
  const channels = result.channels.slice(sIndex, eIndex);
  return { channels, totalChannels: result.channels.length };
};
export const getPrograms = (ids) => ids.reduce((p, id) => {
  const values = data.result
    .filter((program) => program.channelID === id)
    .reduce((pre, val) => ({ ...pre, [val.start]: val }), {});
  return { ...p, [id]: { ...values } };
}, {});

