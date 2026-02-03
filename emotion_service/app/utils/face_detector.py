import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

def detect_faces(gray_image):
    faces = face_cascade.detectMultiScale(gray_image, 1.3, 5)
    return faces
