"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Album {
  ID: number;
  Slug: string;
  Name: string;
  Deskripsi: string;
  CreatedAt: string;
  UpdatedAt: string;
}

interface Movie {
  ID: number;
  Slug: string;
  Title: string;
  Description: string;
  ImagePath: string;
  Year: string;
  GenreID: number;
  Genre: Genre;
  CreatedAt: string;
  UpdatedAt: string;
}

interface Genre {
  ID: number;
  Name: string;
}

export default function AlbumPage() {
  const params = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAlbum();
    fetchMovies();
  }, []);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Album>(`http://localhost:8080/albums/${params.id}`);
      setAlbum(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch album details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Movie[]>(`http://localhost:8080/albums/${params.id}/movies/`);
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (movieId: number) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovieId) return;

    try {
      await axios.delete(`http://localhost:8080/albums/${params.id}/movies/${selectedMovieId}`);
      setIsDeleteModalOpen(false);
      setSelectedMovieId(null);
      fetchMovies(); // Refresh daftar movie
    } catch (err) {
      console.error("Error deleting movie:", err);
      setError("Failed to delete movie");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="py-14">
        <section className="rounded bg-neutral-600 py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-3">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="sm:flex sm:flex-col sm:items-start gap-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {album?.Name}
                </h2>
                <p className="text-base text-gray-300 sm:text-lg">
                  {album?.Deskripsi}
                </p>
              </div>

              {/* Movies */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white">Movies</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {movies.map((movie) => (
                    <div
                      key={movie.ID}
                      className="flex flex-col w-full max-w-[380px] rounded-lg border border-black bg-neutral-800 shadow dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Link href={`/movies/${movie.Slug}`}>
                        <img
                          className="w-full rounded-t-lg"
                          src={`../../${movie.ImagePath}.jpg`}
                          alt={movie.Title}
                        />
                      </Link>
                      <div className="flex flex-col p-4">
                        <div className="flex items-center justify-between text-gray-500">
                          <Link href={`/movies/${movie.Slug}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                              {movie.Title.length > 20
                                ? `${movie.Title.substring(0, 20)}...`
                                : movie.Title}
                            </h5>
                          </Link>
                          <span className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800">
                            {/* Icon */}
                            <svg
                              className="mr-1 h-3 w-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            {movie.Genre.Name}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedMovieId(movie.ID);
                              setIsDeleteModalOpen(true);
                            }}
                            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal */}
              {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Confirm Delete</h3>
                    <p className="mt-2">Are you sure you want to delete this movie?</p>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="rounded bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteMovie}
                        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
