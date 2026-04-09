import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function WeddingInvitation() {
  const weddingDate = new Date("2027-04-02T18:00:00-03:00");

  const getTimeLeft = () => {
    const now = new Date();
    const diff = Math.max(0, weddingDate.getTime() - now.getTime());

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openInvitation = async () => {
    setIsOpen(true);

    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.muted = false;
        await audioRef.current.play();
      }
    } catch (error) {
      console.log("No se pudo reproducir el audio:", error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const mapUrl = "https://maps.app.goo.gl/RbmLME3SmLiaZjWu7";
  const whatsappRsvpUrl =
    "https://wa.me/?text=Hola%20Sebas%20y%20Carla%2C%20quiero%20confirmar%20mi%20asistencia%20a%20su%20boda.";

  return (
    <>
      {!isOpen && (
  <div className="opening-screen">
    <div className="opening-overlay" />
    <div className="opening-content">

      <h2 className="opening-title">Hay una invitación especial esperándote</h2>

      <button className="envelope-button" onClick={openInvitation} aria-label="Abrir invitación">
        <div className="envelope">
          <div className="envelope-flap" />
          <div className="envelope-body" />
          <div className="envelope-letter">
            <span>Abrir</span>
          </div>
        </div>
      </button>
    </div>
  </div>
)}

      <div className={`page ${isOpen ? "page-visible" : "page-hidden"}`}>
        <div className="container">
          <section className="hero">
            <h1>Sebas & Carla</h1>
            <p className="subtitle">
              Con mucha alegría queremos invitarte a compartir uno de los días más
              importantes de nuestras vidas.
            </p>
            <div className="info-grid">
              <div className="card">
                <span className="label">Fecha</span>
                <strong>02/04/2027</strong>
              </div>
              <div className="card">
                <span className="label">Hora</span>
                <strong>18:00 hs</strong>
              </div>
              <div className="card">
                <span className="label">Lugar</span>
                <strong>
                  <a href={mapUrl} target="_blank" rel="noreferrer">
                    Janos del Viso
                  </a>
                </strong>
              </div>
            </div>
          </section>

          <section className="content-grid">
            <div className="panel">
              <p className="section-title">Cuenta regresiva</p>
              <div className="countdown">
                <div className="count-box">
                  <span>{String(timeLeft.days).padStart(2, "0")}</span>
                  <small>Días</small>
                </div>
                <div className="count-box">
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <small>Horas</small>
                </div>
                <div className="count-box">
                  <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <small>Min</small>
                </div>
                <div className="count-box">
                  <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <small>Seg</small>
                </div>
              </div>
            </div>
          </section>

          <audio loop ref={audioRef} className="hidden-audio">
            <source src="/perfect.mp3" type="audio/mpeg" />
          </audio>

          <section className="rsvp">
            <h2>Esperamos contar con tu presencia</h2>
          </section>
        </div>
      </div>

      {isOpen && (
        <button className="mute-button" onClick={toggleMute}>
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}
    </>
  );
}