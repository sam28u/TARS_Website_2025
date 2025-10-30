"use client";

import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 p-10 text-white w-full min-h-screen">
      <Link href="/" className="text-md text-blue-600 hover:text-blue-400">Back to Website</Link>
      <Link href="/dashboard/projects">
        <div className="cursor-pointer hover:underline text-2xl">Projects</div>
      </Link>
      <Link href="/dashboard/latest">
        <div className="cursor-pointer hover:underline text-2xl">Latest In Tech</div>
      </Link>
      <Link href="/dashboard/gallery">
        <div className="cursor-pointer hover:underline text-2xl">Gallery</div>
      </Link>
      <Link href="/dashboard/live-events">
        <div className="cursor-pointer hover:underline text-2xl">Live Events</div>
      </Link>
      <Link href="/dashboard/messages">
        <div className="cursor-pointer hover:underline text-2xl">View Messages</div>
      </Link>
    </div>
  );
};

export default page;