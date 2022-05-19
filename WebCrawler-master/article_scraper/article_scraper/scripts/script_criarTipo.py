# python3 script_tipo.py
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
    cursor.execute(update_query, index)
    connection.commit()

select_query_tipo = """
    SELECT title
    FROM articles 
    WHERE
        article_id = %s; """

select_query_venue = """
    select
        ar.title, 
        ar.tipo, 
        ve.venue_id,
        ve.title,
        ve.tipo,
        ve.venue_id
    from
        articles ar
        inner join 
            venues ve
            on ve.venue_id  = ar.fk_venue 
    where
        ar.article_id = %s and
        ve.tipo is null;
 """

update_query_tipo = """
    UPDATE articles
    SET 
        tipo = %s
    WHERE
	    article_id = %s;
    """

update_query_venue = """
    UPDATE venues
    SET 
        tipo = %s
    WHERE
	    venue_id = %s;
    """

def limpar(q):
    d = re.sub('[^0-9a-zA-Z]+', ' ', q)
    return d

def make_query(q):
    data = {}
    base = 'https://dblp.org/search/publ/api?'
    search = 'q=' + '+'.join(limpar(q).split(' '))
    form = '&format=json'
    hit = '&h=1'

    data['url'] = base + search + form + hit
    print(data['url'])

    r = requests.get(data['url'])
    print(r.status_code)
    d = r.json()['result']
    #print(d)

    if (limpar(q) == ' '):
        return
    if (int(d['hits']['@total']) == 0):
        return ''

    hits = d['hits']['hit']
    for h in hits:
        data['type'] = h['info']['type']
        pprint(data)
        return data['type']

def venue_tipo(result):
    ar_title = result[0]
    ar_tipo = result[1]
    ve_venue_id = result[2]
    ve_title = result[3]
    ve_tipo = result[4]
    ve_id = result[5]

    print("\tar_title", result[0])
    print("\tar_tipo", result[1])
    print("\tve_venue_id", result[2])
    print("\tve_title", result[3])
    print("\tve_tipo", result[4])
    print("\tve_id", result[5])

    venue_tipo = ''
    if (ar_tipo == 'Conference and Workshop Papers'):
        venue_tipo = 'Conference'
    elif (ar_tipo == 'Journal Articles'):
        venue_tipo = 'Journal'


    print("queijo: ",venue_tipo)
    return venue_tipo, int(result[5])

def main():
    start = 1
    end   = 2000
    for index in range(start, end):
        result = retrieve_data(select_query_venue, [index])
        if (not result == None and result[0] != ""):
            print(index+1)
            # inserindo o tipo de artigo em cada artigo...
            tipodoartigo = make_query(result[0])
            print("Tipo do artigo: ", tipodoartigo)

            inserir = []
            inserir.append(tipodoartigo)
            inserir.append(index)
            
            update_data(update_query_tipo, inserir)
            ###
    # somente depois de pegar o tipo de todos os artigos
    for index in range(start, end):   
        result = retrieve_data(select_query_venue, [index])
        if (not result == None and result[0] != ""):
            
            # pegar do artigo e colocar no venues
            ve, ve_index = venue_tipo(result)
            if (result[4] == None):
                print("Escolha: ", ve)
            if (not ve == '' ): 
                update_data(update_query_venue, [ve, ve_index])
            ###

if __name__ == "__main__": main()