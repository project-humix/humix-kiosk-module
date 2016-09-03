# Humix Kiosk Module

This is a humix module that shows dynamic content on a LCD on robot.  The content is delivered from humix-think to the web page via:
> Humix-Think -- websocket --> Humix-Sense -- nats --> Humix-Kiosk-Module -- socket.io --> Kiosk Web Page

Currently support showing

* text
* image ( url )
* youtube ( TBC )
* icon ( images that stores in icon dir )
* clock

# How to use this module 

First, clone this module into appropriate location
```
git clone https://github.com/project-humix/humix-kiosk-module.git
```

Then setup this module
```
cd humix-kiosk-module
npm install 
npm start
```

Now you can use `Sense Command` node on humix-think to control the content of this module. 

* Note: The code is optimized for raspberrypi 3.5" TFT. If you use different size of display, remember to adjust the code appropriately (particularly index.html);
 

