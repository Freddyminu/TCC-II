# scrapy crawl doi_test_2 > /home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/bd/BD-final.links
# scrapy crawl doi_test_2 > /home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/ihc/IHC-final.links



import scrapy
import json
import psycopg2
import html
import logging
# import logging
# from scrapy.utils.log import configure_logging 

class IEEEX_Spider(scrapy.Spider):
    name = "doi_test_2"

    filename = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/bd/BD-doi-artigos.links'
    #filename = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/ihc/ihc-final.links'
    start_urls = []
    with open(filename, "r") as f:
        start_urls = [url.strip() for url in f.readlines()]

    log_file = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/BD-final-artigos.log'
    logging.basicConfig(filename=log_file,level=logging.DEBUG)

    ##############################################

    def parse(self, response):
        print(response.request.url)