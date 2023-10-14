import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { load } from '@2gis/mapgl';

import MapComponent from '../mapComponent/mapComponent';
import Sidebar from '../sidebar/sidebar';
import { getData, postData } from '../../services/services';

import './app.css';

const  App = () => {
  const [map, setMap] = useState({}),
    [banks, setBanks] = useState([]),
    [mapglAPI, setMapGLApi] = useState({});
  
  const curPos = useSelector(state => state.curPosition.coords),
      bounds = useSelector(state => state.bounds.boundCoords);

  useEffect(() => {
    if(curPos.length) {
      (async () => {
        await postData('/branch/listRequest', {
            firstCorner: {
                "long": bounds[0][0],
                "lat": bounds[0][1]
            },
            lastCorner: {
              "long": bounds[1][0],
              "lat": bounds[1][1]
            },
            hasRamp: true
        })
          .then(res => setBanks((res.branchs)));
      })();
    }
  }, [curPos]);

  useEffect(() => {
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
