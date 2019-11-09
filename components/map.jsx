import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import styled from 'styled-components';
import t from 'prop-types';

const Container = styled.div`
  width: 100%;
  height: 100%;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const position = [30, -10]
const MapControl = ({ conferences }) => {
  return (
    <Container>
      <Map center={position} zoom={3}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {conferences.map(({
          coordinates,
          url,
          language,
          name
        }, index) => {
          if(!coordinates.lat || !coordinates.lng) return null;
          return (
            <Marker key={index} position={[coordinates.lat, coordinates.lng]}>
              <Popup>
                {name}
                <br />
                <a href={url}>{url}</a>
              </Popup>
            </Marker>
          )
        }).filter(Boolean)}

      </Map>
    </Container>
  )
}

MapControl.propTypes = {
  conferences: t.array.isRequired,
};

export default MapControl;
