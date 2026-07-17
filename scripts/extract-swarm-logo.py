import os
from PIL import Image, ImageChops

def isolate_bee_and_make_transparent():
    input_path = '/Users/mangeshchate/.gemini/antigravity-ide/brain/2faf5a2e-7ef1-499b-b47c-c29342e3db1a/media__1784197694632.png'
    output_path = '/Users/mangeshchate/Documents/godel-labs/godel-labs-website/public/integration-icons/openai-swarm.png'
    
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # 1. Flood-fill from top-left corner (0,0) to turn background transparent
    # We will build a mask by finding pixels connected to the corners that are close to white.
    # To be extremely clean, any pixel with R > 245, G > 245, B > 245 that is part of the background.
    # Let's do a simple thresholding first: since the background is solid white, any pixel with R > 250, G > 250, B > 250 is background.
    # To avoid cutting highlights inside the bee, we can define the bee's bounding box:
    # In the original image (1024 x 682), the bee is located on the right side, roughly from x=750 to 980 and y=120 to 320.
    # Let's crop that specific region first, and then make its white background transparent!
    
    # Define bounding box for the bee:
    # Left: 750, Top: 100, Right: 980, Bottom: 350
    bee_box = (750, 100, 980, 350)
    bee_img = img.crop(bee_box)
    
    # Make background of the cropped bee transparent
    datas = bee_img.getdata()
    newData = []
    for item in datas:
        # If pixel is close to white (threshold R > 240, G > 240, B > 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
    bee_img.putdata(newData)
    
    # Trim empty transparent edges
    bbox = bee_img.getbbox()
    if bbox:
        bee_img = bee_img.crop(bbox)
        
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    bee_img.save(output_path, "PNG")
    print("Isolate bee done. Saved to", output_path)

if __name__ == '__main__':
    isolate_bee_and_make_transparent()
