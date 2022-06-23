# python3 script_converterDatas.py
from psycopg2 import connect, sql
from bson.objectid import ObjectId
from utils import pprint, sanitize

import json
import logging, sys
import re
import requests
import time
import html as ht

from functools import reduce
from lxml import html


connection = connect ( user="arthur",
                        password="senha",
                        host="127.0.0.1",
                        port="5432",
                        database="venues_db")
cursor = connection.cursor()

def retrieve_data(select_query, input_):
    input_ = list(map(lambda x: sanitize(str(x)), input_))
    cursor.execute(select_query, input_)
    data = cursor.fetchone()
    return data

def update_data(update_query, index):
    print("Update query: ", update_query)
    print("article id: ", index[0])
    print("Formatted date: ", index[1], "\n")


    cursor.execute(update_query,  index)
    connection.commit()

select_query_article = """
    select
        ar.title,  
        ar.date
    from
        articles ar
    WHERE
        article_id = %s;
 """

update_query_date = """
    UPDATE articles
    SET 
        date_formatted = %s
    WHERE
	    article_id = %s; 
    """

def limpar(q):
    d = re.sub('[^0-9a-zA-Z]+', ' ', q)
    return d

def convert_date(_date_):
    d = get_day(_date_)
    m = get_month(_date_)
    y = get_year(_date_)
    if (y == '█'):
        return ''
    return y + '-' + m + '-' + d

def get_day(_date_):
    d = _date_.lower().split(" ")
    month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']


    _d = d[0]

    for i in range (len(month)):
        if ((month[i] in _d) or (meses[i] in _d)):
            return '01'


    years = list(range(1900, 2100))
    for y in years:
        _y_ = str(y)
        if (_y_ in d[0]):
            return '01'
    
    flag = True
    coisa = list(range(1, 32))
    for c in coisa:
        c_ = str(c)
        if (c_ in d[0]):
            flag = False

    if (flag):
        return "01"


    if ('-' in d[0]):
        new_d = d[0].split('-')[0]
        if (len(new_d) == 1):
            return "0" + new_d
        return new_d

    return d[0][0:2]

def get_month(_date_):
    month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    _d = _date_.lower() 

    coisa = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    if ('firstquarter' in _d):
        return "01"
    
    if ('secondquarter' in _d):
        return "04"

    if ('thirdquarter' in _d):
        return "07"

    if ('fourthquarter' in _d):
        return "10"
    

    for i in range (len(month)):
        if ((month[i] in _d) or (meses[i] in _d)):
            return coisa[i]
    return '01'

def get_year(_date_):
    years = list(range(1900, 2100))
    for y in years:
        _y_ = str(y)
        if (_y_ in _date_):
            return _y_
    return '█'


def main():
    start = 10000
    end   = 250000
    for index in range(start, end):
        try:
            result = retrieve_data(select_query_article, [index])
        #print(result)
        
            print("index: ", index)        
            
            print(result[0])
            print(result[1])

        
            d = convert_date(result[1])

            print("Data Anterior: ", result[1])
            print("Data convertida: ", d, "\n")

            inserir = []
            inserir.append(d)
            inserir.append(index)
                

            update_data(update_query_date, inserir)

        except:
            print("\nFinalizado!\n")
            break


if __name__ == "__main__": main()