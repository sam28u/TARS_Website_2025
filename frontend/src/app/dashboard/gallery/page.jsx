"use client";

import React, { useEffect, useState } from "react";

export default function GalleryDashboard() {
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null); // For the create form

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editImage, setEditImage] = useState(null); // For the edit form

  // State for loading and errors
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [editError, setEditError] = useState(null);

  const contactApi =
    process.env.NEXT_PUBLIC_CONTACT_API || "http://localhost:4000/api/contact";
  const apiOrigin = contactApi.replace(/\/api\/contact\/?$/, "");
  const apiBase = `${apiOrigin}/api`;

  useEffect(() => {
    fetchItems();
  }, [apiBase]);

  async function fetchItems() {
    try {
      const res = await fetch(`${apiBase}/gallery`, { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setItems(data.data || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!image) {
      setCreateError("Please select an image to upload.");
      return;
    }

    setIsCreating(true);
    setCreateError(null);

    const fd = new FormData();
    fd.append("image", image);

    try {
      const res = await fetch(`${apiBase}/gallery`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Create failed. Check server logs.");
      }
      setImage(null);
      e.target.reset(); // Reset file input
      fetchItems();
    } catch (e) {
      console.error("Gallery create error:", e);
      setCreateError(e.message);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`${apiBase}/gallery/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  }

  function startEdit(item) {
    setEditingId(item._id);
    setEditImage(null); // Clear edit image state
    setEditError(null); // Clear edit error state
  }

  function cancelEdit() {
    setEditingId(null);
    setEditImage(null);
    setEditError(null);
  }

  async function saveEdit(id) {
    if (!editImage) {
      setEditError("Please select a new image file.");
      return;
    }

    setIsSaving(true);
    setEditError(null);

    try {
      const fd = new FormData();
      fd.append("image", editImage);

      const res = await fetch(`${apiBase}/gallery/${id}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Update failed.");
      }

      cancelEdit();
      fetchItems();
    } catch (e) {
      console.error(e);
      setEditError(e.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div>
        <a href="/dashboard" className="text-blue-400">Back To Dashboard</a>
        <h2 className="text-2xl text-white mb-4">Gallery</h2>
      </div>

      {/* Create Form */}
      <form
        onSubmit={handleCreate}
        className="mb-6 p-4 bg-gray-900 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
      >
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Upload New Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 bg-gray-800 text-white rounded border border-gray-700 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
          />
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
            disabled={isCreating}
          >
            {isCreating ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        {createError && (
          <div className="md:col-span-2 text-red-500 text-sm">
            Error: {createError}
          </div>
        )}
      </form>

      {/* Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div
            key={it._id}
            className="p-4 bg-gray-800 text-white rounded shadow-lg"
          >
            {editingId === it._id ? (
              // --- Edit State ---
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-100">
                  Editing Image
                </h3>
                <div className="flex flex-col">
                  <label
                    htmlFor={`edit-image-${it._id}`}
                    className="text-sm font-medium text-gray-300 mb-1"
                  >
                    Replace Image
                  </label>
                  <input
                    type="file"
                    id={`edit-image-${it._id}`}
                    onChange={(e) => setEditImage(e.target.files[0])}
                    className="p-2 bg-gray-700 text-white rounded border border-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-600 file:text-gray-300 hover:file:bg-gray-500"
                  />
                </div>
                {editError && (
                  <div className="text-red-500 text-sm">Error: {editError}</div>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => saveEdit(it._id)}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-500"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // --- View State ---
              <div>
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-400">
                    {new Date(it.createdAt).toLocaleString()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(it)}
                      className="text-yellow-500 hover:text-yellow-400 font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(it._id)}
                      className="text-red-500 hover:text-red-400 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {it.imageUrl && (
                  <img
                    src={it.imageUrl}
                    alt=""
                    className="mt-2 rounded-md w-full h-48 object-cover"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
