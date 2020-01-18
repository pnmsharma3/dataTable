import * as React from 'react';
import Cell from './Cell';
import './DataTable.scss';
import InfiniteScroll from 'react-infinite-scroller';


export default class DataTable extends React.Component {
  render() {
      return(this.props.channels.map((i, index) => (
<tr >
             <img 
             key={index}
             src={`https://cdn.hd-plus.de/senderlogos/bright-cropped/${i.groupID}.png`}
              alt={i.name}
              sizes={window.innerWidth / 3.5}
              >
                  
              </img>


              </tr>
),

             )

      )
 }
}