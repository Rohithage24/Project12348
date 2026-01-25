import base64
import numpy as np
import cv2

def base64_to_image(base64_str: str):
    try:
        print("Received base64 length:", len(base64_str))

        # remove data header if present
        if "," in base64_str:
            base64_str = base64_str.split(",")[1]

        # remove spaces and newlines
        base64_str = base64_str.replace("\n", "").replace(" ", "")

        print("Cleaned base64 length:", len(base64_str))

        img_bytes = base64.b64decode(base64_str)
        print("Decoded bytes length:", len(img_bytes))

        np_arr = np.frombuffer(img_bytes, np.uint8)
        print("Numpy array size:", np_arr.size)

        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        print("Image object:", img)

        return img
    except Exception as e:
        print("Decode error:", e)
        return None
