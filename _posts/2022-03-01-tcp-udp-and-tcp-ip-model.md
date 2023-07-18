---
title: TCP, UDP Protocols and TCP/IP Model
tags:
- cyber
- security
- network
- protocols
- tcp
- udp
permalink: tcp-udp-and-tcp-ip-model
---

---

Hello everyone with a new blog post! I am here with the 3rd blog post of the network basics series. Have a good read in advance.

## Summary

In the last blog post, we have covered in detail what the OSI Reference Model is and which applications and protocols work at which layers. In this blog post, we will first cover TCP and UDP and then the TCP/IP Model. Finally, under the title Encapsulation, we will give a detailed meaning to the transmission of data.

## What is TCP Protocol?

TCP is a data transfer protocol known as Transmission Control Protocol. Its main purpose is to divide the data it receives from the Application layer into smaller segments for transmission over the network.

### What are the Features of the TCP Protocol?

The TCP Protocol has basically 4 characteristics. These are the following

- It is a secure protocol,
- Data integrity is a priority,
- Flow control is ensured,
- It is a connection-based protocol,
- It uses the Three Way Handshake method.

So if we examine the features of the TCP Protocol.

TCP is a completely duplex and secure protocol. It has a structure that checks whether the sent data has reached its destination and whether it has been transmitted.

Due to the structure of the TCP Protocol, the transmitter waits for confirmation from the receiver that it has received the segments it has sent. If confirmation is received from the receiver, the continuation segments are transmitted. Thus, it provides a secure data flow by checking the integrity of the data and whether it is transmitted to the other party.

Each data sent over TCP has a sequence number. Taking into account the disruptions that may occur on the network due to the provision of the control mechanism in the segments going from the transmitter to the receiver, the integrity of the data is ensured by transmitting the segments that cannot be transmitted when the sequence-based transmission is completed in the data process.

## What is UDP Protocol?

UDP is known as User Datagram Protocol. It has fundamental differences compared to TCP. However, both protocols are used today as data transfer protocols. So what are the features of the UDP Protocol? Let's examine it quickly.

### What are the Characteristics of the UDP Protocol?

If we give a list again in the same way as in the TCP Protocol, UDP:

- Not secure.
- Flow control is not provided.
- It is a connectionless protocol.

This protocol, like TCP, is a protocol for data transfer by dividing the data coming from the upper layers. In UDP, the divided data is called a datagram, not like TCP. Datagrams are less in size than segments. It is faster than TCP due to its lower bandwidth.

UDP is not secure. UDP controls the data, just like TCP, but it does not control whether the data reaches the receiver like TCP does. There is no control mechanism in UDP. UDP also does not provide flow control. Therefore, it can transfer data without the need to establish a connection.

### What are the Differences Between TCP and UDP?

Although both are designed for different purposes, they have some fundamental differences. Here are some key features to explain the differences between TCP and UDP:

**1. Connection management:**
- TCP starts with a connection establishment phase before data transmission.
- UDP allows data to be sent directly without connection establishment.
<br>

**2. Reliability:**
- TCP prioritizes reliability in data transmission.
- UDP provides fast and direct data transfer, but with a low level of reliability.
<br>

**3. Data integrity:**
- TCP uses checksums to ensure data integrity.
- UDP has no checksum to check data integrity.
<br>

**4. Data flow control:**
- TCP manages the flow of data and performs flow control to avoid congestion.
- UDP does not control data flow.
<br>

**5. Disconnection:**
- TCP ensures that both parties are notified before disconnecting and that the connection is terminated correctly.
- UDP uses no special protocol for disconnection, it just abruptly ends the connection.
<br>

**6. Uses**:
- TCP is preferred for applications that require reliable data transfer. For example, downloading web pages, sending e-mail and transferring files.
- UDP is preferred for applications that require fast data transfer. For example, games, broadcasts, video and audio streaming.
<br>
<br>
> After a quick review of the TCP and UDP Protocols, let's move on to our next topic, the TCP/IP Protocol.

## What is the TCP/IP Protocol?

When we look at the history of this model, this model was created by the US Department of Defense in the 1980s and continues to be developed. The TCP/IP Protocol has similar headings as the OSI Reference model. However, it has fewer layers and most layers look like a combination of the OSI Reference model.

![image (17).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37d47426-26a9-4f84-ab82-a0a5d99b054e/image_(17).png)

As can be seen above, there are 4 layers in the TCP/IP Model. These layers are:

- Application Layer,
- Transport Layer,
- Internet Layer,
- Network Layer.

There are 4 layers.

The TCP/IP Model is a two-layer communication protocol. It ensures that the data in the upper layers are separated into packets before transmission and the data are reassembled at the receiver. The lower layers control the routing of the transmitted packets to the desired network address. In the TCP/IP Model, a new protocol can be easily inserted between layers. In the same way, an unused layer can be easily removed.

After the basics, it is time to examine the transmission of data under OSI, TCP/IP and Encapsulation. So let's take a quick look.

## Transmission of Data over the OSI Model

If we examine how data generated by users is transmitted in the protocols on the OSI and TCP/IP Model, we basically need to go into the reasons for the emergence of protocols.

The main reason for the creation of these protocols is that these structures were derived so that the products produced by different manufacturers could work fully integrated by the users.

As a result of the studies, the OSI and TCP/IP Models, which are widely used today, have emerged.

When these models were derived, models based on layers and protocols emerged. By creating transition data between layers, it is also prevented that an improvement that can be created on the layers will affect other layers. So let's quickly move on to OSI.

### Data Transmission in the OSI Model:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6345863-3448-4fa6-8f02-b1b60fdbfaa7/Untitled.png)

On the OSI Model, as the data moves between layers, certain information is transmitted to a lower or upper layer. The process that occurs in the data transmitted from the lower layer to the upper layer is called Encapsulation.

In the OSI Model, if a data is not transmitted from lower layers to upper layers, but from upper layer to lower layer, this process is called De-encapsulation. Thus, we have finished the data integration and fragmentation in the OSI Model in this blog post.

Hope to see you in the next blog post.
