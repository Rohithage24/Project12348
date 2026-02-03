import cv2
import numpy as np
import tensorflow as tf

MODEL_PATH = "C:/Users/rohit/Desktop/Final YEAR/Project12348/emotion_service/app/models/emotion_model.hdf5"

model = tf.keras.models.load_model(MODEL_PATH, compile=False)

EMOTIONS = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

def predict_emotion(face_img):

    # resize to model input
    face_img = cv2.resize(face_img, (64, 64))

    # normalize
    face_img = face_img / 255.0

    # reshape for CNN
    face_img = np.reshape(face_img, (1, 64, 64, 1))

    preds = model.predict(face_img, verbose=0)
    emotion_index = np.argmax(preds)

    return EMOTIONS[emotion_index]
