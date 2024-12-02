// src/components/AddToAlbumModal.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Album {
  ID: number; // Match Go struct casing
  Name: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
}

interface AddToAlbumModalProps {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToAlbumModal({
  movieId,
  isOpen,
  onClose,
}: AddToAlbumModalProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all albums when modal opens
  useEffect(() => {
    const fetchAlbums = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Album[]>(
          "http://localhost:8080/albums/"
        );
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setError("Failed to load albums");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [isOpen]);

  // Add movie to album
  const handleAddToAlbum = async (albumId: number) => {
    try {
      await axios.post(
        `http://localhost:8080/albums/${albumId}/movies/${movieId}`
      );
      onClose();
    } catch (error) {
      console.error("Error adding movie to album:", error);
      setError("Failed to add movie to album");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Album
            </h3>
            <button
              onClick={onClose}
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            {loading && <p className="text-center">Loading albums...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <ul className="mb-2 space-y-4">
              {albums.map((album) => (
                <li key={album.ID}>
                  <button
                    onClick={() => handleAddToAlbum(album.ID)}
                    className="w-full rounded-lg p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {album.Name}
                    </div>
                    {album.Description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {album.Description}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
