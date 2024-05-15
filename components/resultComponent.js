import React, { useState } from 'react';
import '../css/result.css'; // Import your CSS file
import VerticalSearch from './verticalSearchComponent';
import ResultList from './resultListComponent';

const MyComponent = () => {

    const [trigger, setTrigger] = useState(0);

    
  return (
    <div className="container">
      <div className="left-div">
        <VerticalSearch  triggerSetter={setTrigger} />
      </div>
      <div className="main-div">
        <ResultList trigger={trigger}/>
      </div>
    </div>
  );
};

export default MyComponent;