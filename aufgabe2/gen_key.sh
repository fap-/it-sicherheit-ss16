openssl genrsa -out ca.key 4096
openssl req -new -x509 -days 28 -key ca.key -out ca.crt -subj /C=DE/O=haw-hamburg/CN=CA
openssl genrsa -out sub.key 4096
openssl req -new -key sub.key -out sub.csr -subj /C=DE/O=haw-hamburg/OU=informatik/CN=CA
openssl x509 -req -days 28 -in sub.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out sub.crt
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr -sha512 -subj /C=DE/O=haw-hamburg/OU=informatik/CN=plankmonkeybruno.informatik.haw-hamburg.de
openssl x509 -req -days 28 -in server.csr -CA sub.crt -CAkey sub.key -set_serial 01 -out server.crt
