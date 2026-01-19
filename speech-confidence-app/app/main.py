from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tempfile
import os
import librosa
from pydub import AudioSegment

# --------------------------------------------------
# FFmpeg path (WINDOWS – REQUIRED)
# --------------------------------------------------
AudioSegment.converter = r"C:\Users\rohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"

app = FastAPI()

# --------------------------------------------------
# CORS
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# API
# --------------------------------------------------
@app.post("/analyze-full-speech")
async def analyze_full_speech(file: UploadFile = File(...)):
    try:
        # --------------------------------------------------
        # 1. Save uploaded file
        # --------------------------------------------------
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_webm:
            temp_webm.write(await file.read())
            webm_path = temp_webm.name

        wav_path = webm_path.replace(".webm", ".wav")

        # --------------------------------------------------
        # 2. Convert to WAV
        # --------------------------------------------------
        audio = AudioSegment.from_file(webm_path)
        audio.export(wav_path, format="wav")

        # --------------------------------------------------
        # 3. Load audio
        # --------------------------------------------------
        y, sr = librosa.load(wav_path, sr=None)
        duration = float(librosa.get_duration(y=y, sr=sr))

        # --------------------------------------------------
        # 4. FEATURE EXTRACTION
        # --------------------------------------------------

        # 🔹 Clarity (energy)
        rms = float(np.mean(librosa.feature.rms(y=y)))
        clarity_score = float(min(100, max(30, rms * 1000)))

        # 🔹 Tone (pitch variation)
        pitches, _ = librosa.piptrack(y=y, sr=sr)
        pitch_values = pitches[pitches > 0]
        tone_variation = float(np.std(pitch_values)) if len(pitch_values) > 0 else 0.0
        tone_score = float(min(100, max(30, tone_variation / 5)))

        # 🔹 Pace (speaking speed proxy)
        zero_crossings = float(np.sum(librosa.zero_crossings(y)))
        pace_estimate = zero_crossings / max(duration, 0.1)
        pace_score = float(min(100, max(30, pace_estimate / 10)))

        # --------------------------------------------------
        # 5. OVERALL CONFIDENCE
        # --------------------------------------------------
        overall_score = float(
            round((pace_score + clarity_score + tone_score) / 3, 2)
        )

        # --------------------------------------------------
        # 6. Cleanup
        # --------------------------------------------------
        os.remove(webm_path)
        os.remove(wav_path)

        # --------------------------------------------------
        # 7. RESPONSE (PURE PYTHON TYPES)
        # --------------------------------------------------
        return {
            "overall_score": overall_score,
            "pace_score": round(pace_score, 2),
            "clarity_score": round(clarity_score, 2),
            "tone_score": round(tone_score, 2),
            "pace_feedback": "Good pace" if pace_score > 60 else "Speak slightly faster",
            "clarity_feedback": "Clear voice" if clarity_score > 60 else "Speak louder",
            "tone_feedback": "Nice tone variation" if tone_score > 60 else "Add vocal variation"
        }

    except Exception as e:
        return {"error": str(e)}






# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import numpy as np
# import tempfile
# import os
# import librosa
# from pydub import AudioSegment

# # --------------------------------------------------
# # FFmpeg path (VERY IMPORTANT on Windows)
# # --------------------------------------------------
# AudioSegment.converter = r"C:\Users\rohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"

# app = FastAPI()

# # --------------------------------------------------
# # CORS
# # --------------------------------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --------------------------------------------------
# # API
# # --------------------------------------------------
# @app.post("/analyze-full-speech")
# async def analyze_full_speech(file: UploadFile = File(...)):
#     try:
#         # --------------------------------------------------
#         # 1. Save uploaded audio
#         # --------------------------------------------------
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_webm:
#             temp_webm.write(await file.read())
#             webm_path = temp_webm.name

#         wav_path = webm_path.replace(".webm", ".wav")

#         # --------------------------------------------------
#         # 2. Convert WEBM → WAV
#         # --------------------------------------------------
#         audio = AudioSegment.from_file(webm_path)
#         audio.export(wav_path, format="wav")

#         # --------------------------------------------------
#         # 3. Load audio with librosa
#         # --------------------------------------------------
#         y, sr = librosa.load(wav_path, sr=None)

#         duration = librosa.get_duration(y=y, sr=sr)

#         # --------------------------------------------------
#         # 4. FEATURE EXTRACTION (REAL)
#         # --------------------------------------------------

#         # 🔹 Energy (clarity proxy)
#         rms = np.mean(librosa.feature.rms(y=y))
#         clarity_score = min(100, max(30, rms * 1000))

#         # 🔹 Pitch variation (tone)
#         pitches, _ = librosa.piptrack(y=y, sr=sr)
#         pitch_values = pitches[pitches > 0]
#         tone_variation = np.std(pitch_values) if len(pitch_values) > 0 else 0
#         tone_score = min(100, max(30, tone_variation / 5))

#         # 🔹 Speaking pace (approx words/min)
#         zero_crossings = np.sum(librosa.zero_crossings(y))
#         pace_estimate = zero_crossings / duration
#         pace_score = min(100, max(30, pace_estimate / 10))

#         # --------------------------------------------------
#         # 5. OVERALL CONFIDENCE
#         # --------------------------------------------------
#         overall_score = round(
#             (pace_score + clarity_score + tone_score) / 3, 2
#         )

#         # --------------------------------------------------
#         # 6. Cleanup
#         # --------------------------------------------------
#         os.remove(webm_path)
#         os.remove(wav_path)

#         # --------------------------------------------------
#         # 7. Response
#         # --------------------------------------------------
#         return {
#             "overall_score": round(overall_score, 2),
#             "pace_score": round(pace_score, 2),
#             "clarity_score": round(clarity_score, 2),
#             "tone_score": round(tone_score, 2),
#             "pace_feedback": "Good pace" if pace_score > 60 else "Try speaking a bit faster",
#             "clarity_feedback": "Clear voice" if clarity_score > 60 else "Speak louder and clearer",
#             "tone_feedback": "Nice tone variation" if tone_score > 60 else "Add more tone variation"
#         }

#     except Exception as e:
#         return {"error": str(e)}

