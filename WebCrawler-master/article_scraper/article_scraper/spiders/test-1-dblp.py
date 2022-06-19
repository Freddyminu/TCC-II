# scrapy crawl doi_dblp_1 > tests/1-venues/input/IHC-doi-artigos.links

#[fred]
# scrapy crawl doi_dblp_1 > /home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/ihc/IHC-doi-artigos.links
#[fred]
import scrapy
import json
import os
# import psycopg2
import html


class IEEEX_Spider(scrapy.Spider):
    name = "doi_dblp_1"
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, '../tests/1-venues/input/bd/BD-journals.links')
   
    #filepath = '/home/fred/Desktop/TCC/WebCrawler-master/article_scraper/article_scraper/tests/1-venues/input/bd/BD-journals.links'
    start_urls = []
    with open(filename, "r") as f:
        start_urls = [url.strip() for url in f.readlines()]

    ##############################################

    def parse(self, response):
        xpath_string = "//li[@class='ee']/a/@href"
        links = response.xpath(xpath_string).getall()
        for l in links:
            if('doi.org' in l):
                print(l)
