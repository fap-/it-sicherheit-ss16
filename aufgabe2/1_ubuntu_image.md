# Erzeugung und Zugriff auf ubuntu Image

## 2a - Zugang zum Image

### OpenVpn
  * Installtion von openvpn
    * Arch Linux: `sudo pacman -S openvpn`
    * Debian like: `sudo apt-get install openvpn`
  * Download die openvpn config
    * visit https://141.22.34.16
    * Download `config`
  * Editiere die openvpn config, fuer deine nutzung:
    * Zeile 7: `remote 141.22.34.16 443 tcp`
  * Verbinde auf das vpn:
    * sudo openvpn --config your.config
    * In zukunft muss nur noch dieser schritt vorgenommen werden, damit man auf das vpn kommt.
    * Ausserdem muss darauf geachtet werden, dass solange die anwendung laeuft, du im VPN bist. Also nicht schliessen!

### Generiere ssh keys unter linux:
  * `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
  * unter ~/.ssh sind nun zwei keys zu finden. dein privater schluessel und ein oeffentlicher.
    * private: `~/.ssh/id_rsa`
    * public: `~/.ssh/id_rsa.pub`
* Image Creation
  * Gehe https://owncloud.informatik.haw-hamburg.de/ und melde dich an.
  * Folgende Schritte sind erforderlich, falls diese noch niemals vorgenommen wurden:
    * Erstelle einen ordner namens: `VSP_<Deine A-Kennung>`
    * Gebe diesen Ordner `VS Docker Robot` frei.
  * Gehe auf https://141.22.34.16; halte die owncloud offen.
  * Klicke unten auf `ssh` oder `ubuntu_ssh`
  * Gehe wieder zur Owncloud.
    * Navigiere zu `VSP_<AKennung>/ubuntu_ssh/container/`
    * Kopiere die generierten, publiken sshkeys in `authorized_keys`.
    * Achte hierbei darauf, dass du nur den `*.pub` hineinkopierst. Da der andere ja privat sein soll :)
    * Es koennen mehrere public keys, von mehreren personen aufgenommen werden. Ein public key pro newline.
  * Gehe nun wieder auf https://141.22.34.16 und klicke bei `buildables` auf `build`.
  * Dein docker container ist nun gestartet worden und du kannst dich per ssh einwaehlen.

### SSH
  * Es muessen die `Image Creation` und die `OpenVpn` abgeschlossen sein.
  * Unter https://141.22.34.16 kannst du die IP des docker containers herausfinden.
  * Du verbindest dich auf den container per `ssh root@<ip-des-containers>`.
  * Viel Spass :)

Fortsetzung unter [2_apache.md](2_apache.md)
