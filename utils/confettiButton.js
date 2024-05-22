import { Particles } from "react-tsparticles";

const ConfettiButton = () => {
  useEffect(() => {
    tsParticles.load("tsparticles", {
      // Konfigurasi tsParticles confetti di sini
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" />
      <button style={{ position: "relative", zIndex: 2 }}>
        Tombol Confetti
      </button>
    </div>
  );
};
