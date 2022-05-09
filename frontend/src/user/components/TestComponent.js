import React from 'react';
import { useParams } from 'react-router-dom';

const TestComponent = () => {
  const { id } = useParams();

  console.log(id);

  return <div>TestComponent</div>;
};

export default TestComponent;
