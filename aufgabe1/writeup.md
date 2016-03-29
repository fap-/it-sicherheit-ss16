## Aufgabe 1
Write up by **fap & elx**

### usb.dd

```
# Untersuchung des Stick
testdisk usb.dd
# > Proceed
# > Intel (Wie vorgeschlagen)
# > Analyze
# > Quicksearch & Deepersearch
# > Das 'D' bedeutet, dass die Partitionen geloescht wurden. 

# Fotos vom Stick ziehen mit:
photorec usb.dd


```

### rhino.log
* In wireshark suchen: 
  * `http contains "GET"`, so erhaelt man alle aufgerufenen seiten.
  * `http contains "OK"`, so erhaelt man alle responses.
* Man kann per `File > Export Objects > HTTP` viele Bilder und 
Dateien exportieren. Wenn man `Save All` auswaehlt, werden alle Dateien in Fragmenten
exportiert. Deshalb werden diese einzeld exportiert.


### rhino2.log

### rhino3.log
