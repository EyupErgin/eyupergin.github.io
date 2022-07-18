---
title: 'Web Application Firewall Bypassing - #1'
tags:
- cyber
- security
- web
- application
- firewall
- bypassing
permalink: web-application-firewall-bypass-intro
description: In this article, we will look at Web Application Firewalls Bypassing,
  Basic concepts, and the working logic of Firewalls.
---

<img src="/images/webapplicationfirewallbypass-intro.png">

>In this article, we will look at Web Application Firewalls Bypassing, Basic concepts, and the working logic of Firewalls. [Türkçe versiyonu için tıklayın.](/tr/web-guvenlik-duvarlarini-bypasslamak/)

### Intro
As many of us know, WAFs exist between the site and the user. WAFs receives the request sent by the user to reach the site, analyze it, and send it to the site. The basic building block of this firewall is the HTTP Protocol, which manages the communication between client and server. In this protocol, firewalls inspect requests from HTTP, in other words, they filter them. Otherwise, if it sees an unusual request from the user, it blocks the IP address. These filters protect the site from common attacks in this area such as XSS, and SQL Injection. However, firewalls cannot always prevent these attacks.<br>

You may have heard of firewalls called Reverse Proxy. The reason for this is that firewalls only protect the server-side. It should also be noted that HTTP is fixed and the same is true for Web Applications. This also means that HTTP is not used when using transaction information from HTTP in a Web Application. This results in errors many times, but since the subject of our article is bypassing, I will not go into the analysis part.<br>

You can come across many WAFs such as server plug-ins, filters, and even firewalls customized for a particular application. There are different firewalls that we can distinguish into 3 categories as follows. If we divide it into 3;<br><br>



* - Hardware Web firewalls,
* - Cloud and Hybrid Web firewalls
* - Integrated Web firewalls<br><br>


Our category is 'Hardware-based firewalls', Hardware. It is related to hardware WAFs physically added by the person responsible for server administration. It is placed in front of the web infrastructure for the server to control the web network. The big advantage is that there is no need to connect to a remote server for WAF Services. Besides being fast and reliable, it is also suitable for every Network environment. You can solve problems yourself. Most of the time, this can create a negative situation, because, in an urgent situation, a specialist in the field of Networks will be needed. Such hardware WAFs are called device-based WAFs. These WAF systems handle any network traffic and protocol requirements your server may have. Therefore the setup time must be adjusted for any situation. Otherwise, the possibility of being alone with problems should also be considered.<br>

Cloud and Hybrid firewalls, which is a category that is very different from device-based firewalls, and cloud-based firewalls as the name suggests. They are installed on most WAF providers' servers or can be found between company and WAF company servers. They take on serious protection against denial-of-service (DDoS) attacks, which have been a common threat for the last 10 years, precisely in the case of cloud-based WAF. On the other hand, it can be used as a distributed solution for companies with more than one server location and they do not need a physical solution in all locations.<br>

Integrated Web firewalls are software-based only and often have integrated code solutions that make changes to the web code or sit on the server. As you can see, hardware-free solutions make it cheap, easy to fix, and renewable. However, since companies need things that require expertise, if WAF is well established and established, it makes things so easy that problems can be tackled without the need for an expert.<br><br>

### Web Servers and WAF Layout
Web servers are basically the servers of the web applications and WAFs we are talking about in this article. It consists of special hardware and software that manages the communication between Client and Server with various protocols such as HTTP and FTP. Web servers are often used to serve web pages, and on the hardware side, it is quite similar to a computer that stores the necessary files for the structure of the web page and presents them to the client. The software side manages the communication and access control of the file system with many different applications.

<p align="center">
	<img src="/images/http-connection.png">
</p>

In the case of a WAF deployment on the web server, you can guess that it's a separate system that stands in front of all other hardware on the web server. It needs to get in front of all traffic and be filtered by the WAF. So everything is connected to it. In cloud-based walls, the system and service will be far away from us, but it is a solution where traffic first passes through the cloud server, is filtered, and then forwarded to the web server. Finally, as we said, there is the integrated code that stands in the way of all other software on the web server, filtering all the traffic and allowing or blocking other web applications.<br>

<p align="center">
	<img src="/images/firewall-work.png" height="245">
</p>

In addition, there are two positive or negative models that firewalls can follow while developing their own security policies. With positive security policies, WAF allows traffic that has been fine to pass, blocking all other traffic. The negative model allows the WAF to pass all traffic. Most of the time WAF uses both of these models, but because things get messy, one of the two is often chosen.<br>

Besides the security models, we also have the operating modes of a firewall. A WAF can be run in different ways depending on the usage we want. Each of them has positive and negative aspects. It is a serious part that companies should consider when choosing a WAF type, so let me explain the WAF modes right away.<br>

Reverse Proxy: As I said at the beginning of our article. A WAF can be used as a Reverse Proxy. Because it is located in front of the server and offers the possibility to filter all incoming traffic. Most of the time, delays can be encountered in this mode. Services may detect it as DDoS in case of overload. However, as a working logic, WAF has its own IP address. All traffic also passes through this address.<br>

Transparent Proxy: This proxy has the same conditions as Reverse Proxy, except that it does not have an IP address. The reason for this is that it is behind another firewall and does not need any network infrastructure changes on the server-side.<br>

Layer 2 Bridge: In this module, the firewall stays behind the firewall again. It has the same functions as the others. It is an option with high performance and no changes on the server-side.<br>

Network Monitoring: In this mode, the WAF monitors all traffic to the web server and filters all values outside the web. Acting just like cloud-based WAFs, this mode resets requests from TCP and blocks unwanted traffic.<br>

WAFs have some filtering that comes by default after installation. Of course, since these will change many times, the default filters will be useless. Therefore, when a request is sent to the server, the WAF detects it as outside of the allowed. WAF compares it to these filters. If a request is one of the predetermined filters, it will be detected as offensive and the request will be blocked. Also, in most corporate WAF solutions, these filters are hidden, and no one can access or see them. This is because the developers believe these filters won't be known to users and attackers won't, thus protecting users from easy bypass techniques. Of course, these rules can be bypassed in many ways, which we'll explore in the next modules. There are some common methods for bypassing filters.<br>

<p align="center">
	<img src="/images/bypassing-codes.jpeg">
</p>

The above-mentioned bypassing codes are still in existence, although their validity is rare at the moment. Another way to manually log a target firewall is to examine the Heads changes a WAF can apply. Again, some WAF products, such as Netscaler, allow header rewriting and can also make the web server generate different HTTP responses than common ones. This can often confuse the attacker or any automated tool we can use. Sample;<br>

<p align="center">
	<img src="/images/bypassing-codes-2.png"  height="85">
</p>

As an example, if we include the 'Connect' as nnCoection that we have determined before, it will be more difficult for WAFs to detect. <br>

*We have come to the end of our article for today. See you with Part 2!*
