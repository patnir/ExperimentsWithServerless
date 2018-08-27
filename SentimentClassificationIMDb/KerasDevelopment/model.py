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
import tensorflowjs as tfjs

vocab_size = 500


def read_from_csv(file_name):
    df = pd.read_csv(file_name, sep=",")
    df["y"] = df["y"].astype("int16")
    return df


def tensorflow_model(data):
    X_train, X_test, y_train, y_test = train_test_split(data['Text'], data['y'], random_state=0)
    tokenizer = Tokenizer(num_words=vocab_size, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~ ', lower=True, split=' ',
                          char_level=False, oov_token=None)
    tokenizer.fit_on_texts(X_train)
    X_train_Encoded = tokenizer.texts_to_matrix(X_train, mode='count')

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
    model.fit(X_train_Encoded, y_train, epochs=7, verbose=2)
    tfjs_target_dir = "./tfjs_keras"
    model.save("keras_sentiment_model.h5")
    tfjs.converters.save_keras_model(model, tfjs_target_dir)


def predict(model, tokenizer, test_review):
    curr = tokenizer.texts_to_matrix([test_review], mode='count')
    print("=====================================")
    print(np.shape(curr))
    # print(np.shape(curr[0]))
    result = model.predict(curr)
    print(result)
    print(np.shape(result))
    if result[0][0] > 0.5:
        return 1
    return 0



def train(data):

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

    # print(np.shape(X_test_Encoded))
    # print(np.shape(X_test_Encoded[0]))
    # print(np.shape(model.predict(X_test_Encoded)))
    # print(np.shape(model.predict(X_test_Encoded)))

    # x_train_tokenized = tokenizer.token_counts(X_train, mode='binary')
    # print(x_train_tokenized[0])
    return model, tokenizer


def get_text(filename):
    f = open(filename, "r")
    f.seek(0)
    text = f.read()
    f.close()
    text = text.replace(",", " ").strip()
    text = text.lower()
    text = re.sub(r"[!\"#$%&()*+,-./:;<=>?@\[\\\]^_`{|}~]+", ' ', text)
    text = re.sub('\s+', ' ', text).strip()
    return text


def train_tokenizer(data):
    vocab_size = 200
    num_labels = 2
    X_train, X_test, y_train, y_test = train_test_split(data['Text'], data['y'], random_state=0)
    tokenizer = Tokenizer(num_words=vocab_size, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~ ', lower=True, split=' ',
                          char_level=False, oov_token=None)
    # print(X_train)
    tokenizer.fit_on_texts(X_train)
    word_index = tokenizer.word_index
    # print(word_index)
    # for i in word_index.keys()[100:600]:
    count = 0
    curr = ["", ""] * 250
    # print(curr)
    for i in word_index:
        if count == 500:
            break
        curr[count] = [i, int(word_index[i])]
        count += 1
    # print(np.vstack([word_index.keys(), word_index.values()]))
    curr = np.array(curr)
    print(np.shape(curr))
    df = pd.DataFrame(data=curr, columns=["Words", "Index"])
    df.to_csv("word_index.csv",index=False)

    # word_index = pd.DataFrame(data=word_index.keys(), word_index.values()))
    # word_count = pd.DataFrame(data=tokenizer.word_counts)
    # print(word_index)

    return tokenizer


def work_train():
    df = read_from_csv("../all_data.csv")
    model, tokenizer = train(df)
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


def create_dictionary():
    curr = pd.read_csv("word_index.csv")
    # print(np.array(curr["Words"]))
    words = np.array(curr["Words"])
    index = np.array(curr["Index"])
    return dict(zip(words, index))


def create_index_array(text, word_index):
    current = np.zeros((len(word_index), 1))
    for i in text.split(" "):
        if i in word_index:
            current[word_index[i]] += 1
    return current


def predict_without_tokenizer(model, matrix):
    result = model.predict(np.transpose(matrix))
    print("result value {}".format(result[0][0]))
    if result[0][0] > 0.5:
        return 1
    return 0



def train_predict_without_tokenizer():
    df = read_from_csv("../all_data.csv")
    model, tokenizer = train(df)
    word_index = create_dictionary()
    movie_files = sys.argv
    if len(movie_files) > 1:
        for file in movie_files[1:]:
            print(file)
            curr_movie = get_text(file)
            tokenized = create_index_array(curr_movie, word_index)
            prediction = predict_without_tokenizer(model, tokenized[0:vocab_size])
            if prediction == 1:
                print("Good Review")
            else:
                print("Bad Review")

def train_predict_without_tokenizer_specific():
    df = read_from_csv("../all_data.csv")
    model, tokenizer = train(df)
    word_index = create_dictionary()
    text = get_text("test1.txt")
    tokenized = create_index_array(text, word_index)
    print(np.shape(tokenized))
    prediction = predict_without_tokenizer(model, tokenized[0:vocab_size])
    print(prediction)


if __name__ == '__main__':
    # work_train()
    # train_predict_without_tokenizer()
    # train_predict_without_tokenizer_specific()
    df = read_from_csv("../all_data.csv")
    tensorflow_model(df)



