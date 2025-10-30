"use client";

import { useState } from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

// Footer component: contact form and quick links
const tarsLogoMobile = "/TarsLogo 1(f).svg";
const tarsTextMobile = "/TARS(f).svg";
const tarsLogoDesktop = "/TarsLogo 1(f).svg";
const tarsTextDesktop = "/TARS(f).svg";

function Footer({ refs }) {
  // Prefer backend contact API
  const CONTACT_API =
    process.env.NEXT_PUBLIC_CONTACT_API ||
    process.env.NEXT_PUBLIC_CONTACT_FALLBACK ||
    "http://localhost:4000/api/contact";

  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitStatus("Please fill in all fields");
      return;
    }

    const url = CONTACT_API;
    if (!url) {
      console.error(
        "No contact endpoint configured. Set NEXT_PUBLIC_CONTACT_API."
      );
      setSubmitStatus(
        "Service temporarily unavailable. Please try again later."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Debug: log request + response for easier tracing in browser console
      console.debug("Contact form POST", {
        url,
        body: formData,
        status: response.status,
        ok: response.ok,
        headers: response.headers,
      });

      const contentType = response.headers.get("content-type") || "";
      let parsed = null;
      if (contentType.includes("application/json")) {
        try {
          parsed = await response.json();
        } catch (e) {
          console.debug("Failed parsing JSON response", e);
        }
      }

      console.debug("Contact form response parsed", parsed);

      if (response.ok) {
        const serverMsg = parsed?.message || parsed?.resultMessage || null;
        setSubmitStatus(
          serverMsg
            ? `Message sent: ${serverMsg}`
            : "Message sent successfully!"
        );
        setFormData({ name: "", message: "" });
      } else {
        throw new Error(
          parsed?.error || `Server responded with ${response.status}`
        );
      }
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again.");
      console.error("Contact submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full lg:bg-black bg-custom-dark-gradient-tars inter bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 lg:bg-black"></div>
      <div className="relative z-10">
        {/* mobile and tablet */}
        <div className="lg:hidden flex container mx-auto py-10 px-5">
          <div className="w-16 flex flex-col items-center justify-start pt-0">
            <img
              src={tarsLogoMobile}
              alt="TARS Logo"
              width="50"
              className="mb-5"
              height="70"
            />
            <img src={tarsTextMobile} alt="TARS Text" width="30" height="30" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            <div className="mb-8">
              <div className="font-bold text-xl mb-6 text-center">
                CONTACT US
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/90 text-black font-medium rounded-lg w-1/2 px-4 py-2 md:p-4 text-sm outline-none placeholder-gray-600"
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/90 text-black p-4 min-h-40 text-sm font-medium rounded-lg outline-none resize-none w-full placeholder-gray-600"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-24 bg-blue-400 text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  {isSubmitting ? "..." : "Submit"}
                </button>
                {submitStatus && (
                  <div
                    className={`text-sm p-2 rounded ${
                      submitStatus.includes("success")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 ml-[-50px]">
              <div className="flex justify-center gap-6 mb-4">
                <FaInstagram
                  size="24"
                  className="hover:scale-110 cursor-pointer transition-all ease-in text-white"
                />
                <FaFacebook
                  size="24"
                  className="hover:scale-110 cursor-pointer transition-all ease-in text-white"
                />
                <FaLinkedin
                  size="24"
                  className="hover:scale-110 cursor-pointer transition-all ease-in text-white"
                />
              </div>

              <div className="text-center text-xs px-2 leading-tight text-gray-300">
                <div>
                  ©2025 The Autonomous & Robotics Society IIIT Bhubaneswar.
                </div>
                <div>None of the right reserved</div>
                <div className="mt-1">Designed & Developed by Om Satyajit</div>
              </div>
            </div>
          </div>
        </div>
        {/* desktop */}
        <div className="hidden container mx-auto lg:block pt-10 pb-0">
          <div className="container mx-auto max-w-6xl px-4 flex w-full justify-center gap-20">
            <div className="mb-3">
              <div className="text-center lg:text-left flex flex-col gap-7">
                <img
                  src={tarsLogoDesktop}
                  alt="TARS Logo"
                  width="100"
                  height="100"
                  className="pr-3"
                />
                <img
                  src={tarsTextDesktop}
                  alt="TARS Text"
                  width="70"
                  height="100"
                />
              </div>
            </div>

            <div className="flex flex-col w-6/7 lg:flex-row gap-6 lg:gap-8 py-30 pb-25">
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-3">
                  CONTACT US
                </div>
                <div className="flex gap-4 flex-col">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white font-semibold rounded-md w-1/2 max-w-md p-3 text-sm outline-none text-black"
                  />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white text-black p-3 min-h-32 sm:min-h-40 lg:min-h-60 text-sm font-semibold rounded-md outline-none resize-none w-full"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-1/4 max-w-32 bg-[#88B6FE] text-black text-sm cursor-pointer font-bold px-4 py-2 rounded-md hover:bg-[#7AA5ED] transition-colors"
                  >
                    {isSubmitting ? "SENDING..." : "SUBMIT"}
                  </button>
                  {submitStatus && (
                    <div
                      className={`text-sm p-2 rounded ${
                        submitStatus.includes("success")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {submitStatus}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full pt-14 lg:w-1/2 order-2 lg:order-1">
                <div className="font-semibold text-xl sm:text-2xl mb-0">
                  QUICK LINKS :
                </div>
                <ul className="text-sm sm:text-md py-6 space-y-2">
                  <li className="my-1">
                    <span
                      className="relative text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:right-0 before:origin-right"
                      onClick={() => handleScroll(refs.aboutUsRef)}
                    >
                      About us
                    </span>
                  </li>
                  <li className="my-1">
                    <span
                      className="relative text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:right-0 before:origin-right"
                      onClick={() => handleScroll(refs.latestRef)}
                    >
                      Blogs
                    </span>
                  </li>
                  <li className="my-1">
                    <span
                      className="relative text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:right-2 before:origin-right"
                      onClick={() => handleScroll(refs.projectsRef)}
                    >
                      Projects
                    </span>
                  </li>
                  <li className="my-1">
                    <span
                      className="relative text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:right-0 before:origin-right"
                      onClick={() => handleScroll(refs.ourTeamRef)}
                    >
                      Our Team
                    </span>
                  </li>
                  <li className="my-1">
                    <span
                      className="relative text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:right-0 before:origin-right"
                      onClick={() => handleScroll(refs.liveeventsRef)}
                    >
                      Live Events
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col font-light text-xs w-full pr-20">
                  <div className="flex justify-center gap-10 p-5">
                    <Link href="https://www.instagram.com/tars_iiit_bbsr/">
                      <FaInstagram
                        size="32"
                        className="hover:scale-110 cursor-pointer transition-all ease-in"
                      />
                    </Link>
                    <Link href="https://www.instagram.com/tars_iiit_bbsr/">
                      <FaLinkedin
                        size="32"
                        className="hover:scale-110 cursor-pointer transition-all ease-in"
                      />
                    </Link>
                  </div>
                  <div className="text-center text-xs px-2 leading-tight">
                    ©2025 The Autonomous & Robotics Society IIIT Bhubaneswar.
                  </div>
                  <div className="text-center text-xs px-2 leading-tight">
                    None of the right reserved
                  </div>
                  <div className="text-center text-xs mt-1">
                    Designed by Om Satyajit <br />{" "} Developed by &nbsp;
                    <Link href="https://www.linkedin.com/in/sambhu-prasad-verma/" className="hover:underline">Sambhu Prasad Verma</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;