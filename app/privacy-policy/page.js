
export const metadata = {
    title: "Privacy Policy | Cric Ludo",
    description: "Privacy Policy for Cric Ludo mobile application.",
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-24 md:py-32 min-h-screen overflow-auto">
            <h1 className="text-4xl md:text-5xl font-black text-[#D9381E] mb-8 font-subheader uppercase">
                Privacy Policy
            </h1>
            <p className="text-gray-600 mb-8 font-medium">
                Last updated: October 25, 2024
            </p>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Welcome to CRIC LUDO! This Privacy Policy explains how 9X Technology
                    LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your
                    information when you use our mobile application.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Information We Collect
                </h2>

                <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#D9381E] mb-2 font-subheader">Personal Information</h3>
                    <ul className="list-disc leading-relaxed pl-5 text-gray-700 space-y-2">
                        <li>Account information (username, email)</li>
                        <li>Profile information you choose to provide</li>
                        <li>Game statistics and achievements</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#D9381E] mb-2 font-subheader">Device Information</h3>
                    <ul className="list-disc leading-relaxed pl-5 text-gray-700 space-y-2">
                        <li>Device type and operating system</li>
                        <li>App version and usage data</li>
                        <li>Crash reports and performance data</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    How We Use Your Information
                </h2>
                <ul className="list-disc leading-relaxed pl-5 text-gray-700 space-y-2">
                    <li>To provide and improve our gaming services</li>
                    <li>To enable multiplayer functionality</li>
                    <li>To personalize your gaming experience</li>
                    <li>To communicate with you about updates</li>
                    <li>To ensure app security and prevent fraud</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    We implement appropriate security measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or
                    destruction. Your data is encrypted in transit and at rest.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Third-Party Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Our app may integrate with third-party services for analytics, advertising, and social features. These services have their own privacy policies.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Your Rights
                </h2>
                <ul className="list-disc leading-relaxed pl-5 text-gray-700 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Opt-out of marketing communications</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a103c] mb-4 font-subheader">
                    Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact
                    us at:
                </p>
                <ul className="list-none leading-relaxed text-gray-700 space-y-2 font-medium">
                    <li>Email: <a href="mailto:info@9xtechnology.com" className="text-[#D9381E] hover:underline">info@9xtechnology.com</a></li>
                    <li>Address: 108, 2020 Building, Al Quoz 3 Sheikh Zayed Road, Dubai, UAE</li>
                    <li>Phone: <a href="tel:+971522280076" className="text-[#D9381E] hover:underline">+971 52 228 0076</a></li>
                </ul>
            </section>
        </div>
    );
}
