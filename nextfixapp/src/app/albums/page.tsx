"use client";

import { useEffect, useState } from "react";
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

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get<Album[]>("http://localhost:8080/albums/")
      .then((response) => {
        console.log("Albums received:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  const handleOpenModal = (albumId: number) => {
    setSelectedAlbumId(albumId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAlbumId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl py-6 text-white sm:px-6 lg:px-8">
      <div className="py-14">
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-md p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <div
                    className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5"
                >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create Album</h3>
                    <button
                        type="button"
                        className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
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
                
                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="/albums" method="POST">
                      <div>
                          <label
                              htmlFor="name"
                              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Nama Album
                          </label>
                          <input
                              type="text"
                              name="name"
                              id="name"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                              placeholder="nama album"
                              required
                          />
                      </div>
                      <div>
                          <label
                              htmlFor="deskripsi"
                              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Deskripsi Album
                          </label>
                          <textarea
                              name="deskripsi"
                              id="deskripsi"
                              rows={4}
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                              placeholder="deskripsi album"
                              required
                          ></textarea>
                      </div>
                      <button
                          type="submit"
                          className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Create Album
                      </button>
                  </form>
                </div>
              </div>
            </div>
        </div>

        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white dark:text-white sm:text-2xl">My Albums</h2>
            <div className="mt-6 sm:mt-0">
                <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    type="button"
                >
                    Create Album
                </button>
            </div>
        </div>
        <section className="rounded bg-neutral-600 py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-3">
              <div className="mx-auto max-w-5xl">
                  {albums.map((album) => (
                      <div key={album.ID} className="mt-6 flow-root sm:mt-8">
                          <div className="divide-y divide-gray-200">
                              <div className="grid gap-4 pb-4 md:grid-cols-12 md:gap-6 md:pb-6">
                                  <dl className="order-3 items-center md:order-1 md:col-span-3">
                                      <dd className="text-base font-semibold text-white">
                                          <Link href={`/albums/${album.ID}`}>
                                              <h3 className="hover:underline">{album.Name}</h3>
                                          </Link>
                                      </dd>
                                  </dl>
                                  <dl className="order-4 md:order-2 md:col-span-4">
                                      <dd className="text-white">{album.Deskripsi}</dd>
                                  </dl>
                                  <div className="order-1 flex content-center items-center justify-between md:order-3">
                                    <button
                                        id={`actionsMenuDropdown1${album.ID}`}
                                        data-dropdown-toggle={`dropdownOrder1${album.ID}`}
                                        type="button"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Actions</span>
                                        <svg
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeWidth="4"
                                                d="M6 12h.01m6 0h.01m5.99 0h.01"
                                            ></path>
                                        </svg>
                                    </button>

                                    <div
                                        id={`dropdownOrder1${album.ID}`}
                                        className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                                        data-popper-placement="bottom"
                                    >
                                      <ul
                                          className="p-2 text-left text-sm font-medium text-gray-200 dark:text-gray-400"
                                          aria-labelledby="actionsMenuDropdown1"
                                      >
                                        <li>
                                          <button
                                            type="button"
                                            data-modal-target={`editAlbumModal${album.ID}`}
                                            data-modal-toggle={`editAlbumModal${album.ID}`}
                                            className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                          >
                                            <svg
                                              className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                            />
                                            </svg>
                                            <span>Edit Album</span>
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            type="button"
                                            data-modal-target={`deleteAlbumModal${album.ID}`}
                                            data-modal-toggle={`deleteAlbumModal${album.ID}`}
                                            className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600"
                                          >
                                            <svg
                                              className="me-1.5 h-4 w-4"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                            <path
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                            ></path>
                                            </svg>
                                            Delete Album
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                </div>
                              </div>
                        </div>

                        <div
                          id={`editAlbumModal${album.ID}`}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
                        >
                        
                          <div className="relative max-h-full w-full max-w-md p-4">
                            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                                <div
                                    className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5"
                                >
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Edit Album: {album.Name}
                                    </h3>
                                    <button
                                        type="button"
                                        className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="editAlbumModal{{ $album->id }}"
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
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-4 md:p-5">
                                    <form
                                        className="space-y-4"
                                        action="/albums/$"
                                        method="POST"
                                    >
                                        @csrf
                                        @method('PUT')
                                        <div>
                                            <label
                                                htmlFor={`editName${album.ID}`}
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Nama Album
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="editName{{ $album->id }}"
                                                value="{{ $album->name }}"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                                                autoComplete="off"
                                                placeholder="nama album"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="editDeskripsi{{ $album->id }}"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Deskripsi Album
                                            </label>
                                            <textarea
                                                name="deskripsi"
                                                id="editDeskripsi{{ $album->id }}"
                                                rows={4}
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                                                placeholder="deskripsi album"
                                                required
                                            >
                                            {album.Deskripsi}</textarea
                                            >
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            Update Album
                                        </button>
                                    </form>
                                </div>
                              </div>
                          </div>
                      </div>

                      <div
                          id={`deleteAlbumModal${album.ID}`}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="fixed left-0 right-0 top-0 z-50 hidden h-modal w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
                      >
                          <div className="relative h-full w-full max-w-md p-4 md:h-auto">
                              <div
                                  className="relative rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5"
                              >
                                  <button
                                      type="button"
                                      className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-toggle="deleteModal{{ $album->id }}"
                                  >
                                      <svg
                                          aria-hidden="true"
                                          className="h-5 w-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                          ></path>
                                      </svg>
                                      <span className="sr-only">Close modal</span>
                                  </button>
                                  <svg
                                      className="mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500"
                                      aria-hidden="true"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                      <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                      ></path>
                                  </svg>
                                  <p className="mb-4 text-gray-500 dark:text-gray-300">
                                      Are you sure you want to delete this album?
                                  </p>
                                  <div className="flex items-center justify-center space-x-4">
                                      <button
                                          data-modal-toggle={`deleteModal${album.ID}`}
                                          type="button"
                                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                                      >
                                          No, cancel
                                      </button>
                                      <form action="{{ route('albums.destroy', $album->id) }}" method="POST">
                                          @csrf
                                          @method('DELETE')
                                          <button
                                              type="submit"
                                              className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                          >
                                              Yes, I'm sure
                                          </button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  ))}
              </div>
          </div>
        </section>
      </div>
    </div>
  );
}
