"use client";

import React, { useEffect, useState } from "react";

export default function LiveEventsDashboard() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  // --- State for loading and errors ---
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // --- Simplified API path ---
  const apiBase = `${
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
  }/api`;

  useEffect(() => {
    fetchItems();
  }, [apiBase]);

  async function fetchItems() {
    try {
      const res = await fetch(`${apiBase}/live-events`, { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setItems(data.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setIsUploading(true); // Start loading
    setUploadError(null); // Clear previous errors

    const fd = new FormData();
    fd.append("desc", desc);
    fd.append("link", link);
    if (image) fd.append("image", image);

    try {
      const res = await fetch(`${apiBase}/live-events`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        // Try to get a better error message from the backend
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Create failed. Check server logs.");
      }

      // Reset all form fields
      setImage(null);
      setDesc("");
      setLink("");
      e.target.reset(); // Resets the file input

      fetchItems();
    } catch (err) {
      console.error(err);
      setUploadError(err.message); // Display error to the user
    } finally {
      setIsUploading(false); // Stop loading
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${apiBase}/live-events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div>
        <a href="/dashboard" className="text-blue-400">
          Back To Dashboard
        </a>
        <h2 className="text-2xl text-white mb-4">Live Events</h2>
      </div>

      <form
        onSubmit={handleCreate}
        className="mb-6 p-4 bg-gray-900 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Description Input */}
        <div className="flex flex-col">
          <label
            htmlFor="desc"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            placeholder="Event Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Link Input */}
        <div className="flex flex-col">
          <label
            htmlFor="link"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Link
          </label>
          <input
            type="text"
            id="link"
            placeholder="https://unstop.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Image Input */}
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 bg-gray-800 text-white rounded border border-gray-700 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
          />
        </div>
        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Event"}
          </button>
        </div>

        {/* Error Message Display */}
        {uploadError && (
          <div className="md:col-span-2 text-red-500 text-sm">
            Error: {uploadError}
          </div>
        )}
      </form>

      {/* --- Updated Display --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div
            key={it._id}
            className="p-4 bg-gray-800 text-white rounded shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-400">
                {new Date(it.createdAt).toLocaleString()}
              </div>
              <button
                onClick={() => handleDelete(it._id)}
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Delete
              </button>
            </div>
            {it.imageUrl && (
              <img
                src={it.imageUrl}
                alt={it.desc || "Event Image"}
                className="mt-2 rounded-md w-full h-48 object-cover"
              />
            )}

            <div className="mt-2">
              <p className="text-lg font-semibold text-gray-100">
                {it.desc || "No Description"}
              </p>
              {it.link && (
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm truncate block"
                >
                  {it.link}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
