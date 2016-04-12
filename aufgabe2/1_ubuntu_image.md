# Zugriff auf ubuntu Image

VPN Zugriff einrichten:

* OpenVpn
  * Installtion von openvpn
    * Arch Linux: `sudo pacman -S openvpn`
    * Debian like: `sudo apt-get install openvpn`
  * Download die openvpn config
    * visit https://141.22.34.16
    * Download `config`
  * Editiere die openvpn config, fuer deine nutzung:
    * Zeile 7: `remote 141.22.34.16 443 tcp`
  * Connect to docker vpn:
    * sudo openvpn --config your.config
* Generiere ssh keys unter linux:
  * ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  * unter ~/.ssh sind nun zwei keys zu finden. dein privater schluessel und ein oeffentlicher.
    * private: ~/.ssh/id_rsa
    * public: ~/.ssh/id_rsa.pub
* Image Creation
