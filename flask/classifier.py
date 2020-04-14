from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from math import log, sqrt
import pandas as pd
import numpy as np
import re


def process_message(message, lower_case = True, stem = True, stop_words = True, gram = 2):
    #print(message)
    message = str(message)
    if lower_case:
        message = message.lower()
    words = word_tokenize(message)
    words = [w for w in words if len(w) > 2]
    if gram > 1:
        w = []
        for i in range(len(words) - gram + 1):
            w += [' '.join(words[i:i + gram])]
        return w
    if stop_words:
        sw = stopwords.words('english')
        words = [word for word in words if word not in sw]
    if stem:
        stemmer = PorterStemmer()
        words = [stemmer.stem(word) for word in words]   
    return words


class Classifier(object):
    def __init__(self, trainData, method = 'tf-idf'):
        self.mails, self.labels = trainData['message'], trainData['labels']
        self.method = method

    def train(self):
        self.calc_TF_and_IDF()
        if self.method == 'tf-idf':
            self.calc_TF_IDF()
        else:
            self.calc_prob()

    def calc_prob(self):
        self.prob_ass = dict()
        self.prob_not = dict()
        for word in self.tf_ass:
            self.prob_ass[word] = (self.tf_ass[word] + 1) / (self.ass_words + \
                                                                len(list(self.tf_ass.keys())))
        for word in self.tf_not:
            self.prob_not[word] = (self.tf_not[word] + 1) / (self.not_words + \
                                                                len(list(self.tf_not.keys())))
        self.prob_ass_mail, self.prob_not_mail = self.ass_mails / self.total_mails, self.not_mails / self.total_mails 


    def calc_TF_and_IDF(self):
        noOfMessages = self.mails.shape[0]
        self.ass_mails, self.not_mails = self.labels.value_counts()[1], self.labels.value_counts()[0]
        self.total_mails = self.ass_mails + self.not_mails
        self.ass_words = 0
        self.not_words = 0
        self.tf_ass = dict()
        self.tf_not = dict()
        self.idf_ass = dict()
        self.idf_not = dict()
        for i in range(noOfMessages):
            message_processed = process_message(self.mails[i])
            count = list() #To keep track of whether the word has ocured in the message or not.
                           #For IDF
            for word in message_processed:
                if self.labels[i]:
                    self.tf_ass[word] = self.tf_ass.get(word, 0) + 1
                    self.ass_words += 1
                else:
                    self.tf_not[word] = self.tf_not.get(word, 0) + 1
                    self.not_words += 1
                if word not in count:
                    count += [word]
            for word in count:
                if self.labels[i]:
                    self.idf_ass[word] = self.idf_ass.get(word, 0) + 1
                else:
                    self.idf_not[word] = self.idf_not.get(word, 0) + 1

    def calc_TF_IDF(self):
        self.prob_ass = dict()
        self.prob_not = dict()
        self.sum_tf_idf_ass = 0
        self.sum_tf_idf_not = 0
        for word in self.tf_ass:
            self.prob_ass[word] = (self.tf_ass[word]) * log((self.ass_mails + self.not_mails) \
                                                          / (self.idf_ass[word] + self.idf_not.get(word, 0)))
            self.sum_tf_idf_ass += self.prob_ass[word]
        for word in self.tf_ass:
            self.prob_ass[word] = (self.prob_ass[word] + 1) / (self.sum_tf_idf_ass + len(list(self.prob_ass.keys())))
            
        for word in self.tf_not:
            self.prob_not[word] = (self.tf_not[word]) * log((self.ass_mails + self.not_mails) \
                                                          / (self.idf_ass.get(word, 0) + self.idf_not[word]))
            self.sum_tf_idf_not += self.prob_not[word]
        for word in self.tf_not:
            self.prob_not[word] = (self.prob_not[word] + 1) / (self.sum_tf_idf_not + len(list(self.prob_not.keys())))
            
    
        self.prob_ass_mail, self.prob_not_mail = self.ass_mails / self.total_mails, self.not_mails / self.total_mails 
                    
    def classify(self, processed_message):
        p_ass, pnot = 0, 0
        for word in processed_message:                
            if word in self.prob_ass:
                p_ass += log(self.prob_ass[word])
            else:
                if self.method == 'tf-idf':
                    p_ass -= log(self.sum_tf_idf_ass + len(list(self.prob_ass.keys())))
                else:
                    p_ass -= log(self.ass_words + len(list(self.prob_ass.keys())))
            if word in self.prob_not:
                pnot += log(self.prob_not[word])
            else:
                if self.method == 'tf-idf':
                    pnot -= log(self.sum_tf_idf_not + len(list(self.prob_not.keys()))) 
                else:
                    pnot -= log(self.not_words + len(list(self.prob_not.keys())))
            p_ass += log(self.prob_ass_mail)
            pnot += log(self.prob_not_mail)
        return p_ass >= pnot
    
    def predict(self, testData):
        result = dict()
        for (i, message) in enumerate(testData):
            processed_message = process_message(message)
            result[i] = int(self.classify(processed_message))
        return result


#main part which needs to be made a api

df = pd.read_csv('database.csv')
df['message'] = df['subject'] + " "+ df['body']
df.drop(['subject','body'],axis=1,inplace=True)
df.rename(columns = {'target_value': 'labels'}, inplace = True)
df.drop(df.index[18])

classifier = Classifier(df, 'tf-idf')
classifier.train()

message = "We will have ongoing classes"
pm = process_message(message)
print(classifier.classify(pm))