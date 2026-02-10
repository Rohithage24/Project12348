import React, { useEffect, useRef, useState } from "react";

export default function CameraCapture({sendEmotion}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  // const [Emotion , setEmotion] = useState([]);

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;

    startSendingImages();
  };

  // 📸 Send image every 3 seconds
  const startSendingImages = () => {
    intervalRef.current = setInterval(() => {
      sendImageToBackend();
    }, 3000);
  };

  const sendImageToBackend = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);

    const base64Image = canvas.toDataURL("image/jpeg");

    try {
     const resEmo = await fetch(`${process.env.REACT_APP_BACKEND}/emonation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });


      const result = await resEmo.json();
      // console.log(result);
      
      sendEmotion(result);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Camera Stream</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="480"
        height="480"
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}



