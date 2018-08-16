#!/usr/bin/env python
import sys
from requests import get
from bs4 import BeautifulSoup


def read_html_div(url):
    response = get(url)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    movie_containers = html_soup.find_all('div', class_="text show-more__control")
    review_text = movie_containers[0].text.replace(",",  " ").strip()

    movie_name = html_soup.find_all("div", class_="lister-item-header")

    movie_name = movie_name[0].a.text.strip().replace(" ",  "_")
    filename = movie_name + "_review.txt"
    return filename, review_text


def write_to_file(filename, text):
    f = open(filename, "w")
    f.write(text)
    f.close()


if __name__ == '__main__':
    # bad_review_url = "https://www.imdb.com/review/rw0259289/?ref_=tt_urv"
    # good_review_url = "https://www.imdb.com/review/rw1908115/?ref_=tt_urv"
    # text = read_html_div(good_review_url)
    # write_to_file("good.txt", text)

    urls = sys.argv
    if len(urls) > 1:
        for url in urls[1:]:
            print(url)
            filename, text = read_html_div(url)
            write_to_file(filename, text)
