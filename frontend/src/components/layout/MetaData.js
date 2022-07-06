import React from 'react';
import { Helmet } from 'react-helmet';

function MetaData(props) {
    const { title } = props
  return (
    <Helmet>
      <title>{`SHOPIO - ${title}`}</title>
    </Helmet>
  )
}

export default MetaData
