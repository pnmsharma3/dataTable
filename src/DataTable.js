import * as React from 'react';
import Cell from './Cell';
import './DataTable.scss';
export default function DataTable(props) {
const renderHeadingRow = (_cell, cellIndex) => {
    const {headings} = props;
    return (
      <th className="Cell Cell-header">
        <div>{headings[cellIndex]}</div>
    </th>
    
    )
  };

  const renderRow = (program, rowIndex) => {
    const {programs,headings} = props;
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
          // console.log('cellData[Id]',cellData[Id])
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

 
    const {headings, programs} = props;
    const theadMarkup = (
      <tr key="heading">
          <th className="Cell Cell-header Cell-fixed">Channels
     </th> 
        {headings.map(renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = Object.keys(programs).map(renderRow);
  
    return (
    //  <div className="DataTable" 
    //  >
        // <div className="ScrollContainer">
        <table className="Table">
      
          <thead>{theadMarkup}</thead>
          <tbody>{tbodyMarkup}</tbody>
         
        </table>
        // </div>
    //  </div >
    );
  
}