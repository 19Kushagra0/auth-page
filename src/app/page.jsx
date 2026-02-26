"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "@/app/style.css";
import styles from "@/app/style/eye.module.css";

const IMAGES = {
  normal: "/images/normal.png",
  exited: "/images/happy.png",
  scared: "/images/sad.png",
  close_eyes: "/images/not_looking.png",
};

export default function page() {
  const [image, setImage] = useState("exited");

  // Refs for both eyes and their pupils
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  function movePupil(eyeEl, pupilEl, mouseX, mouseY) {
    const eyeRect = eyeEl.getBoundingClientRect();
    const pupilRect = pupilEl.getBoundingClientRect();

    // Center of the eye in viewport coordinates
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Max distance the pupil center can travel from the eye center
    const maxRadius = eyeRect.width / 2 - pupilRect.width / 2 - 5;

    // Angle from eye center toward mouse cursor
    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

    // Raw distance from eye center to mouse
    const rawDistance = Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY);

    // Clamp: never exceed maxRadius
    const distance = Math.min(rawDistance, maxRadius);

    // Pupil offset from eye center
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    // Position pupil: center it, then apply offset
    pupilEl.style.left = `calc(50% + ${offsetX}px - ${pupilRect.width / 2}px)`;
    pupilEl.style.top = `calc(50% + ${offsetY}px - ${pupilRect.height / 2}px)`;
  }

  const handleMouseMove = (e) => {
    // Eyes are not rendered when image is "not_looking", skip if refs are null
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    movePupil(leftEyeRef.current, leftPupilRef.current, mouseX, mouseY);
    movePupil(rightEyeRef.current, rightPupilRef.current, mouseX, mouseY);
  };

  // Login
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      const response = await fetch("/api/me", {
        method: "GET",
      });

      if (!response.ok) {
        setCheckingAuth(false);
        return;
      }

      const data = await response.json();
      console.log(data);

      if (data.role === "manager") {
        router.replace("/dashboard");
      } else if (data.role === "shopkeeper") {
        router.replace("/shop");
      }
    };
    getMe();
  }, [router]);

  //    login will NOT appear
  if (checkingAuth) {
    return null;
  }

  const handleLogin = async () => {
    console.log(username);
    console.log(password);

    setUsername("");
    setPassword("");

    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setImage("scared");

      alert("Please provide username and password");

      return;
    }

    const data = await response.json();
    console.log(data);

    if (data.role === "manager") {
      router.push("/dashboard");
    } else if (data.role === "shopkeeper") {
      router.push("/shop");
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="page">
      <div className="image relative">
        <Image
          src={IMAGES[image]}
          alt="character face"
          width={250}
          height={250}
          className="hero"
          style={{ width: "250px", height: "250px", objectFit: "contain" }}
        />

        {image === "close_eyes" ? (
          ""
        ) : (
          <>
            <div
              ref={leftEyeRef}
              style={{
                top: "66px",
                left: "89px",
              }}
              className={styles.eye}
            >
              <div
                ref={leftPupilRef}
                style={{
                  top: "50%",
                  left: "50%",
                }}
                className={styles.pupil}
              ></div>
            </div>

            {/* Right eye */}
            <div
              ref={rightEyeRef}
              style={{
                top: "66px",
                left: "123px",
              }}
              className={styles.eye}
            >
              <div
                ref={rightPupilRef}
                style={{
                  top: "50%",
                  left: "50%",
                }}
                className={styles.pupil}
              ></div>
            </div>
          </>
        )}
      </div>

      <div className="loginPage flex flex-col items-right gap-4 p-4">
        <label htmlFor="">Login</label>
        <label className="gap-2 flex">
          <input
            className="bg-violet-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setImage("normal");
            }}
          />
          <span>Username</span>
        </label>
        <label className="gap-2 flex">
          <input
            className="bg-violet-500"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setImage("close_eyes");
            }}
          />
          <span>Password</span>
        </label>
        <button
          onClick={handleLogin}
          className="loginButton"
          onMouseEnter={() => {
            if (image !== "scared") setImage("exited");
          }}
          onMouseLeave={() => {
            if (image !== "scared") setImage("normal");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
