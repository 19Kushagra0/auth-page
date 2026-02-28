import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: "#060a14",
        backgroundImage: `
          radial-gradient(1px 1px at 12% 20%, #fff 0%, transparent 100%),
          radial-gradient(1px 1px at 42% 8%,  #fff 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 70% 35%, #fff 0%, transparent 100%),
          radial-gradient(1px 1px at 88% 15%, #fff 0%, transparent 100%),
          radial-gradient(1px 1px at 25% 60%, #fff 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 72%, #fff 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 80% 80%, #fff 0%, transparent 100%),
          radial-gradient(1px 1px at 6%  85%, #fff 0%, transparent 100%),
          radial-gradient(2px 2px at 92% 55%, #fff 0%, transparent 100%)
        `,
        fontFamily: "'Nunito', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Portal glow corners */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(151,206,76,0.2) 0%, transparent 70%)",
          bottom: -100,
          right: -80,
          zIndex: 0,
          animation: "portalPulse 4s ease-in-out infinite alternate",
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(68,217,232,0.13) 0%, transparent 70%)",
          top: -60,
          left: -60,
          zIndex: 0,
        }}
      />

      <Navbar />

      {/* WIP card */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div
          style={{
            background: "#f5f0dc",
            border: "3px solid #111",
            borderRadius: "4px 18px 6px 14px / 10px 4px 14px 6px",
            boxShadow: "5px 5px 0 #111, 10px 10px 0 rgba(151,206,76,0.35)",
            padding: "48px 56px",
            textAlign: "center",
            animation: "floatIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
            maxWidth: 420,
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 12 }}>
            🚧
          </div>
          <h1
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "3.2rem",
              letterSpacing: "4px",
              color: "#111",
              textShadow: "3px 3px 0 #97CE4C, 6px 6px 0 rgba(0,0,0,0.15)",
              WebkitTextStroke: "1px #5a9c16",
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            DASHBOARD
          </h1>
          <p
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "1.6rem",
              letterSpacing: "3px",
              color: "#5a9c16",
              textShadow: "2px 2px 0 rgba(0,0,0,0.12)",
              marginBottom: 16,
            }}
          >
            WORK IN PROGRESS
          </p>
          <p
            style={{
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 700,
              color: "#555",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            Rick is still calibrating the portal gun.
            <br />
            Check back in another dimension.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@700;900&display=swap');
        @keyframes floatIn {
          from { opacity:0; transform:translateY(30px) rotate(-1deg) scale(0.95); }
          to   { opacity:1; transform:translateY(0) rotate(0deg) scale(1); }
        }
        @keyframes portalPulse {
          from { opacity:0.7; transform:scale(1); }
          to   { opacity:1;   transform:scale(1.12); }
        }
      `}</style>
    </div>
  );
}
