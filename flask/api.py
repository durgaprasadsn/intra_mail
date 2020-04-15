import flask
from flask import *
from flask import Flask
import json
import requests
import re
import csv
import datetime
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

# Check the MongoDB url
client = MongoClient(port=27017)


with open('database.csv', mode='r') as infile:
    reader = csv.reader(infile)
    mydict = {rows[0]:rows[1] for rows in reader}
    #print(mydict)

# Check the Route Once
@app.route('/api/classify', methods = ["POST"])
def classify():
    import classifier


if __name__ == '__main__':
    app.run(debug = True)