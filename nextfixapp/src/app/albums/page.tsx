"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/albummodal";
import Link from "next/link";
import Image from "next/image";

interface Album {
  ID: number;
  Slug: string;
  Name: string;
  Deskripsi: string;
  CreatedAt: string;
  UpdatedAt: string;
}

interface AlbumFormData {
  name: string;
  deskripsi: string;
}

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [formData, setFormData] = useState<AlbumFormData>({
    name: "",
    deskripsi: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Album[]>("http://localhost:8080/albums/");
      setAlbums(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch albums");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/albums/", formData);
      setIsCreateModalOpen(false);
      setFormData({ name: "", deskripsi: "" });
      fetchAlbums();
    } catch (err) {
      console.error("Error creating album:", err);
      setError("Failed to create album");
    }
  };

  const handleUpdateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;
    try {
      const albumId = selectedAlbum.ID;

      await axios.put(`http://localhost:8080/albums/${albumId}`, formData);
      setIsEditModalOpen(false);
      setSelectedAlbum(null);
      setFormData({ name: "", deskripsi: "" });
      fetchAlbums();
    } catch (err) {
      console.error("Error updating album:", err);
      setError("Failed to update album");
    }
  };

  const handleDeleteAlbum = async () => {
    if (!selectedAlbum) return;

    try {
        const albumId = selectedAlbum.ID;
        
        await axios.delete(`http://localhost:8080/albums/${albumId}`);
        
        setIsDeleteModalOpen(false);
        setSelectedAlbum(null);
        fetchAlbums();
    } catch (err) {
        console.error("Error deleting album:", err);
        setError("Failed to delete album");
    }
};


  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="py-14">
        <section className="rounded bg-neutral-600 py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-3">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  My Albums
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-6 block rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 sm:mt-0"
                >
                  Create Album
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="mt-8 text-center text-white">Loading...</div>
              ) : (
                /* Albums List */
                <div className="mt-6 flow-root sm:mt-8">
                  {albums.map((album) => (
                    <div key={album.ID} className="divide-y divide-gray-200 mb-6">
                      <div className="grid gap-4 pb-4 md:grid-cols-12 md:gap-6 md:pb-6">
                        {/* Album Image */}
                        <div className="order-1 w-1/2 max-w-sm md:order-1 md:col-span-3">
                          <Image
                            className="h-16 w-16 rounded"
                            src="/images/folder.png"
                            alt=""
                            width={64}
                            height={64}
                          />
                        </div>
                  
                        {/* Album Name */}
                        <div className="order-3 md:order-1 md:col-span-3">
                          <Link
                            href={`/albums/${album.ID}`}
                            className="text-base font-semibold text-white hover:underline"
                          >
                            {album.Name}
                          </Link>
                        </div>
                  
                        {/* Album Description */}
                        <div className="order-4 md:order-2 md:col-span-6">
                          <p className="text-white">
                            {album.Deskripsi.length > 200
                              ? `${album.Deskripsi.substring(0, 200)}...`
                              : album.Deskripsi}
                          </p>
                        </div>
                            
                        {/* Action Buttons */}
                        <div className="order-5 md:order-3 md:col-span-12 flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => {
                              setSelectedAlbum(album);
                              setFormData({
                                name: album.Name,
                                deskripsi: album.Deskripsi,
                              });
                              setIsEditModalOpen(true);
                            }}
                            className="rounded-lg bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAlbum(album);
                              setIsDeleteModalOpen(true);
                            }}
                            className="rounded-lg bg-red-700 px-3 py-2 text-sm text-white hover:bg-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              )}
            </div>
          </div>
        </section>

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Album"
        >
          <form onSubmit={handleCreateAlbum} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Album
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
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
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                rows={4}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800"
            >
              Create Album
            </button>
          </form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Album"
        >
          <form onSubmit={handleUpdateAlbum} className="space-y-4">
            <div>
              <label
                htmlFor="edit-name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Album
              </label>
              <input
                type="text"
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                required
              />
            </div>
            <div>
              <label
                htmlFor="edit-deskripsi"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Deskripsi Album
              </label>
              <textarea
                id="edit-deskripsi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                rows={4}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-white hover:bg-red-800"
            >
              Update Album
            </button>
          </form>
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Album"
        >
          <div className="text-center">
            <p className="mb-4 text-gray-500">
              Are you sure you want to delete this album?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                No, cancel
              </button>
              <button
                onClick={handleDeleteAlbum}
                className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
