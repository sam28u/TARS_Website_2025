"use client";

import React, { useEffect, useState } from "react";

export default function ProjectsDashboard() {
  const [items, setItems] = useState([]);
  
  // Create form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  
  // Edit-in-place state
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({});
  
  // Loading and error state
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
      const res = await fetch(`${apiBase}/projects`, { cache: "no-store" });
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setItems(data.data || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setIsCreating(true);
    setCreateError(null);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (image) fd.append("image", image);
    
    try {
      const res = await fetch(`${apiBase}/projects`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Create failed. Check server logs.");
      }
      
      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      e.target.reset(); // Resets file input

      fetchItems();
    } catch (e) {
      console.error(e);
      setCreateError(e.message);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${apiBase}/projects/${id}`, {
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
    setEditFields({
      title: item.title || "",
      description: item.description || "",
      imageFile: null, // Reset image file on new edit
    });
    setEditError(null); // Clear previous edit errors
  }

  function cancelEdit() {
    setEditingId(null);
    setEditFields({});
    setEditError(null);
  }

  async function saveEdit(id) {
    setIsSaving(true);
    setEditError(null);

    try {
      const fd = new FormData();
      if (editFields.title !== undefined) fd.append("title", editFields.title);
      if (editFields.description !== undefined)
        fd.append("description", editFields.description);
      if (editFields.imageFile) fd.append("image", editFields.imageFile);
      
      const res = await fetch(`${apiBase}/projects/${id}`, {
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

  // Common input styling
  const inputClass = "p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const fileInputClass = "p-2 bg-gray-800 text-white rounded border border-gray-700 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600";
  const labelClass = "text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="p-6 w-full min-h-screen">
      <div>
        <a href="/dashboard" className="text-blue-400">Back To Dashboard</a>
      <h2 className="text-2xl text-white mb-4">Projects</h2>
      </div>
      
      {/* Create Form */}
      <form onSubmit={handleCreate} className="mb-6 p-4 bg-gray-900 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className={labelClass}>Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className={fileInputClass}
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            className={`${inputClass} min-h-[80px]`}
            rows={3}
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500 h-10"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
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
          <div key={it._id} className="p-4 bg-gray-800 text-white rounded shadow-lg flex flex-col justify-between">
            {editingId === it._id ? (
              // --- Edit State ---
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label htmlFor={`edit-title-${it._id}`} className={labelClass}>Title</label>
                  <input
                    id={`edit-title-${it._id}`}
                    value={editFields.title}
                    onChange={(e) =>
                      setEditFields((s) => ({ ...s, title: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`edit-description-${it._id}`} className={labelClass}>Description</label>
                  <textarea
                    id={`edit-description-${it._id}`}
                    value={editFields.description}
                    onChange={(e) =>
                      setEditFields((s) => ({
                        ...s,
                        description: e.target.value,
                      }))
                    }
                    className={`${inputClass} min-h-[80px]`}
                    rows={3}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`edit-image-${it._id}`} className={labelClass}>Replace Image (Optional)</label>
                  <input
                    id={`edit-image-${it._id}`}
                    type="file"
                    onChange={(e) =>
                      setEditFields((s) => ({
                        ...s,
                        imageFile: e.target.files[0],
                      }))
                    }
                    className={fileInputClass}
                  />
                </div>
                {editError && <div className="text-red-500 text-sm">Error: {editError}</div>}
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-100 break-words">{it.title || "No Title"}</h3>
                  <div className="text-sm text-gray-400 flex-shrink-0 ml-2">
                    {new Date(it.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {it.imageUrl && (
                  <img src={it.imageUrl} alt={it.title || 'Project Image'} className="my-2 rounded-md w-full h-48 object-cover" />
                )}
                <p className="text-sm text-gray-300 mb-2">{it.description || "No Description"}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => startEdit(it)}
                    className="text-yellow-500 hover:text-yellow-400 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(it._id)}
                    className="text-red-500 hover:text-red-400 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}