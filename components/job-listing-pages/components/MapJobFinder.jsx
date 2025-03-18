"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import Map components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

export default function SimpleMap() {
  const mapRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const defaultCenter = [10.99835602, 77.01502627]; // Default map center
  const zoom = 11;

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return null; // Prevents hydration errors

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          if (!mapRef.current) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
