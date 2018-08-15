import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import roc_auc_score
from sklearn.naive_bayes import MultinomialNB


def read_from_csv(file_name):
    df = pd.read_csv(file_name, sep="\t")
    df["Sentiment"] = df["Sentiment"].astype("int16")
    return df


def train(df):
    X_train, X_test, y_train, y_test = train_test_split(df['Text'], df['Sentiment'], random_state=0)
    vect = CountVectorizer().fit(X_train)
    X_train_vectorized = vect.transform(X_train)
    model = MultinomialNB(alpha=0.1).fit(X_train_vectorized, y_train)
    predictions = model.predict(vect.transform(X_test))
    print(roc_auc_score(y_test, predictions))
    return vect, model


def get_text(filename):
    f = open(filename, "r")
    f.seek(0)
    text = f.read().strip()
    f.close()
    return text


def predict(vect, model, text):
    data = pd.DataFrame(data=[text], columns=["Text"])["Text"]
    predictions = model.predict(vect.transform(data))
    return predictions


if __name__ == '__main__':
    df = read_from_csv("all_data.csv")
    vect, model = train(df)

    text2 = get_text("bad.txt")
    text1 = get_text("good.txt")

    print(predict(vect, model, text2))
    print(predict(vect, model, text1))


