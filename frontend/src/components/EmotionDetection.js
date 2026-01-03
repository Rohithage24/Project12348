import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

// Map base expressions to custom emotions
const mapToCustomEmotion = (expressions) => {
  const { angry, disgusted, fearful, happy, neutral, sad, surprised } = expressions;

  if (happy > 0.6 && neutral < 0.3) return "Confident";
  if (fearful > 0.5 || surprised > 0.5) return "Nervous";
  if (sad > 0.5) return "Loss";
  if (neutral > 0.7) return "Calm";
  if (angry > 0.5) return "Frustrated";

  return "Mixed/Unclear";
};

export default function EmotionDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [customEmotion, setCustomEmotion] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models"; // Place models in public/models
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        startVideo();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    loadModels();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // const handleVideoPlay = () => {
  //   const detect = async () => {
  //     if (!videoRef.current) return;

  //     const displaySize = {
  //       width: videoRef.current.width,
  //       height: videoRef.current.height,
  //     };

  //     faceapi.matchDimensions(canvasRef.current, displaySize);

  //     const detections = await faceapi
  //       .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceExpressions();

  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);

  //     // Clear canvas before drawing
  //     const context = canvasRef.current.getContext("2d");
  //     context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  //     if (detections.length > 0) {
  //       const expressions = detections[0].expressions;
  //       const emotion = mapToCustomEmotion(expressions);
  //       setCustomEmotion(emotion);

  //       // Draw face box
  //       faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

  //       // Draw custom emotion label
  //       context.font = "20px Arial";
  //       context.fillStyle = "red";
  //       context.fillText(
  //         `Emotion: ${emotion}`,
  //         resizedDetections[0].detection.box.x,
  //         resizedDetections[0].detection.box.y - 10
  //       );
  //     }

  //     requestAnimationFrame(detect);
  //   };

  //   detect();
  // };

  const handleVideoPlay = () => {
  const detect = async () => {
    if (!videoRef.current || !canvasRef.current) return; // ✅ prevent null error

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const emotion = mapToCustomEmotion(expressions);
      setCustomEmotion(emotion);

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

      context.font = "20px Arial";
      context.fillStyle = "red";
      context.fillText(
        `Emotion: ${emotion}`,
        resizedDetections[0].detection.box.x,
        resizedDetections[0].detection.box.y - 10
      );
    }

    requestAnimationFrame(detect);
  };

  detect();
};

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Emotion Detection</h2>
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          width="640"
          height="480"
          style={{ border: "1px solid black" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      {customEmotion && <h3>Current Emotion: {customEmotion}</h3>}
    </div>
  );
}







