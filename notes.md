# Section 10. SQL introduction

## NoSQL Introduction
We don't set relations between collections, just duplicate data and change data everywhere  

## Setting Up MySQL

https://dev.mysql.com/downloads/

download:
- mySQL community server
- mySQL workbench

Open workbench - app is running  
schemas => rc 'create new scheme' => apply  

![img.png](images-notes/schema.png)

## Connecting our App to the SQL Database

`npm i --save mysql2`

we'll create connection pool  
create file:  
_max-node/util/database.js_  
