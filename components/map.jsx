import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'

const position = [51.505, -0.09]
const MapControl = () => {
  const [inBrowser, setBrowser] = useState();
  useEffect(() => {
    if(window){
      setBrowser(true);
    }
  });

  return inBrowser ? (
    <Map center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
    </Map>
  ) : null;
}

export default MapControl;
