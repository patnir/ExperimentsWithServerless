from os import listdir
from os.path import isfile, join
import numpy as np
import pandas as pd

def read_file(filename):
    f = open(filename, "r")
    f.seek(0)
    text = f.read()
    f.close()
    return text.strip()


def get_files(path, label):
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    # count = 0
    train_data = np.empty((0, 2))
    for i in onlyfiles:
        # if count == 5:
        #     break
        currentFileText = read_file(path + "/" + i)
        train_data = np.append(train_data, np.array([[currentFileText, label]]), axis=0)
        # count += 1
    return train_data
    # train = pd.DataFrame(train_data, columns=columns)
    # return train


def read_from_csv(file_name):
    df = pd.read_csv(file_name, sep="\t")
    print(df)
    df["Sentiment"] = df["Sentiment"].astype("int16")
    return df


if __name__ == '__main__':
    # filename = "review_data/txt_sentoken/neg/cv000_29416.txt"
    # read_file(filename)
    columns = np.array(["Text", "Sentiment"])
    pos_path = "review_data/txt_sentoken/pos"
    label = 1
    current = get_files(pos_path, label)
    neg_path = "review_data/txt_sentoken/neg"
    label = 0
    current = np.append(current, get_files(neg_path, label), axis=0)
    train = pd.DataFrame(current, columns=columns)
    train["Sentiment"] = train["Sentiment"].astype("int16")
    file_name = "all_data.csv"
    train.to_csv(file_name, sep='\t', encoding='utf-8', index=False)
    df = read_from_csv(file_name)
    print(df == train)


