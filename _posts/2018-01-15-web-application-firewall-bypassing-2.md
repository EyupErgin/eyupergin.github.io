---
title: 'Web Application Firewall Bypassing - #2'
description: Hello everyone, in this article, I briefly touched on WAF Bypassing using
  automation tools such as Wafw00f, Nmap, etc. I also showed Positive and Negative
  security models and how to overcome an example filtering vulnerability. Good reading.
permalink: web-application-firewall-bypassing-2
tags:
- cyber
- security
- web
- application
- firewall
- bypassing
---

<img src="/images/1_Yw-kj1AZ7ksAeF8Pg8tG1A.png">
> Hello everyone, in this article, I briefly touched on WAF Bypassing using automation tools such as Wafw00f, Nmap, etc. I also showed Positive and Negative security models and how to overcome an example filtering vulnerability. Good reading. [Türkçe versiyonu için tıklayınız.](/tr/web-guvenlik-duvarlarini-bypasslamak-2/)


### Intro
Hello again! After a short break, we continue the series. Before moving on to the 2nd part of the WAF Bypassing series with you today, let's give a brief summary of the 1st part. In my previous article, we examined Firewall types, and their modularity with their good and bad sides. Then we moved on to the server placements. And finally, we touched on Proxies. In this article, I will talk about the WAF Fingerprint process, and active and passive information collection using wafw00f and Nmap scripts. Good reading. <br>

So, let's start with firewall detection on the website. I will use the automation tool Wafw00f for this.<br>
### Wafw00f:
First of all, I assume that the tool is installed on the computer you use for this process. If not, you can install it with a few simple steps. I'll skip the installation part. First of all, the code we need to enter on the terminal screen is only and only the following code.

```
wafw00f target.com
```
After writing and running the code, you will get an output like the image below. The output given to you here is simple and concise. It tells us that the WAF used on the target site is "Cloudflare (Cloudflare Inc.)".

<p align="center">
	<img src="/images/woof.png">
</p>

As you can see, Wafw00f successfully detected the firewall used on the target site. Now let's scan the same target site on Nmap Waf-Fingerprint.<br>
### Nmap:
What is Nmap? What is not? We will proceed with the process in a short way without getting stuck with such questions. For this process, we will act in the same way assuming that Nmap is installed on your computer. We open our terminal and use the following codes.
```
nmap --script http-waf-detect target.com
```

The code we have written here will try all ports without limiting the ports, but if you want to do a restricted port scan on the target site, the code you should use is as follows:

```
nmap -p80 --script http-waf-detect target.com
```

Or if there are several ports you want on the site, it will be useful to use the following code.

```
nmap -p80,443 --script http-waf-detect target.com
```

After writing our code, it remains to see the next result. Our result is as follows:

<p align="center">
	<img src="/images/woof2.png">
</p>

When we examined the result that Nmap gave us here, Nmap could not output the WAF type used, even though I ran tests on the same target. However, Wafw00f successfully transmitted it. If Nmap could give us the correct result, the output we would get would be like this.

```
PORT   STATE SERVICE
80/tcp open  http
|_http-waf-detect: IDS/IPS/WAF detected
```

It would be best to give the sample output in case of such a failure.<br>

Well, we have detected the WAF type. What shall we do now?<br>

From now on, we will write all the bypass codes we will write accordingly. Let's go a little deeper then. The bypassing codes we wrote are as important as detecting the WAF type. Because we have to act according to the type of Firewall so that WAFs define us as a normal input value in our codes. In this case, we should divide the Firewalls into 2. <br><br>

* Positive Security Model
* Negative Security Model

<br><br>
Both of these security models act according to the filters specified for Web services on WAFs. For example, below is a comparison of the Positive and Negative models.

<p align="center">
	<img src="/images/pstvngtv.png">
</p>

Now that we have seen the good and bad sides, let's see an Integrated WAF code and its bypass code. An example would always be good, at least in this regard.<br><br>

<p align="center">
	<img src="/images/1607935977310.png">
</p>

As you can see here, there is a filter. And what we need to do to bypass this filter is to make the input that we send for the input perceived as a normal value that the filter cannot detect. This way we will have access. The code is as follows:

```
‘/(?:(.{2,})\1{32,})|(?:[+=|\-@\s]{128,})/’, Path Parameters Exploitation /myapp/admin.php / xyz? userid = 1PAYLOAD /myapp;/admin.php?userid=1PAYLOAD
```

To explain briefly and simply, an application is running on the server and this application is monitoring the logins with the firewall. A simple admin panel can be given as an example. We created a payload by exploiting the vulnerability of filtering, and when we give this payload as an input value, we will pass the firewall.

Here we briefly exploited a code vulnerability and bypassed the firewall. Now is the time to take it even further and try different methods. However, we will be discussing this in part 3. Hope to see you in my next post.<br>
