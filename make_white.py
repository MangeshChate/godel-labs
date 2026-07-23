import cv2
import sys

def main():
    image_path = "/Users/mangeshchate/.gemini/antigravity-ide/brain/5c42de0f-2730-41c6-be1c-501d7418751e/media__1784789993794.png"
    output_path = "/Users/mangeshchate/Documents/godel-labs/godel-labs-website/public/integration-icons/jira.png"
    
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Error: Could not read {image_path}")
        sys.exit(1)

    if len(img.shape) == 3 and img.shape[2] == 4:
        # Image has an alpha channel. Change all RGB channels to 255 (White).
        img[:, :, 0] = 255 # B
        img[:, :, 1] = 255 # G
        img[:, :, 2] = 255 # R
        
        cv2.imwrite(output_path, img)
        print(f"Successfully converted and saved to {output_path}")
    else:
        print("Image doesn't have an alpha channel to preserve.")

if __name__ == "__main__":
    main()
