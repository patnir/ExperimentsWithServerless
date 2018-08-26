from keras.preprocessing.text import Tokenizer
from sklearn.model_selection import train_test_split
import pandas as pd
import sys
import re
import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Flatten
from keras.layers import Embedding
from keras.layers.convolutional import Conv1D
from keras.layers.convolutional import MaxPooling1D


def read_from_csv(file_name):
    df = pd.read_csv(file_name, sep=",")
    df["y"] = df["y"].astype("int16")
    return df


def predict(model, tokenizer, test_review):
    curr = tokenizer.texts_to_matrix([test_review], mode='count')
    print(np.shape(curr))
    # print(np.shape(curr[0]))
    result = model.predict(curr)
    print(result)
    print(np.shape(result))
    if result[0][0] > 0.5:
        return 1
    return 0


def train_tokenizer(data):
    vocab_size = 200
    num_labels = 2
    X_train, X_test, y_train, y_test = train_test_split(data['Text'], data['y'], random_state=0)
    tokenizer = Tokenizer(num_words=vocab_size, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~ ', lower=True, split=' ',
                          char_level=False, oov_token=None)
    # print(X_train)
    tokenizer.fit_on_texts(X_train)
    return tokenizer

def train(data):
    vocab_size = 200
    num_labels = 2
    X_train, X_test, y_train, y_test = train_test_split(data['Text'], data['y'], random_state=0)
    tokenizer = Tokenizer(num_words=vocab_size, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~ ', lower=True, split=' ', char_level=False, oov_token=None)
    # print(X_train)
    tokenizer.fit_on_texts(X_train)

    # print(tokenizer.word_counts)
    # print(tokenizer.word_index)

    # pd.DataFrame(data=tokenizer.word_index)
    # pd.DataFrame(data=tokenizer.word_counts)

    X_train_Encoded = tokenizer.texts_to_matrix(X_train, mode='count')
    X_test_Encoded = tokenizer.texts_to_matrix(X_test, mode='count')

    # print(X_train_Encoded[0])

    model = Sequential()
    model.add(Embedding(vocab_size, 100, input_length=vocab_size))
    model.add(Conv1D(filters=32, kernel_size=8, activation='relu'))
    model.add(MaxPooling1D(pool_size=2))
    model.add(Flatten())
    model.add(Dense(10, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))
    print(model.summary())

    # compile network
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    # fit network
    model.fit(X_train_Encoded, y_train, epochs=5, verbose=2)

    loss, acc = model.evaluate(X_test_Encoded, y_test, verbose=0)
    print('Test Accuracy: %f' % (acc * 100))

    print(np.shape(X_test_Encoded))
    print(np.shape(X_test_Encoded[0]))
    print(np.shape(model.predict(X_test_Encoded)))
    print(np.shape(model.predict(X_test_Encoded)))

    # x_train_tokenized = tokenizer.token_counts(X_train, mode='binary')
    # print(x_train_tokenized[0])
    return model, tokenizer


def get_text(filename):
    f = open(filename, "r")
    f.seek(0)
    text = f.read()
    f.close()
    text = text.replace(",", " ").strip()
    text = re.sub('\s+', ' ', text).strip()
    return text


if __name__ == '__main__':
    df = read_from_csv("../all_data.csv")
    model, tokenizer = train(df)
    # tokenizer = train_tokenizer(df)
    movie_files = sys.argv
    if len(movie_files) > 1:
        for file in movie_files[1:]:
            print(file)
            curr_movie = get_text(file)
            prediction = predict(model, tokenizer, curr_movie)
            if prediction == 1:
                print("Good Review")
            else:
                print("Bad Review")

