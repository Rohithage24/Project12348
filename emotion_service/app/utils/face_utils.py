import cv2

# Load OpenCV Haar Cascade model for face detection
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


def detect_faces(image):
    """
    Detect all faces in the frame
    Returns list of face bounding boxes
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=5,
        minSize=(30, 30)
    )

    return faces


def extract_single_face(image):
    """
    Extracts the largest face from the frame
    Returns:
        face_img (cropped face)
        face_count (number of faces detected)
    """
    faces = detect_faces(image)

    if len(faces) == 0:
        return None, 0

    # Sort faces by size (largest face first)
    faces = sorted(faces, key=lambda x: x[2] * x[3], reverse=True)
    (x, y, w, h) = faces[0]

    face_img = image[y:y+h, x:x+w]

    return face_img, len(faces)
