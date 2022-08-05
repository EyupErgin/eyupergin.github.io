---
title: 'Web Güvenlik Duvarlarını Bypasslamak - #2'
description: Herkese merhaba, bu yazımda sizlerler Wafw00f, Nmap, gibi otomasyon araçlarını
  kullanarak WAF Bypassing konusuna kısaca değindim. Ayrıca Pozitif ve Negatif güvenlik
  modelleri ve örnek bir filtreleme zafiyetini nasıl aşabileceğimi gösterdim. İyi
  okumalar.
layout: post
---

<img src="/images/1_Yw-kj1AZ7ksAeF8Pg8tG1A.png">

> Herkese merhaba, bu yazımda sizlerler Wafw00f, Nmap, gibi otomasyon araçlarını kullanarak WAF Bypassing konusuna kısaca değindim. Ayrıca Pozitif ve Negatif güvenlik modelleri ve örnek bir filtreleme zafiyetini nasıl aşabileceğimi gösterdim. İyi okumalar. [Click for English](/web-application-firewall-bypassing-2)


### Giriş
Tekrardan merhaba! Kısa bir aranın ardından seriye devam ediyoruz. Bugün sizlerle WAF Bypassing serisinin 2. kısmına geçmeden önce 1. kısma dair kısa bir özet geçelim. Önceki yazımda Firewall türlerine, modülerliklerini iyi ve kötü yanları ile inceledik. Ardından sunucu yerleşimlerine geçtik. Ve son olarak Proxy'ler e değindik. Bu yazımda ise sizlerle WAF Fingerprint işlemini, wafw00f ve nmap scriptlerini kullanarak aktif ve pasif bilgi toplamaya değineceğim. İyi okumalar. <br>

Öyleyse, website üzerinde güvenlik duvarı tespiti ile başlayalım. Bunun için otomasyon toolu olan Wafw00f'u kullanacağım.<br>

### Wafw00f:
Öncelikle bu işlem için kullandığınız bilgisayarda toolun kurulu olduğunu varsayıyorum. Eğer değilse birkaç basit işlem ile kurabilirsiniz. Kurulum kısmını atlayacağım. Öncelikle terminal ekranında girmemiz gereken kod sadece ve sadece şu koddur.

```
wafw00f target.com
```

Kodu yazıp çalıştırdıktan sonra aşağıdaki resimdeki gibi bir çıktı alacaksınız. Burada size verilen çıktı sade ve öz. Hedef sitede kullanılan WAF'ın bize "Cloudflare (Cloudflare Inc.)" olduğunu söylüyor. 

<p align="center">
	<img src="/images/woof.png">
</p>

Gördüğünüz üzere Wafw00f bize hedef site üzerinde kullanılan firewall'ı başarılı şekilde tespit etti. Şimdi ise Nmap Waf-Fingerprint üzerinde aynı hedef siteyi tarayalım.<br>


### Nmap:
Nmap nedir? Ne değildir? Gibi sorulara takılmadan kısa yoldan işleme geçeceğiz. Bu işlem için de aynı şekilde bilgisayarınızda Nmap'in kurulu olduğunu varsayarak hareket edeceğiz. Terminalimizi açıyoruz ve şu kodları kullanıyoruz.

```
nmap --script http-waf-detect target.com
```

Burada yazdığımız kod portlar üzerinde sınırlama yapmadan tüm portları deneyecektir ancak, hedef site üzerinde kısıtlı bir port taraması yapmak isterseniz kullanmanız gereken kod şu şekildedir:

```
nmap -p80 --script http-waf-detect target.com
```
Veya site üzerinde istediğiniz birkaç port var ise de şu kodu kullanmanız faydalı olacaktır.

```
nmap -p80,443 --script http-waf-detect target.com
```

Kodumuzu yazdıktan sonra sırada çıkan sonucu görmek kaldı. Çıkan sonucumuz ise şu şekilde:

<p align="center">
	<img src="/images/woof2.png">
</p>

Burada Nmap'in bize verdiği sonucu incelediğimizde aynı hedef üzerinde testler yapsamda, Nmap bize kullanılan WAF türünü çıktı olarak sunamadı. Ancak Wafw00f bunu başarılı şekilde aktardı. Eğer Nmap bize doğru sonucu verebilseydi alacağımız çıktı şu şekilde olacaktı.

```
PORT   STATE SERVICE
80/tcp open  http
|_http-waf-detect: IDS/IPS/WAF detected
```

Örnek çıktıyı bu tür bir tespit edememe durumunda vermek en doğrusu olacaktır.<br>

Peki, WAF türünü tespit ettik. Şimdi ne yapacağız?<br>

Bundan sonra yazacağımız tüm bypass kodlarını buna göre yazacağız. O zaman biraz daha derine inelim. Yazdığımız bypassing kodları da WAF türünü tespit etmek kadar önemlidir. Çünkü kodlarımızı WAF'ların bizi normal bir input değeri olarak tanımlaması için Firewall'ın türüne göre hareket etmeliyiz. Bu durumda Firewall'ları 2'ye ayırmalıyız. <br><br>

* Pozitif Güvenlik Modeli
* Negatif Güvenlik Modeli


<br><br>
Bu iki güvenlik modeli de WAF'lar üzerinde Web servisleri için belirtilen filtrelere göre hareket etmektedir. Örneğin aşağıda Pozitif ve Negatif modellerin karşılaştırması bulunmaktadır.

<p align="center">
	<img src="/images/pstvngtv.png">
</p>

Şimdi ise iyi ve kötü yanlarını gördüğümüze göre sırada bir Entegre WAF kodu ve bunun bypass kodunu görelim. En azından bu konuda bir örnek daima iyi olacaktır.<br><br>

<p align="center">
	<img src="/images/1607935977310.png">
</p>

Burada gördüğünüz üzere bir filtre mevcut. Ve bu filtreyi atlamak için yapmamız gereken şey bizim giriş için göndereceğimiz input'un filtrenin algılayamayacağı veya normal bir değer olarak algılamasını sağlamak. Böylece erişimimiz sağlanacak. Kod ise şu şekildedir:

```
‘/(?:(.{2,})\1{32,})|(?:[+=|\-@\s]{128,})/’, Path Parameters Exploitation /myapp/admin.php / xyz? userid = 1PAYLOAD /myapp;/admin.php?userid=1PAYLOAD
```

Kısaca ve basitçe açıklamak gerekirse bir uygulama çalışıyor sunucuda ve bu uygulama güvenlik duvarı ile girişleri denetliyor. Basit bir admin panel de buna örnek olarak verilebilir. Filtrelemenin zaafiyetinden yararlanarak bir payload yarattık ve bu payload'ı input değeri olarak verdiğimizde biz güvenlik duvarını geçmiş olacağız.

Burada kısa şekilde bir kod zafiyetinden yararlanıp güvenlik duvarını bypassladık. Şimdi ise bunu daha da ilerletme ve farklı yöntemleri denemenin vakti. Ancak bunun için 3. kısımda görüşüyor olacağız. Bir sonraki yazımda görüşmek dileğiyle.
