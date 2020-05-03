#import ModelInstance
#from ModelInstance import classifier

classifier = None

def initialize(param):
    global classifier
    initializing = param
    if initializing=='1':
        print('Inicializando classe')
        classifier = ClassifierModel(sys.argv[1])
        initializing = 0
    else:
        print('ja inicializado')
        classifier = classifier

print('teste')

