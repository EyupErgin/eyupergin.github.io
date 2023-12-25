---
title: OSI Reference Model and OSI Layer
permalink: basic-network-what-is-osi-reference-model-and-osi-layers
tags:
- cyber
- security
- network
- osi
- reference
- model
- layers
image:
  path: https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/Basic%20Network%20%20OSI%20Reference%20Model%20and%20OSI%20Layers.png
  height: 630
  width: 1200
---

---

![HEAD](https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/Basic%20Network%20OSI%20Reference%20Model%20and%20OSI%20Layers.png)

Hello everyone with a new blog post! Today I am here with the second post of our blog series called Network Basics. Have a good read.

## Summary

In the last blog post, I shared with you the basic network concepts, What is Network? What are Network Protocols? I ended the blog post by examining Network Topology and five sample topology models. In today's post, I will share with you What is the OSI Reference Model? What are the Network Layers? I will touch on many topics under the main headings, so let's continue. 

## What is the OSI Reference Model?

With the introduction of the network concept into our lives and the establishment of communication between devices, many technology companies have started to develop network protocols. However, each manufacturer has developed devices and protocols based on its own product and its own protocol. However, problems such as protocol incompatibility between different brands of devices that serve the same purpose have entered our lives as a problem brought about by the development of hardware and software based on their own products. 

In order to solve such problems between their own products, developers developed an architecture created by IBM in 1974 and named IBM SNA (System Network Architecture), which is like the OSI Reference Model but not exactly the same. In the same years, Digital also developed an architecture called Digital Equipment Corporation Network, which they called DECNET. 

However, the problem of protocol incompatibility of different brand devices with other different brand devices in the demand part of the consumer side and the search for a solution to this by both consumers and manufacturers laid the foundation of the OSI Reference Model. 

In 1983, the International Standards Organization adopted OSI, also known as Open System Interconnection, and announced it to the world as a standard. 

After a brief look at the history of the OSI Reference Model, let's get to know the layers.

<img style="text-align:center" src="https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/what-is-osi-referance-model.png">

## What are the OSI Layers?

The first thing we need to know about OSI is how many layers the OSI Reference Model consists of and which layer performs which functions. The OSI Reference model consists of 7 layers. I will touch on this part in a moment, but briefly, a data coming to the device first passes through 7 layers, this is called Encapsulation. With another example, when the data leaves our device, it follows the path we call encapsulation and is sent through the OSI layers in the opposite direction of arrival. You may be confused but stay calm. I will explain all layers in detail. 

#### Layer 1 - Physical Layer:

When you look at the Physical layer in the OSI Reference model, it can also be described as the layer that defines how the data will be transmitted. In our previous blog post, I listed 3 separate items on how data can be transmitted. Let's quickly remember,

- Ethernet,
- Fiber Cable,
- Wireless

Data is transmitted between devices in these 3 different ways. Data is carried between the layers in Binary as 1 and 0. 

### Layer 2 - Data Link Layer:

In the OSI Reference model, the data link layer has a more complex structure than the previous topic, the physical layer. In this layer, the data transmitted from the network layer is fragmented and error control bytes are added between them to form a Frame and transmitted to the destination address. The Frame allows the Data Link layer to receive the packets that it sends and receives between itself as a bulk packet, just as each layer has its own unique packet. When we look at the Frame types in this layer,

- 802.2 Ethernet,
- 802.3 Ethernet,
- 802.4 Token Bus,
- 802.5 Token Ring.

If we need to give examples among these, the Ring and Bus topologies in the title of network topologies that we examined in our previous blog post come to mind. There is no need to go into detail because they are not topologies and frames that are widely used today. 

The most commonly used frame type in Layer 2 today is the frame called 802.3 Ethernet. So what does this frame offer us? Let's analyze it.

<img style="text-align:center" src="https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/data-link-layer.png">

### 802.3 Ethernet Frame:

As you can see in the picture above, the structure of a frame sent from L2 is shown. Ethernet 2 frame has a common structure that works on Layer 1 and Layer 2. If we look at this frame specifically, the parts that work on Layer 1 are as follows,

- Preamble,
- (SFD) Start Frame Delimiter,
- (CRC) Frame Check Sequence
<br><br>
These parts in the frame are the parts that are related to Layer 1. Let's summarize these sections briefly.

- Preamble: It is the beginning part of the frame. It occupies 7 bytes of space.
- SFD: This is the constraint of the start section. It occupies 1 byte.
- CRC: This is the space between the frame and another frame. It occupies 12 bytes.
<br><br>

Well, if we talk about the tasks of the layers in Layer 2 that carry the data;

- Destination MAC Address: It is the part that contains the destination MAC address. It occupies 6 bytes of space.
- Source MAC Address: It is the part that contains the source MAC address. It occupies 6 bytes.
- Ether Type: This part specifies which protocol the next packet section, the payload, belongs to. It occupies 2 bytes.
<br><br>

Finally, let me explain the part that carries the data in the frame, which we call payload. 

- Data or Payload: The data in this section contains the data belonging to the protocol to which the data in the Ether Type I mentioned in the previous section belongs. For example IP, ARP etc. This field can contain data between 46 and 1500 bytes.
<br><br>
Since we have covered 802.3 Ethernet in detail, let's continue our topic from Layer 2. 

A very large part of the Data Link layer runs on the network card in the device. There are also 2 sub-layers of Layer 2. 

- MAC (Media Accsess Control),
- LLC (Logical Link Control).

In these two sub-layers, they work with the Data Link layer, which is the upper layer. As additional information, there is a hardware device called Switch as an example of the hardware working at this layer. This device ensures that the data is transmitted to the correct destination by matching the connected devices according to their MAC addresses.

## Layer 3 - Network Layer:

Another layer after Layer 2 is Layer 3 Network Layer. In this layer, the packets that we characterized as Frame in the previous title are transformed into network packets at Layer 3 by adding L3 Header. This layer is responsible for sending data packets to another network. While this is being done, addressing and routing operations also take place at the network layer.<br><br>
<img style="text-align:center" src="https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/network-layer.png">

### Addressing:

The network layer inherently operates an addressing mechanism between the source computer and the destination computer. According to this addressing mechanism, each device must have a unique address to ensure that each data packet is sent to the correct destination. These addresses must be unique. In short, this addressing mechanism is called the IP mechanism. 

The protocols used and supported at this layer are as follows,

- IP (Internet Protocol, IPv4 and IPv6),
- IPX (Internetwork Packet Exchange),
- ARP (Address Resolution Protocol),
- ICMP (Internet Control Message Protocol).

### Routing:

Routers called R1, R2 and R3, shown in the diagram, are used to send data to a different device in the same network. Routers read the data in the L3 data packet to determine which destination device the data should go to and direct it to the destination. 

The protocols used and supported at this layer are as follows,

- RIP (Routing Information Protocol),
- EIGRP (Enchanged Interior Gateway Routing Protocol),
- OSPF (Open Short Path First),
- BGP (Border Gateway Protocol).

## Layer 4 - Transport Layer:

The transport layer is the 4th and one of the most important layers of the OSI Reference Model, in fact it is the heart of the OSI Reference Model. The task of this layer is, if it receives data from an upper layer, it divides the data into parts and transmits it to the lower layer. If it receives data from a lower layer, it combines the data and transmits it to the upper layer.<br><br>
<img style="text-align:center" src="https://raw.githubusercontent.com/EyupErgin/eyupergin.github.io/main/images/transport-layer.png">
<br><br>
It receives data from the lower layer as a packet and transmits it to the upper layer as a segment. It receives data from the upper layer as a segment and transmits it as data to the lower layer.

## Layer 5 - Session Layer

Session Layer, the 5th layer of the OSI Reference Model, manages the establishment, management and termination of connections between applications. The dialog in the data flow between two applications is provided at this layer. Session Layer provides the following:

- Setup,
- Management,
- Termination

Since the dialog between two applications in this layer also includes communications with different devices, its most important feature is that it transmits the dialog between the client and the server without mixing it with communications with other devices.

Session Layer contains 4 different protocols. These protocols are as follows:

- NetBIOS
- RPC
- SIP
- SDP

So let's take a quick look at these 4 protocols.

#### What is NetBIOS?

NetBIOS is an API used for devices in the network to communicate with each other. NetBIOS allows separate computers to establish a connection over the local network. It serves on the Session Layer, one of the layers that provide the OSI Reference Model.

### What is RPC?

RPC enables communication between a client and a server on a network, within a computer, between a client and a server.

#### What is SIP?

SIP is a protocol used to initiate, maintain and terminate synchronous sessions involving messaging applications for audio, video, pictures, etc. within a network.

#### What is SDP?

SDP is a protocol that allows the media to be transmitted to the client or server without losing ports in connections containing media based on audio or video transmission over IP in the network.

## Layer 6 - Presentation Layer

This layer is layer 6 in the OSI reference model. This layer has the task of translating data into formats that computers or devices can process. Some of the data protocols transmitted on the layer are:

- GIF,
- JPEG,
- TIFF,
- ASCII,
- MPEG.

This layer performs basic operations such as encryption, decryption and compression of data.

## Layer 7 - Application Layer

This layer is the last layer of the OSI Reference Model. The main feature of this layer is that it does not provide any services to the layers below it. Some protocols running at this layer are:

- SSH,
- FTP,
- HTTP,
- DNS,
- SMTP.

For example, protocols such as SSH, which are necessary for secure web access, are on this layer. Services that host tasks such as forwarding emails etc. are also on this layer.
