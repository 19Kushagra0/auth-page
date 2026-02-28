"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) router.replace("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@700;900&display=swap');
        @keyframes portalSpin {
          to { transform: rotate(360deg); }
        }
        .nav-logout:hover  { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 #c1121f !important; }
        .nav-logout:active { transform: translate(2px,2px);   box-shadow: 1px 1px 0 #c1121f !important; }
      `}</style>

      <nav
        className="w-full flex items-center justify-between px-6 py-3 relative"
        style={{
          background: "#0d1a2e",
          borderBottom: "3px solid #111",
          boxShadow: "0 4px 0 #97CE4C, 0 7px 0 #111",
          padding: "10px",
          fontFamily: "'Nunito', sans-serif",
          zIndex: 50,
        }}
      >
        {/* Portal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, rgba(151,206,76,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "radial-gradient(circle, #97CE4C 0%, #5a9c16 100%)",
              border: "3px solid #111",
              boxShadow: "3px 3px 0 #111",
              animation: "portalSpin 8s linear infinite",
            }}
          >
            <span
              style={{
                fontFamily: "'Bangers',cursive",
                fontSize: 16,
                color: "#111",
                lineHeight: 1,
              }}
            >
              {/* R */}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "1.6rem",
              letterSpacing: "3px",
              color: "#97CE4C",
              textShadow: "2px 2px 0 #111, 4px 4px 0 rgba(151,206,76,0.25)",
              WebkitTextStroke: "0.5px #5a9c16",
            }}
          >
            {/* RICK &amp; MORTY */}
          </span>
        </div>

        {/* Logout */}
        <button
          className="nav-logout z-10"
          onClick={handleLogout}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1.2rem",
            letterSpacing: "2px",
            color: "#fff",
            background: "#e63946",
            border: "3px solid #111",
            borderRadius: "4px 14px 4px 14px / 8px 4px 8px 4px",
            padding: "5px 20px",
            cursor: "pointer",
            boxShadow: "3px 3px 0 #c1121f, 3px 3px 0 #111",
            transition: "transform 0.12s ease, box-shadow 0.12s ease",
          }}
        >
          Logout
        </button>
      </nav>
    </>
  );
}
