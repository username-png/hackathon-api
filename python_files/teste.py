import ClassifierModel
from ClassifierModel import *


model = ClassifierModel()

data = {
    "product_id": 1,
    "question": 'Qual o tamanho?'
}

results = model.run_models(data)
print(results)