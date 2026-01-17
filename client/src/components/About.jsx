import React from "react";
import Title from "./Title.jsx";
import { assets } from "../assets/data.js";

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 !pt-36">
      <div className="flex items-center flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <Title
            title1={"Your Trusted Real Estate Partner"}
            title2={"Helping You Every Step of the Way"}
            para={
              "Trust, clarity, and simplicity are at the core of everything we do to make your property journey easy."
            }
            titleStyles={"mb-10"}
          />
          <div className="flex flex-col gap-6 mt-5">
            <div className="flex gap-3">
              <img
                src={assets.calendarSecondary}
                alt="calendarSecondary"
                width={20}
              />
              <p>In-app scheduling for property viewings</p>
            </div>
            <div className="flex gap-3">
              <img src={assets.graph} alt="graph" width={20} />
              <p>Real-time market price updates</p>
            </div>
            <div className="flex gap-3">
              <img src={assets.map} alt="map" width={20} />
              <p>User-friendly interface for smooth navigation</p>
            </div>
            <div className="flex gap-3">
              <img src={assets.pound} alt="pound" width={20} />
              <p>Access to off-market properties</p>
            </div>
          </div>
          <div className="flex mt-11">
            <div className="flex -space-x-5 pr-5">
              <div className="group relative">
                <div className="absolute border border-gray-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 -top-17 group-hover:ml-2 left-0 transition-all duration-400 pl-4 pr-12 py-2 rounded text-nowrap bg-white z-50 shadow-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <p className="font-medium">Richard Nelson</p>
                      <svg
                        className="mt-0.5"
                        width="20"
                        height="20"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                          fill="#2196F3"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500">@richard</span>
                  </div>
                  <div className="size-3 border-l border-t border-gray-300/90 bg-white rotate-45 absolute left-4 -bottom-[7px]"></div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="image"
                  className="size-12 rounded-full border-2 border-white group-hover:translate-x-2 transition-all duration-400 z-[2] relative"
                />
              </div>

              <div className="group relative">
                <div className="absolute border border-gray-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 -top-17 group-hover:ml-2 left-0 transition-all duration-400 pl-4 pr-12 py-2 rounded text-nowrap bg-white z-50 shadow-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <p className="font-medium">Avery Johnson</p>
                      <svg
                        className="mt-0.5"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                          fill="#2196F3"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500">@averywrites</span>
                  </div>
                  <div className="size-3 border-l border-t border-gray-300/90 bg-white rotate-45 absolute left-4 -bottom-[7px]"></div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="image"
                  className="size-12 rounded-full border-2 border-white group-hover:translate-x-2 transition-all duration-400 z-[2] relative"
                />
              </div>

              <div className="group relative">
                <div className="absolute border border-gray-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 -top-17 group-hover:ml-2 left-0 transition-all duration-400 pl-4 pr-12 py-2 rounded text-nowrap bg-white z-50 shadow-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <p className="font-medium">Jordan Lee</p>
                      <svg
                        className="mt-0.5"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                          fill="#2196F3"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500">@jordantalks</span>
                  </div>
                  <div className="size-3 border-l border-t border-gray-300/90 bg-white rotate-45 absolute left-4 -bottom-[7px]"></div>
                </div>
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
                  alt="image"
                  className="size-12 rounded-full border-2 border-white group-hover:translate-x-2 transition-all duration-400 z-[2] relative"
                />
              </div>

              <div className="group relative">
                <div className="absolute border border-gray-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 -top-17 group-hover:ml-2 left-0 transition-all duration-400 pl-4 pr-12 py-2 rounded text-nowrap bg-white z-50 shadow-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <p className="font-medium">Noah Patel</p>
                      <svg
                        className="mt-0.5"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                          fill="#2196F3"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500">@noahpatel</span>
                  </div>
                  <div className="size-3 border-l border-t border-gray-300/90 bg-white rotate-45 absolute left-4 -bottom-[7px]"></div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="image"
                  className="size-12 rounded-full border-2 border-white group-hover:translate-x-2 transition-all duration-400 z-[2] relative"
                />
              </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 mx-2"></div>
            <div className="flex flex-col pl-4">
              <div className="flex items-center gap-1.5">
                <div className="flex text-secondary text-lg">★★★★★</div>
                <span className="bold-18">5.0</span>
              </div>
              <p className="regular-14 text-slate-500">
                Trusted by <span className="bold-15 text-black">100,000+</span>{" "}
                users
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative flex justify-end">
            <img src={assets.about} alt="about" className="rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
