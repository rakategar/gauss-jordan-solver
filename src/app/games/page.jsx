"use client"

import React, { useEffect } from 'react';
import { Particles } from 'react-tsparticles';

const ConfettiPage = () => {
  useEffect(() => {
    tsParticles.load("tsparticles", {
      particles: {
        color: {
          value: ["#ffffff", "#FF0000"]
        },
        move: {
          decay: 0.05,
          direction: "top",
          enable: true,
          gravity: {
            enable: true
          },
          outModes: {
            top: "none",
            default: "destroy"
          },
          speed: {
            min: 10,
            max: 50
          }
        },
        number: {
          value: 0
        },
        opacity: {
          value: 1
        },
        rotate: {
          value: {
            min: 0,
            max: 360
          },
          direction: "random",
          animation: {
            enable: true,
            speed: 30
          }
        },
        tilt: {
          direction: "random",
          enable: true,
          value: {
            min: 0,
            max: 360
          },
          animation: {
            enable: true,
            speed: 30
          }
        },
        size: {
          value: {
            min: 0,
            max: 2
          },
          animation: {
            enable: true,
            startValue: "min",
            count: 1,
            speed: 16,
            sync: true
          }
        },
        roll: {
          darken: {
            enable: true,
            value: 25
          },
          enable: true,
          speed: {
            min: 5,
            max: 15
          }
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            min: -7,
            max: 7
          }
        },
        shape: {
          type: [
            "circle",
            "square",
            "emoji"
          ],
          options: {
            emoji: {
              particles: {
                size: {
                  value: 8
                }
              },
              value: [
                "💩",
                "🤡",
                "🍀",
                "🍙",
                "🦄",
                "⭐️"
              ]
            }
          }
        }
      }
    });
  }, []);

  const handleButtonClick = () => {
    // Mengambil referensi ke elemen Particles
    const particles = tsParticles.domItem(0);
  
    // Memastikan bahwa objek particles telah terdefinisi
    if (particles && particles.particles) {
      // Mengatur ulang jumlah partikel agar efek confetti dimulai
      particles.particles.number.value = 100;
    }
  
    // Menambahkan efek "pop" sederhana pada tombol
    const button = document.querySelector('button');
    if (button) {
      button.style.transform = 'scale(0.8)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 200);
    }
  };
  
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <Particles id="tsparticles" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <button onClick={handleButtonClick} style={{ position: 'relative', zIndex: 2 }}>Tekan untuk Confetti</button>
    </div>
  );
};

export default ConfettiPage;
