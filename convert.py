import cv2
import numpy as np
import sys

def main():
    image_path = "/Users/mangeshchate/.gemini/antigravity-ide/brain/5c42de0f-2730-41c6-be1c-501d7418751e/media__1784789993794.png"
    output_path = "/Users/mangeshchate/Documents/godel-labs/godel-labs-website/public/integration-icons/jira.svg"
    
    # Read image with alpha channel
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Error: Could not read {image_path}")
        sys.exit(1)

    # Check if image has alpha channel
    if img.shape[2] == 4:
        # Use alpha channel directly as the mask
        thresh = img[:, :, 3]
        # Binarize it just in case
        _, thresh = cv2.threshold(thresh, 10, 255, cv2.THRESH_BINARY)
    else:
        # Fallback for RGB
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Find contours from the mask
    contours, _ = cv2.findContours(thresh, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    height, width = img.shape[:2]
    svg_content = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">']
    svg_content.append(f'<path fill="currentColor" fill-rule="evenodd" d="')

    path_data = []

    for contour in contours:
        epsilon = 0.001 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        
        if len(approx) < 3:
            continue

        start_point = approx[0][0]
        p_str = f"M {start_point[0]} {start_point[1]} "
        
        for point in approx[1:]:
            p = point[0]
            p_str += f"L {p[0]} {p[1]} "
        
        p_str += "Z "
        path_data.append(p_str)

    svg_content.append("".join(path_data))
    svg_content.append('"/>')
    svg_content.append('</svg>')

    with open(output_path, "w") as f:
        f.write("".join(svg_content))
    
    print(f"Successfully converted {image_path} to {output_path}")

if __name__ == "__main__":
    main()
