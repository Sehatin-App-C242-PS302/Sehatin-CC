from string import ascii_uppercase, digits

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
import numpy as np
import cv2
import imutils
import h5py
import uvicorn

app = FastAPI()


@app.get("/", response_class=HTMLResponse)
async def home():
    return """<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Upload an Image</title>
    </head>
    <body>
        <h1>Upload an Image for Prediction</h1>
        <form action="/predict" method="post" enctype="multipart/form-data">
            <label for="file">Choose an image:</label>
            <input type="file" name="file" id="file" accept="image/*" required>
            <br><br>
            <button type="submit">Upload and Predict</button>
        </form>
    </body>
    </html>"""


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # create labels
        label_names = digits + ascii_uppercase
        labels = {idx: label for idx, label in enumerate(label_names)}

        # load model
        model = h5py.models.load_model("model/model1.h5")

        # get image
        contents = await file.read()
        np_img = np.frombuffer(contents, np.uint8)
        image_to_test = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # get contours
        gray = cv2.cvtColor(image_to_test, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edge = cv2.Canny(blur, 30, 150)
        cntrs = cv2.findContours(
            edge.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        cntrs = imutils.grab_contours(cntrs)
        bbox = [cv2.boundingRect(contour) for contour in cntrs]
        # sort contours from left to right, then top to bottom
        cntrs = [
            c
            for c, _ in sorted(
                zip(cntrs, bbox), key=lambda item: (item[1][0], item[1][1])
            )
        ]

        char_detected = []
        # iterate over contours
        for c in cntrs:
            (x, y, w, h) = cv2.boundingRect(c)

            # ignore small contours based on width and height
            if 10 <= w <= 350 and 15 <= h <= 350:
                # extract Region of Interest (ROI)
                roi = gray[y : y + h, x : x + w]

                # apply binary thresholding to get a binary image
                bin_img = cv2.threshold(
                    roi, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU
                )[1]
                (iH, iW) = bin_img.shape

                # resize to maintain aspect ratio based on the larger dimension (scale factor)
                scale_factor = 28.0 / max(iW, iH)
                new_size = (int(iW * scale_factor), int(iH * scale_factor))
                bin_img = cv2.resize(bin_img, new_size)

                # calculate padding to fit the image into 28x28 size
                dX = (28 - new_size[0]) // 2
                dY = (28 - new_size[1]) // 2

                # pad the image with black (0) and ensure size is 28x28
                padded = cv2.copyMakeBorder(
                    bin_img, dY, dY, dX, dX, cv2.BORDER_CONSTANT, value=0
                )
                padded = cv2.resize(
                    padded, (28, 28)
                )  # ensure it's exactly 28x28 if padding is uneven

                # normalize the image to [0, 1] and reshape to match model input (28, 28, 1)
                padded = np.expand_dims(padded.astype("float32") / 255.0, axis=-1)

                # append the detected character and its bounding box to the list
                char_detected.append([padded, (x, y, w, h)])

        # extract bounding boxes and detected characters
        char_images = np.array([c[0] for c in char_detected], dtype="float32")

        # predict characters using the model
        predictions = model.predict(char_images)

        response = [
            {"prediction": labels[np.argmax(pred)], "probabilty": float(np.max(pred))}
            for pred in predictions
        ]

        return JSONResponse(content=response, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)