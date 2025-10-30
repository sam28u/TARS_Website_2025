"use client";

import React, { useEffect, useState } from 'react';

export default function MessagesPage(){
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const contactApi = process.env.NEXT_PUBLIC_CONTACT_API || 'http://localhost:4000/api/contact';
  const apiOrigin = contactApi.replace(/\/api\/contact\/?$/, '');
  const apiBase = `${apiOrigin}/api`;

  async function fetchMessages(){
    setLoading(true);
    try{
  const res = await fetch(`${apiBase}/messages`);
      const data = await res.json();
      setMessages(data.data || []);
    }catch(e){ console.error(e); setMessages([]); }
    setLoading(false);
  }

  useEffect(()=>{ fetchMessages(); }, []);

  async function handleDelete(id){
    if(!confirm('Delete this message?')) return;
    try{
  const res = await fetch(`${apiBase}/messages/${id}`, { method: 'DELETE' });
      if(!res.ok) throw new Error('delete failed');
      fetchMessages();
    }catch(e){ console.error(e); }
  }

  return (
    <div className="p-4 md:p-8 w-full min-h-screen">
      <div>
        <a href="/dashboard" className="text-blue-400">Back To Dashboard</a>
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Contact Form Messages</h1>
      </div>
      <div>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : messages.length > 0 ? (
          messages.map(msg => (
            <div key={msg._id} className="border border-gray-700 p-4 m-4 max-w-2xl mx-auto rounded-lg bg-gray-800 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg mb-2 text-purple-300">{msg.name}</div>
                  <div className="text-gray-300 whitespace-pre-wrap">{msg.message}</div>
                  <div className="text-sm text-gray-400 mt-3">{new Date(msg.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <button onClick={()=>handleDelete(msg._id)} className="bg-red-600 p-2">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No messages found.</p>
        )}
      </div>
    </div>
  );
}