import { Gamepad2, Video, Users, Trophy, Zap, Brain, Target, Dices, Download } from "lucide-react";

export const metadata = {
    title: "About Us | Cric Ludo",
    description: "Learn about Cric Ludo - Where Cricket Meets Ludo. Experience the perfect blend of classic board games and modern cricket excitement.",
};

export default function About() {
    return (
        <div className="container mx-auto px-4 py-24 md:py-32 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-black text-[#D9381E] mb-4 font-subheader uppercase text-center">
                Why Choose CRIC LUDO?
            </h1>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto para_one">
                Experience the perfect blend of classic board games and modern cricket excitement
            </p>

            <div className="max-w-6xl mx-auto space-y-12">
                {/* Features Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Gamepad2 className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">2 Games in 1 App</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Switch between traditional ludo mode and our unique cricket-based ludo version. Every dice roll feels like batting or bowling!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Video className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">Live Video Calling</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Enjoy the game in real-time with friends using our built-in video calling feature. Laugh, celebrate, and strategize while seeing your opponents live!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Users className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">Multiplayer Matches</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Play online with friends, family, or random players worldwide. Connect with players from around the globe!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Trophy className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">Leaderboards & Rewards</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Win games, earn points, and climb to the top of global rankings. Compete with the best players worldwide!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Zap className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">Fast & Smooth</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Optimized for all Android devices. Enjoy seamless gameplay with lightning-fast performance!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#D9381E] hover:shadow-[0_8px_30px_rgb(217,56,30,0.2)] transition-all duration-300 hover:-translate-y-1">
                        <Brain className="w-14 h-14 text-[#D9381E] mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-black text-[#1a103c] mb-3 font-subheader">Strategy + Sports</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Combines board game logic with the thrill of sports competition. Perfect for strategy lovers!
                        </p>
                    </div>
                </section>

                {/* Game Modes */}
                <section>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a103c] mb-4 font-subheader text-center">
                        Game Modes
                    </h2>
                    <p className="text-center text-gray-600 mb-8 para_one">Choose your preferred way to play</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-[#D9381E] to-[#b02d18] p-10 rounded-3xl text-white shadow-[0_8px_30px_rgb(217,56,30,0.3)] hover:shadow-[0_12px_40px_rgb(217,56,30,0.4)] transition-all duration-300 hover:-translate-y-1">
                            <Target className="w-16 h-16 mb-4" strokeWidth={1.5} />
                            <h3 className="text-2xl font-black mb-3 font-subheader">Cricket Ludo</h3>
                            <p className="mb-4 leading-relaxed opacity-95">
                                Experience a whole new way to play with cricket-inspired ludo gameplay. Every move counts in this exciting variant!
                            </p>
                            <ul className="space-y-2 opacity-90">
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Cricket-themed gameplay</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Batting and bowling mechanics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Strategic cricket moves</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-[#1a103c] to-[#2d1f5c] p-10 rounded-3xl text-white shadow-[0_8px_30px_rgb(26,16,60,0.3)] hover:shadow-[0_12px_40px_rgb(26,16,60,0.4)] transition-all duration-300 hover:-translate-y-1">
                            <Dices className="w-16 h-16 mb-4" strokeWidth={1.5} />
                            <h3 className="text-2xl font-black mb-3 font-subheader">Classic Ludo</h3>
                            <p className="mb-4 leading-relaxed opacity-95">
                                For players who enjoy the original ludo experience. Pure, classic gameplay with modern features!
                            </p>
                            <ul className="space-y-2 opacity-90">
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Traditional ludo rules</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Classic board gameplay</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-lg">✓</span>
                                    <span>Timeless fun</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-[#FDE02C] to-[#FFBA28] p-12 rounded-3xl text-center shadow-[0_8px_30px_rgb(253,224,44,0.3)]">
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a103c] mb-4 font-subheader">
                        Ready to Play?
                    </h2>
                    <p className="text-lg text-gray-800 mb-6 max-w-2xl mx-auto para_one">
                        Download CRIC LUDO now and enjoy ludo, cricket, and real-time fun—all in one place!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://apps.apple.com/in/app/cricludo/id6741326528"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#1a103c] text-white font-bold rounded-full hover:bg-[#2d1f5c] transition-all duration-300 shadow-lg hover:shadow-xl font-subheader tracking-wider flex items-center gap-2 hover:-translate-y-0.5"
                        >
                            <Download className="w-5 h-5" />
                            Download on App Store
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo&pli=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#D9381E] text-white font-bold rounded-full hover:bg-[#b02d18] transition-all duration-300 shadow-lg hover:shadow-xl font-subheader tracking-wider flex items-center gap-2 hover:-translate-y-0.5"
                        >
                            <Download className="w-5 h-5" />
                            Get it on Google Play
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}