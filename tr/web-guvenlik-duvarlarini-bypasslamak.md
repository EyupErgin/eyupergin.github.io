---
title: 'Web Güvenlik Duvarlarını Bypasslamak - #1'
---

<img src="/images/webapplicationfirewallbypass-intro.png">


> Bu yazımda WAF'ların ne olduğuna, Nasıl çalıştığına, WAF Türlerine, Sunucu ve WAF Yerleşimi gibi konulara değindim. İyi okumalar. [Click for English](/web-application-firewall-bypass-intro)


### Giriş
Birçoğumuzunda bildiği gibi WAF'lar site ile kullanıcı arasında bulunurlar. WAF'lar kullanıcının siteye ulaşmak için gönderdiği request'i alır, analiz eder, ve siteye gönderir. Bu güvenlik duvarının temel yapıtaşı client ile server arasındaki iletişimi yöneten HTTP Protokolüdür. Bu protokolde firewall'ların yaptığı şey, HTTP'den gelen istekleri denetlemek, bir diğer terimle filtrelemektir. Aksi halde eğer kullanıcıdan gelen olağan dışı bir istek görür ise IP adresini bloklar. Bu filtrelemeler siteyi XSS, SQL Injection gibi bu alanda yaygın saldırılardan korur. Ancak firewall'lar herzaman bu saldırıları engelleyemezler.<br>

Reverse Proxy adı verilen güvenlik duvarlarını duymuş olabilirsiniz. Bunun nedeni ise firewall'ların sadece server tarafını korumasıdır. Ayrıca HTTP'nin sabit olduğunu ve Web Uygulamalarında da aynı durumun geçerli olduğu unutulmamalıdır. Bu aynı zamanda bir Web Uygulamasında HTTP'den gelen işlem bilgilerini kullanırken HTTP'nin kullanılmadığı anlamında gelir. Bu birçok kez hata ile sonuçlanır ancak yazımızın konusu bypassing olduğu için analiz kısmına girmeyeceğim.<br>

Sunucu eklentileri, filtreler ve hatta belirli bir uygulama için özelleştirilmiş güvenlik duvarları gibi birçok WAF'la karşı karşıya gelebilirsiniz. Bunları aşağıdaki gibi 3 kategoride ayırt edebileceğimiz farklı güvenlik duvarları vardır. Şöyle 3'e ayırırsak;<br><br>

* - Donanımsal Web güvenlik duvarları,
* - Cloud ve Hybrid Web güvenlik duvarları
* - Entegre Web güvenlik duvarları<br><br>

Kategorimiz 'Cihaz tabanlı güvenlik duvarları', Donanımsaldır. Sunucu yönetiminden sorumlu kişinin fiziksel olarak eklediği donanımsal WAF'larla alakalıdır. Sunucunun web ağını denetlemesi için web altyapısının önüne yerleştirilir. WAF Servisleri için uzak bir sunucuya bağlanma ihtiyacının olmaması büyük bir avantaja sahiplik eder. Hızlı ve güvenilir olmasının yanında her Network ortamı için de uygundur. Sorunları kendiniz birebir çözebilirsiniz. Çoğu zaman bu olumsuz bir durum oluşturabilir, çünkü aciliyet gerektiren bir durumda Network alanında uzman bir personele ihtiyaç duyulacaktır. Bu tür donanımsal waf'lar cihaz tabanlı waf'lar olarak adlandırılmaktadır. Bu WAF sistemleri sunucunuzun sahip olabileceği tüm ağ trafiğini ve protokol gereksinimlerini ele alır. Bu nedenle kurulum zamanının olması herhangi bir durum için ayarlanması gerekir. Aksi takdirde sorunlarla başbaşa kalabilme ihtimali de göz önünde bulundurulmalıdır.<br>

Cihaz tabanlı güvenlik duvarları'ndan fazlasıyla farklı olan bir kategori olan Cloud ve Hybrid güvenlik duvarları ve adından da anlaşılacağı üzere bulut tabanlı firewall'lardır. Çoğu WAF sağlayıcısının serverlarına kurulurlar veya şirketin ve WAF firmasının sunucuları arasında bulunabilirler. Tam olarak bulut tabanlı WAF durumunda son 10 yılda ortak bir tehdit olan servis dışı bırakma (DDoS) saldırılarına karşı ciddi koruma üstlenirler. Bir diğer yandan birden fazla sunucu lokasyonu olan firmalar için dağıtılmış bir çözüm olarak kullanılabilir ve tüm lokasyonlarda fiziksel bir çözüme ihtiyaç duymazlar.<br>

Entegre Web güvenlik duvarları sadece yazılım tabanlı ve çoğu zaman web kodunda değişiklik yapan veya sunucuya oturan entegre kod çözümleri vardır. Anlayacağınız gibi, donanıma ihtiyaç duymayan çözümler onu ucuz, düzeltmesi kolay ve yenilenebilir hale getiriyor. Yine de şirketlerde uzmanlık gerektiren şeylere ihtiyaç olduğu için WAF iyi oluşturulmuş ve kurulmuş ise işleri bir o kadar da kolaylaştırır ki bir uzmana bile gerek kalmadan sorunlarla başa çıkılabilir.<br>

### Web Sunucuları ve WAF Yerleşimi
Web sunucuları temelde bu yazıda bahsettiğimiz web uygulamalarının ve WAF'ların sunucusudur. Client ve Server arasındaki iletişimi HTTP ve FTP gibi çeşitli protokollerle yöneten özel donanım ve yazılımdan oluşur. Web sunucuları çoğu zaman web sayfalarına hizmet verebilmek için kullanılır, ve donanım tarafında web sayfasının yapısı için gerekli dosyaları depolayan ve client'e sunan bir bilgisayara oldukça benzer. Yazılım tarafı, birçok farklı uygulama ile dosya sisteminin iletişimi ve erişim kontrolünü yönetir.

<p align="center">
	<img src="/images/http-connection.png">
</p>

Web sunucusuna bir WAF yerleşimi durumunda web sunucusundaki diğer tüm donanımların önünde duran ayrı bir sistem olduğunu tahmin edebilirsiniz. Tüm trafiğin önüne geçmesi ve WAF tarafından filtrelenmesi gerekir. Böylece herşey ona bağlanır. Bulut tabanlı duvarlarda sistem ve hizmet bizden uzakta olacaktır, ancak trafiğin önce bulut sunucusundan geçtiği, filtrelendiği ve daha sonra web sunucusuna yönlendirdiği bir solüsyondur(çözümdür). Son olarak, dediğimiz gibi web sunucusundaki diğer tüm yazılımların önünde duran, tüm tafiği filtreleyen ve diğer web uygulamalarına izin veren veya engelleyen entegre kodlar vardır.

<p align="center">
	<img src="/images/firewall-work.png" height="245">
</p>

Ayrıca firewall'ların kendi güvenlik politikalarını geliştiriken izleyebileceği olumlu veya olumsuz iki model vardır. Pozitif güvenlik politikalarında WAF iyi hale gelen trafiğin geçmesine izin verir, diğer tüm trafiği engeller. Negatif model ise WAF'ın tüm trafiği geçirmesine izin verir. Çoğu zaman WAF bu modellerin her ikisini de kullanır ancak işler karıştığı için çoğu kez ikisinden biri seçilir.<br>

Güvenlik modellerinin yanı sıra, bir firewall'ın çalışma mod'larına da sahibiz. Bir WAF, istediğimiz kullanıma göre farklı şekillerde çalıştırılabilir. Her birinin olumlu ve olumsuz yönleri vardır. Şirketlerin WAF türü seçerken dikkate alması gereken ciddi bir kısımdır, ki WAF mod'larını hemen açıklayayım.<br>

Reverse Proxy: Yazımızından başında söylediğim gibi. Bir WAF, Reverse Proxy olarak kullanılabilir. Çünkü sunucunun önünde bulunur ve gelen tüm trafiği filtreleme imkanı sunar. Çoğu zaman bu mod da gecikmeler rastlanabilir. Hizmetler aşırı yüklenme gibi bir durumda DDoS olarak algılayabilir. Ancak çalışma mantığı olarak WAF'ın kendi IP adresi vardır. Tüm trafik de bu adresten geçer.<br>

Transparent Proxy: Bu proxy, IP adresine sahip olmaması ile birlikte Reverse Proxy ile aynı koşullara sahiptir. Bunun nedeni ise başka bir güvenlik duvarının arkasında bulunması ve sunucu tarafında herhangi bir network altyapısı değişikliğine ihtiyaç duymamasıdır.<br>

Layer 2 Bridge: Bu mödülde ise, firewall tekrar güvenlik duvarının arkasında durur. Diğerleri ile aynı fonksiyonlara sahiptir. Yüksek performanslı ve sunucuda tarafında değişiklik yapılmayan bir seçenektir.<br>

Network Monitoring: Bu modda ise WAF, web sunucusuna giden tüm trafiği izler ve web dışında olan tüm değerleri filtreler. Aynı bulut tabanlı waf'lar gibi davranan bu mod TCP den gelen istekleri sıfırlar ve istenmeyen trafiğini engeller.<br>

WAF'ların kurulumdan sonra varsayılan olarak gelen bazi filtrelemeli vardır. Elbette birçok kez bunlar değişeceği için varsayılan olarak gelen filtelemeler işlevsiz olur. Bu nedenle sunucuya bir istek gönderildiğinde WAF bunu izin verilenlerin dışında olarak algılar. WAF bunu bu filtreler ile karşılaştırır. Bir istek önceden belirlenmiş filtrelerden biri ise saldırgan olarak algılar ve request engellenir. Ayrıca kurumsal olarak WAF solüsyonlarının çoğunda bu filtreler gizlidir, ve hiç kimse bunlara erişemez veya göremez. Bunun nedeni, geliştiricilerin bu filtreler kullanıcıların bunları bilmeyeceğine ve saldırganların da bilemeyeceğine, dolayısıyla kullanıcıları kolay atlama tekniklerinden koruduğuna inanmalarıdır. Tabii ki, bu kurallar sonraki modüllerde inceleyeceğimiz birçok yoldan atlanabilir. Filtreleri bypasslamak için bazı yaygın yöntemler vardır.<br>

<p align="center">
	<img src="/images/bypassing-codes.jpeg">
</p>

Yukarıda belirtilen bypassing kodları şu anda geçerliliği nadir de olsa hala var olan kodlardır. Bir hedef firewall'ın manuel olarak logunu almanın başka bir yolu, bir WAF'nin uygulayabileceği Head'leri değişikliklerini incelemektir. Yine Netscaler gibi bazı WAF ürünleri, başlığın yeniden yazılmasına izin verir ve ayrıca web sunucusunun yaygın olanlardan farklı HTTP response üretmesini sağlayabilir. Bu, çoğu kez saldırganın veya kullanabileceğimiz otomatik tooların kafasını karıştırabilir. Örnek;<br>

<p align="center">
	<img src="/images/bypassing-codes-2.png"  height="85">
</p>

Örnek olarak önceden belirlediğimiz 'Connect' nnCoection şeklinde dahil edersek WAF'ların algılamaları daha da zorlaşacaktır.<br>

*Ve yazımızı burada sonlandırıyoruz. Serinin 2. yazısında görüşmek dileyiğiyle.*
