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
  dataUrl = "/data/health-centers.json",
  centerId = null, // Optional ID to filter a specific center
  height = "500px",
  initialView = [46.603354, 1.888334],
  zoom = 5,
}) => {
  const mapRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [centers, setCenters] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [L, setL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Leaflet
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

  // Fetch and process data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(dataUrl);
        
        console.log(dataUrl);
        console.log("Response:", response); // Debugging

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        // Ensure centers exist
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Data is empty or not an array.");
        }

        const filteredCenters = centerId
          ? data.filter(
              (center) =>
                center.id === parseInt(centerId) || center.id === centerId
            )
          : data;

        setCenters(filteredCenters);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching center data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataUrl, centerId]);

  // Generate GeoJSON data
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
        email: center.email,
        hours: center.hours,
        description: center.description || "",
        urgentInfo: center.urgentInfo || "",
      },
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    }));

    setGeoJsonData({ type: "FeatureCollection", features });

    // If only one center is displayed, center the map on it
    if (centers.length === 1 && mapRef.current) {
      mapRef.current.setView(
        [centers[0].latitude, centers[0].longitude],
        12 // Zoom closer to single location
      );
    }
  }, [centers]);

  // Loading state
  if (!isClient || !L || loading) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="bg-gray-200 animate-pulse rounded"
      ></div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="bg-red-100 rounded p-4 flex items-center justify-center"
      >
        <p className="text-red-600">Error loading map data: {error}</p>
      </div>
    );
  }

  // Empty state
  if (centers.length === 0) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="bg-gray-100 rounded p-4 flex items-center justify-center"
      >
        <p className="text-gray-600">
          {centerId
            ? `No center found with ID: ${centerId}`
            : "No centers available"}
        </p>
      </div>
    );
  }

  // Define marker colors based on center type
  const getMarkerColor = (type) => {
    const typeColors = {
      healthcare: "#3B82F6", // blue
      hospital: "#EF4444", // red
      clinic: "#10B981", // green
      wellness: "#8B5CF6", // purple
    };
    return typeColors[type] || "#6B7280"; // default gray
  };

  // Create custom icon function
  const createCustomIcon = (type) => {
    if (!L) return null;

    return new L.Icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

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
            style={(feature) => ({
              color: getMarkerColor(feature.properties.type),
              fillOpacity: 0.7,
            })}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                const {
                  name,
                  address,
                  phone,
                  email,
                  hours,
                  description,
                  urgentInfo,
                } = feature.properties;
                layer.bindPopup(`
                  <div class="max-w-xs">
                    <h3 class="font-bold text-lg">${name}</h3>
                    ${
                      address
                        ? `<p class="text-sm my-1"><strong>Adresse:</strong> ${address}</p>`
                        : ""
                    }
                    ${
                      phone
                        ? `<p class="text-sm my-1"><strong>Tel:</strong> ${phone}</p>`
                        : ""
                    }
                    ${
                      email
                        ? `<p class="text-sm my-1"><strong>Email:</strong> ${email}</p>`
                        : ""
                    }
                    ${
                      hours
                        ? `<p class="text-sm my-1"><strong>Horaires:</strong> ${hours}</p>`
                        : ""
                    }
                    ${
                      description
                        ? `<p class="text-sm mt-2">${description.substring(
                            0,
                            100
                          )}${description.length > 100 ? "..." : ""}</p>`
                        : ""
                    }
                    ${
                      urgentInfo
                        ? `<p class="text-sm mt-2 text-red-600"><strong>Urgence:</strong> ${urgentInfo.substring(
                            0,
                            100
                          )}${urgentInfo.length > 100 ? "..." : ""}</p>`
                        : ""
                    }
                  </div>
                `);
              }
            }}
            pointToLayer={(feature, latlng) => {
              return L.marker(latlng, {
                icon: createCustomIcon(feature.properties.type),
              });
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

// Example component to display the map
const CentersMapDisplay = ({ centerId }) => {
  return (
    <div className="container mx-auto p-4">
      <CentersMap
        dataUrl="/data/health-centers.json"
        centerId={centerId}
        height="300px"
      />
    </div>
  );
};

export default CentersMapDisplay;
