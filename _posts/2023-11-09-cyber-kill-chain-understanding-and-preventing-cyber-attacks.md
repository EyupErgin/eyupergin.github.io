---
title: 'Cyber ​​Kill Chain: Understanding and Preventing Cyber ​​Attacks'
permalink: 'cyber-kill-chain-understanding-and-preventing-cyber-attacks'
image: 'images/chain/og.png'
tags:
- cyber
- chain
- attack
- cyber-kill-chain
- security
- operations
- malware

---
<p align="center">
	<img src="/images/chain/head.png">
</p>
# Introduction
Cyber security has become a need of the whole world today. Especially with the increase in the use of computers and the widespread use of technology, there is a computer in every home and even in every individual today. 

Cyber security has become much more important in today's world, especially as a result of the increasing damages suffered by states, institutions and organisations as a result of cyber attacks and the awareness of these damages. In addition, the fact that cyber security now contributes to the national defence strategies of states has enabled cyber security companies to reach a much more specific and important position for both parties by working with experts in the field.

However, we will not discuss countries and cyber security strategies in our article today. Today, we will take a detailed look at the cyber death chain, called the "Cyber Kill Chain", and then we will discuss how we can apply this model in a detailed and scripted way to detect and avoid cyber attacks.

So, let's start with the history and emergence of the Cyber Kill Chain.

## History of the Cyber Kill Chain

The Cyber Kill Chain, which we call Cyber Kill Chain, was originally developed in 2011 by Lockheed Martin, a US-based military defence industry company. It is a known fact that the military units of the states used similar models before this model was developed on cyber security. When we examine the Cyber Kill Chain, it is also a model that can be used for military activities.

## Use of Cyber Kill Chain in Military Activities

When we take a look at the military history of this model, the same structure meets us. One of the most important differences here is of course that it is used for different purposes sectorally so as not to disrupt the structure, and another difference is that in the case of military use of this model, it is used as attack planning, and in the case of cyber security use, it is used on the analysis of an attack that we are exposed or observed.

<img src="/images/chain/chain.png">

As an example of its use for military purposes, there is a graphic of Cyber Kill Chain above.

If we continue with the graph, the first thing a military unit should do is Recon. Then Weaponisation, then Delivery, then Exploitation, then Installation, then Command and Control and finally Actions on Objectives.

In other words, firstly, research should be done on the target to be attacked, then the target should be armed according to the target, then the attack unit should be sent to the target, then the area where the target to be attacked is located should be infiltrated, then the activity should be carried out on the target and the situation information should be transmitted to the command and control unit. Such an imaginary scenario can of course be adapted from specific military operations to the smallest operation. However, in practice today, the definitions of Cyber Kill Chain after Recon and Weaponisation are insufficient in military terms. At this stage, the military units' own operation planning and execution stages come into play. 

However, since the main purpose of this model, and even the main purpose of this blog post, is to use it on cyber security, let's go back to our main focus, cyber security.

## Use of Cyber Kill Chain in Cyber Security

As I mentioned before, this model is a model adapted from military use for cyber security. The reason why this model is so similar to military activities is the development of attacks by threat actors and APTs today. 

We can use this model in two different ways to improve our defence strategies. The first one is to understand the attackers and build our defence mechanism according to this model. Secondly, by understanding the attackers and taking into account the fact that the attackers attack us according to this model, we can use this model efficiently by paying particular attention to Recon, Weaponisation, Delivery and Exploitation and eliminating our deficiencies in these areas. 

So why do we only pay special attention to the first four areas? The real answer to this question is to recognise the attack phases. Below are detailed explanations on the attack phases. Then we will return to this section again. Of course, after we learn how we can improve our defence mechanisms by using the model.

## Working Principle of Cyber Kill Chain
<img src="/images/chain/chain.png">

Cyber Kill Chain consists of seven steps in structure. These stages appear in the diagram above, but are as follows respectively.

#### Cyber Kill Chain Stage Sequence:

1. Recon,
2. Weaponisation,
3. Delivery,
4. Explotation,
5. Installation,
6. Command and Control,
7. Actions on Objectives.

Now let's understand these steps in detail.

### 1. Recon:

This stage, which is the first stage of the Cyber Kill Chain; In essence, from the attacker's point of view, it adopts an attacker to investigate the target before infiltrating the target. In summary, it is to collect information. At this stage, the information gathering process is carried out by active or passive information gathering methods.

At this stage, it is very important for the attacker to identify the target's digital assets, information about its employees, technologies or security systems used to recognise the target. As we mentioned, we have two different information collection methods. Active and Passive. So let's go into detail.

At this stage, the passive information gathering method includes research conducted without interacting with the target. The active information gathering method is to collect information on the digital assets owned by the target and the assets through various scans of these assets. For example, as we have just mentioned, the stage of detecting the technologies used on digital assets is an example of active information gathering. With the simplest example, the sources where attackers can collect passive information are as follows:
search engines, social media accounts, information gathering tools on digital assets such as shodan, censys are examples of passive information gathering. Of course, in addition to these, many different examples can be given on active information collection according to the capacity of the attacker, but some of the common tools used today are: recon tools, nmap, vulnerability scanners, etc. tools that can also take part in active information collection and can be cited as examples.

### 2. Weaponisation:

This stage is the second stage of the Cyber Kill Chain. At this stage, attackers collect the information obtained from the Recon stage and proceed to the Weaponisation stage after conducting various analysis processes. The most common situation here is the use of the outputs obtained by active information gathering methods. For example, determining methods and techniques for exploiting vulnerabilities can be given as an example. What this stage mainly wants to convey to us is that this stage is a preliminary preparation stage. Or we can say the last preparations before the attack.

At this stage, the richer the data obtained from the Recon section, the attackers can carry out much more comprehensive operations against the target. 

Therefore, it is precisely in this section that the Cyber Kill Chain is divided into different areas. For example, in the light of the information obtained during the Recon phase, a Denial of Service attack may be deemed appropriate, while conducting a malware activity may also come to the fore. Since the action to be taken by the attacker in this armament phase is shaped according to the data from the Recon phase, the attacker will take action accordingly.

### 3. Delivery:

At this stage, which is the third stage of the Cyber Kill Chain, the attackers actually start the attack against the target at this stage through the data they first obtained as a result of the Recon and Weaponisation stages and the attack method they prepared according to the data obtained. If we continue through a malware operation, at this stage, the malware is transmitted to the victims through various methods. For example, the malware created by the attacker is sent to the user via an attachment via e-mail.

Of course, at this stage, various phishing methods come to the fore as a continuation of the Weaponisation phase. As a result, the attacker must transmit the file to the victim. The activity carried out by the attacker at this stage is called Phishing in the literature.

### 4. Explotation:

This stage is the fourth stage of the Cyber Kill Chain. At this stage, it is aimed to successfully run the malware in the next stages by exploiting the previously detected vulnerabilities on the target in line with the attack method and techniques used by the attacker.

### 5. Installation:

In this stage, which is the fifth stage of the Cyber Kill Chain, the malware is installed on the target system if the previous Delivery and Explotation stages of the attackers have passed successfully. Since the confidentiality of this attack carried out by the attacker during the installation phase is important here, various concealment methods are used by the attacker to prevent both the malware from being detected and the techniques used.

Already after this stage, the victim has been exposed to the attack and the attacker has partially achieved what he wants. At this stage, the malware can carry out various activities to maintain its persistence on the system by carrying out various authorisation changes, installing various services and creating new users.

### 6. Command and Control:

In this phase, the victim is exposed to the attack and the attacker has achieved what he wants. In summary, the system is completely in the hands of the attacker. At this stage, the attacker establishes a connection through a command and control network in order to stay in contact with the victim's computer and the system becomes open to all kinds of access.

### 7. Actions on Objectives:

In the last stage, Actions on Objectives, the attacker can steal, edit and delete the data he wants on the targeted system. All of these activities are based on the data the attacker wants to obtain on the target system or the purpose of the attack. 

As can be seen, our Cyber Kill Chain model, which consists of seven stages and shows how an attacker acts in it, consists of such a structure. But of course, our blog post is not finished here. We continue without slowing down.

<br>
<hr style="background: #edf2f7"><br>
## How Can We Build Our Own Defence Mechanism Using Cyber Kill Chain?

As I mentioned in our blog post "**Use of Cyber Kill Chain in Cyber Security**", while this model shows us the attack steps used by attackers, it can also help us learn from which points we can be attacked by putting ourselves in the place of the attacker and even at which stages we are weak. 

As a result, if we are in the role of the attacker, we can obtain the defence mechanism of our own digital assets from a different perspective through this model. I would like to remind you of the four stages I have drawn your attention to here. 

<br>
1. Recon,
2. Weaponisation,
3. Delivery,
4. Explotation.

So why these 4 stages are critically important for us. When we want to build a defence mechanism, for example, the fact that the earlier we can prevent a malware attack, the more effective defence mechanism we have, is directly proportional to the defence mechanism we will strengthen.

In this case, a logical road map can be drawn as follows.

<br>

1. The outputs that can be obtained through recon of digital assets, social media account information, personal information, e-mails, passwords, etc. should be evaluated,
2. Based on the data obtained in the first stage, a scenario-based imaginary attack should be created over the point where the weakness is determined,
3. Then a fake phishing or external phishing attack should be organised,
4. If these three steps have been successful, it should be checked whether the transmitted file or malware has been downloaded.<br>

<br>

If these four stages have been successfully applied and the malware has been downloaded to the system, you should evaluate and strengthen your defence mechanism from the beginning.


At this stage, Red Team Operations and Attack Simulations are actively applied in the cyber security sector. The purpose of this blog is to interpret from the perspective of neither a red teamer nor a soc analyst. After all, it is not possible for the cyber security sector to rediscover America. My main goal was to look through the eyes of a CTI Analyst and show how the events work conceptually and logically, and to show at what stage we are involved in the events.

I hope it was an enjoyable article. Thank you for reading this far. Hope to see you in my next blog post...
