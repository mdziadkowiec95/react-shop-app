import React from 'react';

const DetailsPage = (props) => (
  <div>
    <h1>Details Page</h1>
    <p>{props.match.params.id}</p>
  </div>
);

export default DetailsPage;