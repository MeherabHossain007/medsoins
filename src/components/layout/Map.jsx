"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
  // Only run on client side
  if (typeof window !== "undefined") {
    // Fix marker icon paths
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
    });
  }
};

// Custom marker icon
const createCustomIcon = (color = "#3388ff") => {
  return new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: `custom-icon-${color.replace('#', '')}`
  });
};

// CentersMap component
const CentersMap = ({ centers = [], height = "500px", initialView = [46.603354, 1.888334], zoom = 5 }) => {
  const mapRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState(null);
  
  // Generate GeoJSON from centers data
  useEffect(() => {
    if (!centers.length) return;
    
    // Convert centers array to GeoJSON format
    const features = centers.map(center => ({
      type: "Feature",
      properties: {
        id: center.id,
        name: center.name,
        type: center.type || "healthcare",
        address: center.address,
        phone: center.phone,
        description: center.description || "",
        distance: center.distance
      },
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude]
      }
    }));
    
    const geoJsonObject = {
      type: "FeatureCollection",
      features
    };
    
    setGeoJsonData(geoJsonObject);
  }, [centers]);
  
  // Fix for SSR and Leaflet
  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons();
  }, []);
  
  // Custom style for GeoJSON features
  const geoJsonStyle = () => {
    return {
      weight: 2,
      opacity: 1,
      color: "#007bff",
      fillOpacity: 0.7,
      fillColor: "#007bff"
    };
  };
  
  // Handle click on GeoJSON point
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <div>
          <h3 class="font-bold text-lg">${feature.properties.name}</h3>
          ${feature.properties.address ? `<p>${feature.properties.address}</p>` : ''}
          ${feature.properties.phone ? `<p>Tel: ${feature.properties.phone}</p>` : ''}
          ${feature.properties.distance ? `<p>Distance: ${feature.properties.distance}</p>` : ''}
          ${feature.properties.description ? `<p>${feature.properties.description}</p>` : ''}
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };
  
  // Custom point to layer function to use markers instead of circles
  const pointToLayer = (feature, latlng) => {
    const centerType = feature.properties.type || "healthcare";
    
    // Different icons based on center type
    let markerColor = "#3388ff"; // Default blue
    if (centerType === "hospital") markerColor = "#d63031";
    else if (centerType === "clinic") markerColor = "#00b894";
    else if (centerType === "wellness") markerColor = "#fdcb6e";
    
    return L.marker(latlng, { icon: createCustomIcon(markerColor) });
  };
  
  // Fly to a specific center
  const flyToCenter = (centerId) => {
    if (!mapRef.current || !geoJsonData) return;
    
    const center = geoJsonData.features.find(feature => feature.properties.id === centerId);
    if (center) {
      const [lng, lat] = center.geometry.coordinates;
      mapRef.current.flyTo([lat, lng], 12, {
        duration: 1.5
      });
    }
  };
  
  if (!isClient) {
    return <div style={{ height, width: "100%" }} className="bg-gray-200 animate-pulse rounded"></div>;
  }
  
  return (
    <div className="w-full" style={{ height: '300px' }}>
      <MapContainer
        center={initialView}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={map => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
          />
        )}
      </MapContainer>
      
      {/* Optional: Add a list of centers that can be clicked to fly to location */}
      {centers.length > 0 && (
        <div className="mt-4 max-h-40 overflow-y-auto shadow-sm rounded-md">
          <h3 className="font-bold text-lg p-2 bg-gray-100">Centres disponibles</h3>
          <ul className="divide-y divide-gray-200">
            {centers.map(center => (
              <li 
                key={center.id} 
                className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => flyToCenter(center.id)}
              >
                <p className="font-medium">{center.name}</p>
                {center.distance && <p className="text-sm text-gray-600">Distance: {center.distance}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Inject CSS for custom markers if needed */}
      <style jsx global>{`
        .custom-icon-d63031 {
          filter: hue-rotate(140deg);
        }
        .custom-icon-00b894 {
          filter: hue-rotate(80deg);
        }
        .custom-icon-fdcb6e {
          filter: hue-rotate(40deg);
        }
      `}</style>
    </div>
  );
};

// Example usage demonstration
const CentersMapDisplay = () => {
  // Sample data (replace with your actual data)
  const sampleCenters = [
    {
      id: 1,
      name: "Centre de soins de santé",
      type: "healthcare",
      latitude: 48.856614,
      longitude: 2.3522219,
      address: "123 Rue de Paris, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      distance: "100 km"
    },
    {
      id: 2,
      name: "Centre médical général",
      type: "hospital",
      latitude: 45.764043,
      longitude: 4.835659,
      address: "45 Avenue de Lyon, 69000 Lyon",
      phone: "+33 4 56 78 90 12",
      distance: "75 km"
    },
    {
      id: 3,
      name: "Clinique de bien-être",
      type: "wellness",
      latitude: 44.837789,
      longitude: -0.57918,
      address: "78 Rue de Bordeaux, 33000 Bordeaux",
      phone: "+33 5 67 89 01 23",
      distance: "50 km"
    },
    {
      id: 4,
      name: "Hôpital régional",
      type: "hospital",
      latitude: 43.296482,
      longitude: 5.36978,
      address: "90 Boulevard de Marseille, 13000 Marseille",
      phone: "+33 4 91 23 45 67",
      distance: "120 km"
    },
    {
      id: 5,
      name: "Nouveau Centre médical",
      type: "clinic",
      latitude: 50.62925,
      longitude: 3.057256,
      address: "34 Rue de Lille, 59000 Lille",
      phone: "+33 3 20 45 67 89",
      distance: "60 km"
    },
    {
      id: 6,
      name: "Centre de bien-être avancé",
      type: "wellness",
      latitude: 43.7009358,
      longitude: 7.2683912,
      address: "56 Avenue de Nice, 06000 Nice",
      phone: "+33 4 93 56 78 90",
      distance: "40 km"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <CentersMap centers={sampleCenters} height="600px" />
    </div>
  );
};

export default CentersMapDisplay;