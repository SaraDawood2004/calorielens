import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

classes = ['biryani','burger','cake','chapathi','chicken_curry','donuts','dosa',
           'french_fries','fried_rice','ice_cream','idly','pancakes','pizza',
           'samosa','sandwich','waffles']

model = models.resnet18()

num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 16)

model.load_state_dict(torch.load("food_model.pth", map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],
                         [0.229,0.224,0.225])
])

def predict(image_path):

    image = Image.open(image_path).convert("RGB")
    image = transform(image)
    image = image.unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs,1)

    return classes[predicted.item()]


if __name__ == "__main__":

    img_path = "sample.jpg"  #change this 
    food = predict(img_path)

    print("Predicted Food:", food)