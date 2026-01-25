def map_emotion(raw):

    if raw == "happy":
        return "happy"

    if raw in ["neutral", "surprise"]:
        return "neutral"

    if raw in ["sad", "disgust"]:
        return "sad"

    if raw in ["fear", "angry"]:
        return "fear"

    return "neutral"
