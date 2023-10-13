import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { load } from '@2gis/mapgl';

import MapComponent from '../mapComponent/mapComponent';
import Sidebar from '../sidebar/sidebar';
import { getData } from '../../services/services';

import './app.css';

const  App = () => {
  const [map, setMap] = useState({}),
    [banks, setBanks] = useState([]),
    [mapglAPI, setMapGLApi] = useState({});

  useEffect(() => {
    (async () => {
      await getData('/branchList')
        .then(res => setBanks((res.branchs)));
    })();

      let map;

      load().then((mapglAPI) => {
          map = new mapglAPI.Map('map-container', {
              center: [37.622318, 55.754989],
              zoom: 13,
              key: 'fea7953b-72fa-4b6f-8d3e-bd5b5514a074',
          });

          setMap(map);
          setMapGLApi(mapglAPI);
      });

      return () => map && map.destroy();
  }, []);

  return (
    <>
      <Sidebar map={map} banks={banks}/>
      <MapComponent map={map} mapglAPI={mapglAPI} banks={banks}/>
    </>
  );
}

export default App;
