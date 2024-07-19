import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
let DefaultIcon = L.icon({
     iconUrl: icon,
     shadowUrl: iconShadow
});

export default function MapComponent({ positions }: { positions: any[] }) {
     const centerPoint: number[] = [-1.831239, -78.183406];
     const [loanding, setLoanding] = useState<boolean>(false);

     useEffect(() => {
          if (positions.length > 0) {
               setLoanding(true);
               return
          }
          setLoanding(false);
     }, [positions]);


     return (
          <>
               <MapContainer center={[centerPoint[0], centerPoint[1]]} zoom={7} >
                    <TileLayer
                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                         loanding && positions.map((item: any, index: number) => item.isView && (
                              <Marker
                                   position={[Number(item.latitude), Number(item.longitude)]}
                                   key={index}
                                   icon={DefaultIcon}
                              >
                                   <Tooltip>
                                        {item?.label.split("<b/>")[0] ?? "No hay nombre"}
                                        <br />
                                        {item?.label.split("<b/>")[1] ?? "No hay fecha"}
                                   </Tooltip>
                              </Marker>
                         ))
                    }
               </MapContainer>
          </>
     )
}