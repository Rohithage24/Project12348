const recordEmo = [];
import dotenv from 'dotenv'
dotenv.config()

export const getImage = async (req, res) => {
  try {
    // console.log("Image received" , process.env.EMOTION_AND_FACE_API);

    const imageSrc = req.body.image;

    if (!imageSrc) {
      return res.status(400).json({ success: false, message: "No image found" });
    }

    // 🔁 Send to Python backend
    const response = await fetch(`${process.env.EMOTION_AND_FACE_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageSrc,
        user_id: "1",
      }),
    });

    const pythonResult = await response.json();
    recordEmo.push(pythonResult.confidence_score);
    console.log("Python response:", pythonResult);

    res.status(200).json({
      success: true,
      data: pythonResult,
    });

  } catch (error) {
    console.error("Error sending image:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


export const calEmo = (req, res) => {

  // recordEmo = your array
  const validValues = recordEmo.filter(
    (v) => typeof v === "number" && !isNaN(v)
  );

  const sum = validValues.reduce((acc, val) => acc + val, 0);
  const average = validValues.length > 0 ? sum / validValues.length : 0;


  const confidence_level =
  average >= 50
    ? "High"
    : average >= 30
    ? "Medium"
    : "Low";


  recordEmo.length = 0;
  res.status(200).json({
    success: true,
    average: Number(average.toFixed(2)),
    confidence_level : confidence_level
    // totalValues: validValues.length,
  });
};