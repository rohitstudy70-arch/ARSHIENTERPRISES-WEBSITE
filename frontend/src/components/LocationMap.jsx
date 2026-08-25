/**
 * Location Map Component
 * Displays an interactive Leaflet map for business location
 */

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export const LocationMap = ({ latitude, longitude, title, description }) => {
  const position = [latitude, longitude];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h4 className="font-bold text-dark">{title}</h4>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
