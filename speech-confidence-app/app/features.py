import librosa
import numpy as np

def extract_features(audio_path):
    try:
        # Load audio (Limit to 60 seconds)
        y, sr = librosa.load(audio_path, duration=60)
        total_duration = librosa.get_duration(y=y, sr=sr)

        if total_duration == 0:
            return None

        # --- 1. STRICT SILENCE DETECTION (The 2-Second Rule) ---
        intervals = librosa.effects.split(y, top_db=30)
        
        pauses_sec = []
        for i in range(1, len(intervals)):
            gap_in_samples = intervals[i][0] - intervals[i-1][1]
            pauses_sec.append(gap_in_samples / sr)
            
        max_pause = max(pauses_sec) if pauses_sec else 0.0
        
        speech_samples = sum([end - start for start, end in intervals])
        speech_duration = speech_samples / sr
        silence_ratio = (total_duration - speech_duration) / total_duration
        
        # Calculate Penalty
        fluency_penalty = 0
        if max_pause >= 1.5:
            fluency_penalty += 15  # 15 point penalty for a 2-second pause
        if silence_ratio > 0.15:
            fluency_penalty += 10  # 10 point penalty for too much dead air

        # --- 2. SYLLABLE COUNTER (Pace) ---
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr)
        pace = len(onsets) / total_duration

        # --- 3. PITCH ANALYSIS (Tone) ---
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        valid_pitches = []
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            if 50 < pitch < 400: # Human Range
                valid_pitches.append(pitch)
        
        pitch_std = np.std(valid_pitches) if len(valid_pitches) > 0 else 0

        # --- 4. CLARITY (RMS) ---
        rms = float(np.mean(librosa.feature.rms(y=y)))
        clarity_score = float(min(100, max(30, rms * 1000)))

        # Return everything to main.py
        return {
            "duration": total_duration,
            "pace": pace,
            "pitch_std": pitch_std,
            "clarity_score": clarity_score,
            "max_pause": max_pause,
            "fluency_penalty": fluency_penalty,
            # This is the vector your AI model needs: [Pace, Pitch, Silence]
            "features_vector": [pace, pitch_std, silence_ratio] 
        }

    except Exception as e:
        print(f"Error extracting features: {e}")
        return None