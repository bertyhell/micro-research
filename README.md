# micro-research

Website where users can answer tiny questionaires to identify possible related topics.

For instance one research project could be:
* Do liberals use Android or iPhones more often than conservatives

## Deploy to android:

### One time setup

* Install apps on the android device:
    * Termux
    * WiFi FTP Server
* Open termux and install postgresql
  * [./README-INSTALL-POSTGRES.md](./README-INSTALL-POSTGRES.md)
  * exit the postgres prompt: `\q`

### Update existing code with new version

* build the server code on your desktop/laptop
  * `cd server`
  * `npm install`
  * `npm run build`
* build the client code on your desktop/laptop
  * `cd ../client`
  * `npm install`
  * `npm run build`
* Start WiFi FTP Server on the device and make the root folder of the android device the root of the ftp server (settings in the app)
* Copy the client/dist and server/dist folders to `/storage/emulated/0/Android/data/com.termux/files` using an ftp program. eg: cyberduck
* in termux copy the client and server folders to the termux executable directory using the command:
  * `cp -r /storage/emulated/0/Android/data/com.termux/files/* $HOME/micro-research`
* install the node modules for the server
  * `cd $HOME/micro-research/server/dist`
  * `npm install`
* run any migrations for the database
  * `npm run typeorm:run-migrations`



### After reboot android device

* load aliases: `source ~/.bash_aliases`
* start the postgres service: `pgstart`. You should see: server started
* navigate to the nest js service: `cd $HOME/micro-research/server/dist`
* start the application server: `npm run start:prod`
