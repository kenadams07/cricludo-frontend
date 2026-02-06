"use client";

import { useState } from "react";


export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        // Here you would typically send to your backend API
        // For now, we'll just simulate a submission
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setStatus(""), 3000);
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-24 md:py-32 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-black text-[#D9381E] mb-4 font-subheader uppercase text-center">
                Contact Us
            </h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Have questions or feedback? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-[#1a103c] mb-6 font-subheader">
                        Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9381E] focus:border-transparent"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9381E] focus:border-transparent"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9381E] focus:border-transparent"
                                placeholder="+971 XX XXX XXXX"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9381E] focus:border-transparent resize-none"
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full px-8 py-3 bg-[#D9381E] text-white font-bold rounded-full hover:bg-[#b02d18] transition-colors shadow-lg font-subheader tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </button>

                        {status === "success" && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                    </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-[#D9381E] to-[#b02d18] p-8 rounded-lg text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 font-subheader">Get in Touch</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="text-2xl mr-4">📧</div>
                                <div>
                                    <h3 className="font-bold mb-1">Email</h3>
                                    <a href="mailto:info@9xtechnology.com" className="hover:underline">
                                        info@9xtechnology.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-2xl mr-4">📞</div>
                                <div>
                                    <h3 className="font-bold mb-1">Phone</h3>
                                    <a href="tel:+971522280076" className="hover:underline">
                                        +971 52 228 0076
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-2xl mr-4">📍</div>
                                <div>
                                    <h3 className="font-bold mb-1">Address</h3>
                                    <p>108, 2020 Building<br />Al Quoz 3 Sheikh Zayed Road<br />Dubai, UAE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a103c] to-[#2d1f5c] p-8 rounded-lg text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 font-subheader">Business Hours</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span className="font-bold">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span className="font-bold">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span className="font-bold">Closed</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm opacity-90">
                            * All times are in UAE Time (GMT+4)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
