import flask
from flask import *
from flask import Flask
from flask import request
from flask import jsonify
import re
import pandas as pd
import datetime
from classifier import Classifier,process_message

app = Flask(__name__)

"""
with open('database.csv', mode='r') as infile:
    reader = csv.reader(infile)
    mydict = {rows[0]:rows[1] for rows in reader}
    #print(mydict)"""

df = pd.read_csv('database.csv')
df['message'] = df['subject'] + " "+ df['body']
df.drop(['subject','body'],axis=1,inplace=True)
df.rename(columns = {'target_value': 'labels'}, inplace = True)

classifier = Classifier(df, 'tf-idf')
classifier.train()
print("training complete")

# Check the Route Once
@app.route('/api/classify', methods = ["POST"])
def classify():
    print("Received the request")
    data = request.get_json()['message']
    #print(data['message'])
    pm = process_message(data)
    category = ""
    if(classifier.classify(pm)):
        category = 'assignment'
    else:
        category = 'notification'
    return jsonify({'category':category}),200
    #pm = process_message(message)
    #print(classifier.classify(pm))


if __name__ == '__main__':
    app.run(debug = True,port=9000)