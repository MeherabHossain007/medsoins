"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const CentersMap = ({
  centers = [],
  height = "500px",
  initialView = [46.603354, 1.888334],
  zoom = 5,
}) => {
  const mapRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [L, setL] = useState(null);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);

      // Fix Leaflet icons issue in Next.js
      delete leaflet.default.Icon.Default.prototype._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  useEffect(() => {
    if (!centers.length) return;

    const features = centers.map((center) => ({
      type: "Feature",
      properties: {
        id: center.id,
        name: center.name,
        type: center.type || "healthcare",
        address: center.address,
        phone: center.phone,
        description: center.description || "",
        distance: center.distance,
      },
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    }));

    setGeoJsonData({ type: "FeatureCollection", features });
  }, [centers]);

  if (!isClient || !L) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="bg-gray-200 animate-pulse rounded"
      ></div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <MapContainer
        center={initialView}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={{ color: "#007bff", fillOpacity: 0.7 }}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                const { name, address, phone, distance, description } =
                  feature.properties;
                layer.bindPopup(`
                  <div>
                    <h3 class="font-bold text-lg">${name}</h3>
                    ${address ? `<p>${address}</p>` : ""}
                    ${phone ? `<p>Tel: ${phone}</p>` : ""}
                    ${distance ? `<p>Distance: ${distance}</p>` : ""}
                    ${description ? `<p>${description}</p>` : ""}
                  </div>
                `);
              }
            }}
            pointToLayer={(feature, latlng) => L.marker(latlng)}
          />
        )}
      </MapContainer>
    </div>
  );
};

// Example component to display the map with sample data
const CentersMapDisplay = () => {
  const sampleCenters = [
    {
      id: 1,
      name: "Centre de soins de santé",
      type: "healthcare",
      latitude: 48.856614,
      longitude: 2.3522219,
      address: "123 Rue de Paris, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      distance: "100 km",
    },
    {
      id: 2,
      name: "Centre médical général",
      type: "hospital",
      latitude: 45.764043,
      longitude: 4.835659,
      address: "45 Avenue de Lyon, 69000 Lyon",
      phone: "+33 4 56 78 90 12",
      distance: "75 km",
    },
    {
      id: 3,
      name: "Clinique de bien-être",
      type: "wellness",
      latitude: 44.837789,
      longitude: -0.57918,
      address: "78 Rue de Bordeaux, 33000 Bordeaux",
      phone: "+33 5 67 89 01 23",
      distance: "50 km",
    },
    {
      id: 4,
      name: "Hôpital régional",
      type: "hospital",
      latitude: 43.296482,
      longitude: 5.36978,
      address: "90 Boulevard de Marseille, 13000 Marseille",
      phone: "+33 4 91 23 45 67",
      distance: "120 km",
    },
    {
      id: 5,
      name: "Nouveau Centre médical",
      type: "clinic",
      latitude: 50.62925,
      longitude: 3.057256,
      address: "34 Rue de Lille, 59000 Lille",
      phone: "+33 3 20 45 67 89",
      distance: "60 km",
    },
    {
      id: 6,
      name: "Centre de bien-être avancé",
      type: "wellness",
      latitude: 43.7009358,
      longitude: 7.2683912,
      address: "56 Avenue de Nice, 06000 Nice",
      phone: "+33 4 93 56 78 90",
      distance: "40 km",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <CentersMap centers={sampleCenters} height="300px" />
    </div>
  );
};

export default CentersMapDisplay;
