import * as React from 'react';

export default function Cell({
  content,

}) {
  const cellMarkup = (
    <td className="Cell">

      {content ? content.title : ''}
    </td>
  );
  // console.log('concontentcontentcontenttent', content);

  return (cellMarkup);
}

