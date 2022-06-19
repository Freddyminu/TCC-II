# scrapy crawl doi_test_1 > tests/1-venues/input/IHC-final-artigos-2.links

# [FRED]
# scrapy crawl doi_test_1 > /home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/ihc/IHC-final-artigos-2.links
# scrapy crawl doi_test_1 > /home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/bd/BD-final-artigos-2.links

# [FRED]
import scrapy
import json
import psycopg2
import html
import os

import logging


class IEEEX_Spider(scrapy.Spider):
    name = "doi_test_1"
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, '../tests/1-venues/input/ihc/IHC-doi-artigos.links')
   
    #filename = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/ihc/IHC-doi-artigos.links'
    start_urls = []
    with open(filename, "r") as f:
        start_urls = [url.strip() for url in f.readlines()]

    print("teste")


    log_file = os.path.join(dirname, '../tests/1-venues/input/IHC-final-artigos.log')

    #log_file = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/IHC-final-artigos.log'
    logging.basicConfig(filename=log_file,level=logging.DEBUG)

    ##############################################
    
    def parse(self, response):
        print(response.request.url)