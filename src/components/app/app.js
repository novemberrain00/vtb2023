import { useEffect, useState } from 'react';
import MapComponent from '../mapComponent/MapComponent';
import { getData } from '../../services/services';

import './app.css';
import Sidebar from '../sidebar/sidebar';

const  App = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    (async () => {
      await getData('/branchList')
        .then(res => setBanks(res.branchs))
    })();
    
  }, []);

  return (
    <>
      <Sidebar/>
      <MapComponent banks={banks}/>
    </>
  );
}

export default App;
