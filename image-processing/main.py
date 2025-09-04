import argparse
from PIL import Image
from skimage import io
import torch
import torch.nn.functional as F
from transformers import AutoModelForImageSegmentation
from torchvision.transforms.functional import normalize
import numpy as np
import os
import threading


parser = argparse.ArgumentParser(
    prog="Background Remover",
    description="provide a folder or input image, and this will remove its background",
)


ex_group = parser.add_mutually_exclusive_group(required=True)
ex_group.add_argument("-i", "--input", help="file path of an image to remove")
ex_group.add_argument("-f", "--folder", help="a folder of images to process")

model = AutoModelForImageSegmentation.from_pretrained(
    "briaai/RMBG-1.4", trust_remote_code=True
)

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model.to(device)


def preprocess_image(im: np.ndarray, model_input_size: list) -> torch.Tensor:
    print("Preprocessing image...")
    if len(im.shape) < 3:
        im = im[:, :, np.newaxis]

    im_tensor = torch.tensor(im, dtype=torch.float32).permute(2, 0, 1)
    im_tensor = F.interpolate(
        torch.unsqueeze(im_tensor, 0), size=model_input_size, mode="bilinear"
    )
    image = torch.divide(im_tensor, 255.0)
    image = normalize(image, [0.5, 0.5, 0.5], [1.0, 1.0, 1.0])
    return image


def postprocess_image(result: torch.Tensor, im_size: list) -> np.ndarray:
    print("Postprocessing image...")
    result = torch.squeeze(F.interpolate(result, size=im_size, mode="bilinear"), 0)
    ma = torch.max(result)
    mi = torch.min(result)
    result = (result - mi) / (ma - mi)
    im_array = (result * 255).permute(1, 2, 0).cpu().data.numpy().astype(np.uint8)
    im_array = np.squeeze(im_array)
    return im_array


def process_image(image_path: str):
    print(f"Processing image: {image_path}")
    orig_im = io.imread(image_path)
    orig_im_size = orig_im.shape[0:2]
    model_input_size = [1024, 1024]

    image = preprocess_image(orig_im, model_input_size).to(device)
    result = model(image)

    result_image = postprocess_image(result[0][0], orig_im_size)

    print("saving_image...")
    # save result
    pil_mask_im = Image.fromarray(result_image)
    orig_image = Image.open(image_path)
    no_bg_image = orig_image.copy()
    no_bg_image.putalpha(pil_mask_im)

    no_bg_image.save(
        image_path.replace(".webp", "_new.webp"), format="WEBP", quality=100
    )
    print(f"Saved image to {image_path}")
    print("Done!")


def get_files(directory: str, extensions: list) -> list:
    files = [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if os.path.isfile(os.path.join(directory, f))
        and any(f.endswith(ext) for ext in extensions)
    ]

    print(f"Found {len(files)} files in {directory} with extensions {extensions}")
    return files


def process_folder(folder: str):
    image_files = get_files(folder, [".webp"])
    chunks = np.array_split(image_files, 10)
    threads = [
        threading.Thread(target=lambda c: [process_image(f) for f in c], args=(chunk,))
        for chunk in chunks
    ]

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    ins = parser.parse_args()

    if ins.input:
        process_image(ins.input)
    elif ins.folder:
        process_folder(ins.folder)
    else:
        print("Please provide either an input image or a folder of images to process.")
