import librosa
import numpy as np

def extract_features(audio_path):
    try:
        # Load audio (Limit to 60 seconds)
        y, sr = librosa.load(audio_path, duration=60)
        total_duration = librosa.get_duration(y=y, sr=sr)

        # --- 1. STRICT SILENCE DETECTION ---
        # We increased top_db to 30 (was 20). This filters out breathing/fan noise.
        intervals = librosa.effects.split(y, top_db=30)
        non_silent_time = sum([(end - start) for start, end in intervals]) / sr
        speaking_ratio = non_silent_time / total_duration if total_duration > 0 else 0

        # --- 2. SYLLABLE COUNTER (For "Anti-Cheat") ---
        # This counts "energy peaks" to guess how many syllables you said
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr)
        syllable_count = len(onsets) 
        
        # Calculate Pace (Syllables per second)
        pace = syllable_count / total_duration if total_duration > 0 else 0

        # --- 3. PITCH ANALYSIS (Noise Filtered) ---
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        
        # Filter: Only accept frequencies 50Hz-400Hz (Human Range)
        valid_pitches = []
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            if pitch > 50 and pitch < 400:
                valid_pitches.append(pitch)
        
        valid_pitches = np.array(valid_pitches)

        if len(valid_pitches) > 0:
            pitch_std = np.std(valid_pitches)
        else:
            pitch_std = 0

        # --- 4. CLARITY (Spectral Flatness) ---
        flatness = librosa.feature.spectral_flatness(y=y)
        avg_flatness = np.mean(flatness)

        # Return everything needed for penalties
        return {
            "duration": total_duration,
            "syllable_count": syllable_count,
            "pace": pace,
            "pitch_std": pitch_std,
            "clarity": avg_flatness,
            "speaking_ratio": speaking_ratio,
            # This vector is what the AI model uses
            "features_vector": [speaking_ratio, pitch_std, avg_flatness] 
        }

    except Exception as e:
        print(f"Error extracting features: {e}")
        return None