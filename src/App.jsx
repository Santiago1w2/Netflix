import React, { useState } from "react";

export default function NetflixClone() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const videoRef = React.useRef(null);
  const profiles = [
    { name: "User 1", img: "p1.jpg" },
    { name: "User 2", img: "p2.jpg" },
    { name: "User 3", img: "p3.jpg" }
  ];

  const rows = [
    { title: "Trending Now", images: [
  "img1.jpg","img2.jpg","img3.jpg",
  "img4.jpg","img5.jpg"
] },
    { title: "Top Picks", images: ["img4.jpg", "img5.jpg", "img6.jpg"] },
    { title: "Watch Again", images: ["img7.jpg", "img8.jpg", "img9.jpg"] }
  ];

  // 🔴 PANTALLA DE SELECCIÓN DE PERFIL
  if (!selectedProfile) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-10">Who's watching?</h1>

        <div className="flex space-x-10">
          {profiles.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedProfile(p)}
              className="cursor-pointer text-center"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-32 h-32 object-cover rounded hover:scale-110 transition"
              />
              <p className="mt-2 text-gray-300">{p.name}</p>
            </div>
          ))}

          {/* botón agregar */}
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <div className="w-32 h-32 bg-gray-700 flex items-center justify-center text-4xl rounded">
              +
            </div>
            <p className="mt-2 text-gray-300">Add Profile</p>
          </div>
        </div>
      </div>
    );
  }
const formatTime = (time) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
  // 🟢 PANTALLA PRINCIPAL (la que ya tenías)
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-4 fixed w-full bg-black z-50">
        <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>
        <div className="space-x-6 hidden md:flex">
          {["Home", "Series", "Movies", "My List"].map((item) => (
          <button
          key={item}
          className="text-white hover:text-gray-400 transition"
          >
          {item}
          </button>
          ))}
        </div>
        <div>
          <img
            src={selectedProfile.img}
            alt="profile"
            className="w-8 h-8 rounded"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="h-[70vh] flex flex-col justify-end p-8 bg-cover bg-center"
        style={{ backgroundImage: "url('p1.jpg')" }}
      >
        <h2 className="text-4xl font-bold mb-4">Cada vez mas vieja</h2>
        <div className="space-x-4">
          <button
  onClick={() => setShowPlayer(true)}
  className="bg-white text-black px-6 py-2 rounded"
>
  Play
</button>
          <button
  onClick={() =>
    setSelectedMovie({
      title: "Cada vez mas vieja",
      description: "Este es el cumple de pili",
      image: "/hero.jpg"
    })
  }
  className="bg-gray-700 px-6 py-2 rounded"
>
  More Info
</button>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-4 space-y-8 px-8">
        {rows.map((row, index) => (
          <div key={index}>
            <h3 className="text-xl mb-2">{row.title}</h3>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
              {row.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="movie"
                  className="w-48 h-28 object-cover rounded hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    
    <div className="bg-zinc-900 rounded-lg w-[80%] max-w-3xl overflow-hidden">
      
      {/* Imagen */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${selectedMovie.image})` }}
      />

      {/* Contenido */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedMovie.title}
        </h2>
        <p className="text-gray-300">
          {selectedMovie.description}
        </p>

        {/* Botón cerrar */}
        <button
          onClick={() => setSelectedMovie(null)}
          className="mt-6 bg-red-600 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>

  </div>
)}
{showPlayer && (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    
    <div className="w-full h-full relative">

      {/* VIDEO */}
<video
  ref={videoRef}
  className="w-full h-full object-contain bg-black"
  src={import.meta.env.BASE_URL + "video.mp4"}

  onLoadedMetadata={() => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
  }}

  onTimeUpdate={() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;

    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  }}
/>

      {/* CONTROLES */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/70 to-transparent">

        {/* BARRA */}
        <div
          className="w-full h-2 bg-gray-600 cursor-pointer rounded"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            const v = videoRef.current;
            v.currentTime = percent * v.duration;
          }}
        >
          <div
            className="h-2 bg-red-600 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-300 mt-1">
  <span>{formatTime(currentTime)}</span>
  <span>{formatTime(duration)}</span>
</div>

        {/* BOTONES */}
        <div className="flex items-center justify-between mt-3">
          
          <button
            onClick={() => {
              const v = videoRef.current;
              if (isPlaying) {
                v.pause();
              } else {
                v.play();
              }
              setIsPlaying(!isPlaying);
            }}
            className="text-white text-xl"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={() => setShowPlayer(false)}
            className="text-white text-xl"
          >
            ✕
          </button>

        </div>

      </div>

    </div>
  </div>
)}
    </div>
    
  );
}
