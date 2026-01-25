import base64

with open("lena.jpg", "rb") as img:
    encoded = base64.b64encode(img.read()).decode("utf-8")

print(encoded.replace("\n", ""))

