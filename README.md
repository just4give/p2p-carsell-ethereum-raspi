# p2p-carsell-ethereum-raspi
Angular Web application using Ethereum smart contract with Raspberry Pi and AWS

![alt tag](https://user-images.githubusercontent.com/9275193/38164409-438fe77c-34d2-11e8-9123-2be73aa08700.png)

### Prerequisites 

- Docker version 17.06.1-ce or higher 
- Local Tunnel (https://github.com/localtunnel/localtunnel) 

##Setup project on your computer

```
$ git clone https://github.com/just4give/p2p-carsell-ethereum-raspi.git && cd p2p-carsell-ethereum-raspi
$ docker-compose up

```
Once your docker compose up and running browse to below two urls to make sure you web applications and testrpc are running.

- http://localhost:4200 ( P2P Car Sell Web App)
- http://localhost:8000 ( Blockchain Explorer) 

Open a separate terminal window and start local tunnel 
```
lt --port 8545
```
![alt tag](https://user-images.githubusercontent.com/9275193/38164396-d0a7a9c0-34d1-11e8-9af7-cc2b73f91c15.png)

Note the local tunnerl url which you need to start Raspberry Pi program ( https://github.com/just4give/p2p-carsell-raspi.git)
