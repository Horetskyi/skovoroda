import cv2
import numpy as np

# Load the image
image = cv2.imread("./dist/Screenshot_1.jpg", cv2.IMREAD_GRAYSCALE)

_, mask = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY_INV)

# Use inpainting to fill gaps in text
inpainted = cv2.inpaint(image, mask, inpaintRadius=2, flags=cv2.INPAINT_TELEA)

# Save output
cv2.imwrite("./dist/Screenshot_1_2.png", inpainted)