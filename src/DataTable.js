import * as React from 'react';
import Cell from './Cell';
import './DataTable.scss';
export default function DataTable({programs,headings}) {
const renderHeadingRow = (_cell, cellIndex) => {
    return (
      <th className="Cell" key={cellIndex}>
        {_cell}
    </th>
    
    )
  };

  const renderRow = (program, rowIndex) => {
    const CURRENT_DATE=Object.keys(Object.values(programs)[0])[0];
    return (
      <tr key={`row-${rowIndex}`} id={`row-${rowIndex}`}>
      <td className="Cell Cell-fixed " scope="row">
      <img 
    src={`https://cdn.hd-plus.de/senderlogos/bright-cropped/${program}.png`}
       />
  </td>
  
  {headings.map((_cell, cellIndex) => {
          let hours=_cell.split(':').toString();
          let Id =(new Date(parseInt(CURRENT_DATE)).setHours(hours[0],hours[1])).toString();
          let cellData=programs[program];
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              id={`${rowIndex}-${cellIndex}`}
              content={cellData[Id]}
          
            />
          )
        })}
      </tr>
    )
  };

    const theadMarkup = (
      <tr key="heading">
          <th className="Cell ">Channels
     </th> 
        {headings.map(renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = Object.keys(programs).map(renderRow);
  
    return (
        <table className="Table">
          <thead>{theadMarkup}</thead>
          <tbody>{tbodyMarkup}</tbody>
        </table>
    );
  
}