import pandas as pd
import numpy as np
import re
import joblib as jb
from scipy.sparse import hstack, csr_matrix
import json
import string
from nltk.corpus import stopwords
from string import punctuation
import warnings
warnings.filterwarnings("ignore")

'''
To run this class do:
pip install -r requirements.txt

'''

class ClassifierModel:

    def __init__(self):
        self.random_forest = jb.load("../models/random_forest_20200502.pkl.z")
        self.lgbm = jb.load('../models/lgbm_20200502.pkl.z')
        self.vectorizer = jb.load('../models/questions_vectorizer_20200502.pkl.z')

    

    def _remove_punct(self,text):
        text = str(text)
        text  = "".join([char for char in text if char not in string.punctuation])
        text = re.sub('[0-9]+', ' ', text)
        
        return text.lower()

    def _remove_stops(self,text):
        clean = [word for word in text.split() if word.lower() not in stopwords.words('portuguese')]
        return ' '.join(clean)

    def get_predictions(self,product_id,text):
        text_clean = self._remove_stops(self._remove_punct(text))
        text_list = [text_clean]
        
        dict_info = {
            'product_id': [product_id],
        }
        numeric = pd.DataFrame(dict_info)

        
        text_vec = self.vectorizer.transform(text_list)
        stack = hstack([numeric,text_vec])

        p = self.lgbm.predict(stack)
        proba = self.lgbm.predict_proba(stack)[:,1]

        return int(p)
    

if __name__ == '__main__':
    model = ClassifierModel()
    pred = model.get_predictions(0,'Gostaria de saber se comprando 10 unidades tenho desconto?')
    print('Previsao:', pred)
    pred = model.get_predictions(0,'Qual a cor?')
    print('Previsao:',pred)

        




