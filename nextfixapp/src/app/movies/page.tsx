// src/app/movies/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import AddToAlbumModal from "../components/addtoalbummodal";

interface Genre {
  ID: number;
  Name: string;
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

export default function MoviesPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get<Movie[]>("http://localhost:8080/movies/")
      .then((response) => {
        console.log("Movies received:", response.data);

        setMovies(response.data);

        // Extract unique genres properly
        const uniqueGenres = Array.from(
          new Map(
            response.data
              .filter((movie) => movie.Genre && movie.Genre.ID) // Filter out null genres
              .map((movie) => [movie.Genre.ID, movie.Genre]) // Use Map to ensure uniqueness by ID
          ).values()
        );

        console.log("Unique genres:", uniqueGenres);
        setGenres(uniqueGenres);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleOpenModal = (movieId: number) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-screen">
      {/* Video Section */}
      <div className="video relative w-screen">
        <Link
          href="https://www.youtube.com/watch?v=bpHhnDQuFgU"
          target="_blank"
        >
          <img
            className="absolute top-36 z-10 h-auto w-[800px] p-3 px-12 py-64"
            src="/images/qothomepage.png"
            alt="Cover"
            style={{ pointerEvents: "auto" }}
          />
        </Link>
        <video
          src="/videos/bumperqot.mp4"
          className="z-0 h-full w-full"
          muted
          autoPlay
          loop
        ></video>

        {/* Movies by Genre */}
        <section
          className="absolute bottom-0 left-0 w-full p-0 dark:bg-gray-900"
          style={{ height: "25%", pointerEvents: "auto" }}
        >
          {genres.map((genre) => (
            <div
              key={genre.ID}
              className="relative w-full px-0 py-8 lg:px-0 lg:py-2"
            >
              <h2 className="mb-4 text-3xl font-bold text-white">
                {genre.Name}
              </h2>
              <Swiper
                modules={[Navigation, FreeMode]}
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                navigation={true}
                className="mySwiper"
              >
                {movies
                  .filter((movie) => movie.GenreID === genre.ID)
                  .map((movie) => (
                    <SwiperSlide
                      key={movie.ID}
                      style={{ width: "auto", marginRight: "10px" }}
                    >
                      {/* Movie Card */}
                      <div className="w-full max-w-[380px] rounded-lg border border-black bg-neutral-800 shadow dark:border-gray-700 dark:bg-gray-800">
                        <Link href={`/movies/${movie.Slug}`}>
                          <img
                            className="w-full rounded-t-lg"
                            src={`${movie.ImagePath}.jpg`}
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
                              {genre.Name}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            {/* Modal toggle button */}
                            <button
                              onClick={() => handleOpenModal(movie.ID)}
                              // Handle modal open
                              type="button"
                            >
                              {/* Plus Icon */}
                              <svg
                                className="h-6 w-6 text-red-700 hover:text-red-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          ))}
        </section>
      </div>
      {/* Add to Album Modal */}
      {selectedMovieId && (
        <AddToAlbumModal
          movieId={selectedMovieId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
