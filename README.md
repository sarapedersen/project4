# Project 3 docuemntation

## Generelt om løsningen

## API

## Redux

## Komponenter og pages
Komponentene er delt opp i deler av sidene våre, som vi så har impotert for å lage større komponenter som er satt inn på pages. Dette er fordi pages brukes i HashRoutingen på siden. Vi trenger dermed bare å route mellom pages, mens komponentene på hver side allerede ligger inne. Ettersom at vi ikke har en header som går over alle sidene, fungerte dette fint for oss. Routingen er gjort med Hashrouting fordi dette var kompatibelt med vm, og det er en grei løsning når vi ikke har komplekse routinger. 

## Søk og filtrering

## Responsivitet
Nettsiden er laget med mobile-first strategi. All skalering på siden skjer når skjermen bikker 768 pixler i bredden. Dette har gjort at siden fungerer bra og ser fin ut både på mobil og på større skjermer. Vi opplevde det som enklere å style mobile-first, enn å skalere ned komponentene, som vi gjorde på prosjekt 2, fordi plasseringen av komponentene krevde mindre endring. Vi har også justert bakgrunnen på skjermen for å gjøre det mindre forstyrrende på små skjermer. Vi har brukt Tailwind for å style appen, som i prosjekt 2, og all styling er in-line. Dette har gjort det enkelt å style enkeltkomponenter, og vi unngår rotete css-filer til småting. Responsiviteten er altså testet på både mobil og på laptop-skjerm. 

## Tester

