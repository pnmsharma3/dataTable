export const getPrograms = (ids) => ids.reduce((p, id) => {
    const values = data.result
      .filter((program) => program.channelID === id)
      .reduce((pre, val) =>{
        console.log('val',[val.channelID,val.title,val.start,val.stop])
        let newData=[val.channelID.toString(),val.title,new Date(val.start).getTime(),new Date(val.stop).getTime()]
       return ([ ...pre,[...newData]])
      },[])
      
      // console.log('values',values)
  
    return [...p,...values];
  }, []);

import * as React from 'react';
import { Chart } from "react-google-charts";
export default function timechart({programs}) {

    let data2 =
        [
            [
                      { type: 'string', id: 'Room' },
                      { type: 'string', id: 'Name' },
                      { type: 'date', id: 'Start' },
                      { type: 'date', id: 'End' },
                    ],...programs
        ]



return (

<Chart
  width={'300%'}
  height={'200px'}
  chartType="Timeline"
  loader={<div>Loading Chart</div>}
  data={data2}
  formatters={[
    {
        type: 'PatternFormat',
        column: [0],
        options: '<img src="{0}"/>',
      },
  ]}

  options={{
    timeline: {
      colorByRowLabel: true,
    },
    allowHtml: true
  }}
  rootProps={{ 'data-testid': '5' }}
/>
)
}