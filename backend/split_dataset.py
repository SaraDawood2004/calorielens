import os
import shutil
import random

dataset_path = ".dataset/train"
test_path = ".dataset/test"

split_ratio = 0.2

for food_class in os.listdir(dataset_path):

    class_path = os.path.join(dataset_path, food_class)

    if not os.path.isdir(class_path):
        continue

    images = os.listdir(class_path)
    random.shuffle(images)

    test_size = int(len(images) * split_ratio)

    test_class_path = os.path.join(test_path, food_class)
    os.makedirs(test_class_path, exist_ok=True)

    for img in images[:test_size]:

        src = os.path.join(class_path, img)
        dst = os.path.join(test_class_path, img)

        shutil.move(src, dst)

    print(f"{food_class} -> {test_size} images moved to test folder")

print("Dataset split completed.")