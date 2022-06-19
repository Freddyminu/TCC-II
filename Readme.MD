# Trabalho de Conclusão de Curso
Continuação do Trabalho de [Arthur Schuelter](https://github.com/hschuelter) no qual criou uma ferramenta de extração, armazenamento e exibição de dados (Titulo, Autores, Rede de Colaboração, etc...) de publicações cientificas. 

A Continuação do trabalho procura melhorar a ferramenta na questão de acessibilidade utilizando as diretrizes da [WCAG 2.0](https://www.w3.org/TR/WCAG20/).

A nova implementação da ferramenta foi feita no Ubuntu 20.04.3 LTS. 

### Organização do manual da ferramenta.
- Frontend
- Backend
- Crawler 
    - ACM
    - IEEE Xplore
    - Springer
        - Springer chapters
        - Springer articles
- Base de dados
    - MongoDB
    - PostgreSQL
        - inicialização/configuração do banco
        - Conversão do MongoDB para PostgreSQL

# Frontend
> É necessário ter o NPM instalado e estar no diretório do frontend: TCC/frontend-master

### - Installação do npm
```
sudo apt install npm
```

### - Installação e iniciação do frontend
```
npm install

npm start
```


# Backend
> É necessário ter o NPM instalado e estar no diretório do backend:
TCC/as-backend-master

### - Installação e iniciação do backend
```
npm install

npm start
```


# Crawler
> Não é mais necessário modificar os caminhos das pastas para que funcione os crawlers. :)

### - Installação do scrapy
```
sudo apt install python3-scrapy
```

### - Installação do pip
```
sudo apt install python3-pip
```

### - Installação das bibliotecas necessarias <br>
Localizado no diretorio: TCC/WebCrawler-master
```
pip3 install -r requirements.txt
```

### - Iniciação dos crawlers
Cada comando inicia a extração dos dados de cada site sendo eles ACM, IEEE Xplore e Springer (Springer é dividido em chapters e articles)
```
scrapy crawl acm

scrapy crawl ieeex

scrapy crawl springer_chapters

scrapy crawl springer_articles
```
>Os crawlers estão configurados inicialmente de forma não salvar os dados extraídos na base de dados MongoDB. Para salvar os dados extraídos é preciso tirar o comentário da ultima linha de cada crawler.

# Base de Dados
O funcionamento da base de dados é da seguinte maneira. O crawler acessa a pagina para extrair as informações, estas informações são enviadas para a base de dados MongoDB e depois apos finalizar a extração de dados é preciso executar o script *ConvertMongoDBparaPostgreSQL.py* para realizar a conversão dos dados do MongoDB para a base de dados PostgreSQL, que é a base que o Frontend utiliza.

### - Instalação do [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```
Comandos disponiveis do servicio do MongoDB (Apos instalar, verificar se esta funcionando com o primeiro comando).
```
sudo service mongod status
sudo service mongod start
sudo service mongod stop 
sudo service mongod restart
```
> Apos instalar e iniciar o serviço do MongoDB já é possível extrair e armazenar os dados pegos pelos crawlers apos remover o comentário anteriormente discutido.

### - Instalação do [PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/) 
```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update

sudo apt-get -y install postgresql-14
```
Comandos disponiveis do servicio do PostgreSQL (Apos instalar, verificar se esta funcionando com o primeiro comando).
```
sudo service postgresql status 
sudo service postgresql start
sudo service postgresql stop 
sudo service postgresql restart
```
### - Inicialização/Configuração da base de dados do PostgreSQL
Ao contrário do MongoDB, o PostgreSQL precisa da criação do banco de dados como também algumas modificações de permissão para funcionar.

Abrir o arquivo *pg_hba.conf* e mudar as formas de acesso para **trust**.
```
sudo nano /etc/postgresql/14/main/pg_hba.conf
```
Deve ficar como abaixo:
```
# Database administrative login by Unix domain socket
local   all             postgres                                trust

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
```
Apos isso é preciso reiniciar o servicio do PostgreSQL.
```
sudo service postgresql restart 
```
Agora iremos criar o Usuario Arthur e a base de dados Venues_db.
```
sudo -i -u postgres

psql
```
Apos relizar os comandos acima é preciso copiar e colar **TODO** o conteudo dentro do arquivo *database.txt* (Localizado no diretorio: WebCrawler-master/database.txt).

> Agora com a base de dados e usuario criados, é possivel realizar o envio dos dados Da base de dados MongoDB para a base de dados PostgreSQL.

### - Conversão do MongoDB para PostgreSQL
Tendo a base de dados MongoDB populado com dados da ACM, IEEE Xplore e Springer é possivel realizar a conversao dos dados atraves do *ConvertMongoDBparaPostgreSQL.py* (No diretorio: WebCrawler-master/article_scraper/article_scraper/scripts).
```
python3 ConvertMongoDBparaPostgreSQL.py
```
é necessario escolher qual dado vai ser convertido no final do codigo *ConvertMongoDBparaPostgreSQL.py*: 

```python
col_name = 'ieeex' # As opcoes sao: acm, ieeex, springer_chapters e springer_articles.
```
Apos realisar a convers~ao dos dados 'e necessario formatar as datas e os tipos para isso execute os dois scripts (No diretorio: WebCrawler-master/article_scraper/article_scraper/scripts): 
```
python3 script_converterDatas.py

python3 script_criarTipo.py
```

> Neste momento ja 'e possivel utilizar a ferramenta com o frontend ativado e o backend ativado.













