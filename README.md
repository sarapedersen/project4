# Project 4 dokumentasjon

## Generelt om løsningen
Løsningen vår er en nettside hvor man kan huke av land man har vært i, og filtrere slik at man får en oversikt over alle landene man har besøkt. På nettsiden kan man også registrere en bruker og logge inn for å ta vare på dataen, samt søke etter land og sortere enten stigende eller synkende. Databasen vår er lagd med MongoDB og all data kommer fra en csv-fil generert med APIet fra restcountries.com. Vi valgte dette APIet fordi det hadde en tilstrekkelig mengde data med både land og informasjon om hvert land. Dette gjør at vi får et stor datasett som vi kan hente ut mye informasjon fra, som var et av kravene i oppgaveteksten. I tillegg har vi bruk Express.js som backend med GraphQL.

## State management
For state management har vi benyttet oss av Recoil som er et state management bibliotek i React. Med Recoil kan man lagre tilstander ved bruk av enheter kalt Atoms, som deles slik at man kan benytte og oppdatere en tilstand flere steder. Dette har vi brukt for å ta vare på data om land og bruker gjennom flere komponenter. 

## Komponenter og pages
Komponentene er delt opp i HTML-tags på sidene våre, som vi så har importert for å lage større komponenter som er satt inn på pages. Grunnen til at vi bruker pages er fordi pages brukes i HashRoutingen på siden. Vi trenger dermed bare å route mellom pages, mens komponentene på hver side allerede ligger inne. Ettersom at vi ikke har en header som går over alle sidene, fungerte dette fint for oss. Routingen er gjort med Hashrouting fordi dette var kompatibelt med vm, og det er en grei løsning når vi ikke har komplekse routinger.

## Søk og filtrering
For å søke har vi implementert et søkefelt i headeren hvor man kan søke på land i databasen. Her vil man finne alle land som inneholder søkeordet. I tillegg er det implementert en filtreringsfunksjonalitet hvor brukeren kan filtrere på land hen har besøkt. Input fra brukeren tas inn ved å klikke på jordkloden til venstre på hvert land. Da vil jordkloden få farge, som symboliserer at brukeren har vært i dette landet. Da vil man altså kunne finne dette landet ved å filtrere på land man har besøkt, “My countries”. 

## Responsivitet
Nettsiden er laget med mobile-first strategi. All skalering på siden skjer når skjermen bikker 768 pixler i bredden. Dette har gjort at siden fungerer bra og ser fin ut både på mobil og på større skjermer. Vi opplevde det som enklere å style mobile-first, enn å skalere ned komponentene, som vi gjorde på prosjekt 2, fordi plasseringen av komponentene krevde mindre endring. Vi har også justert bakgrunnen på skjermen for å gjøre det mindre forstyrrende på små skjermer. Vi har brukt Tailwind for å style appen, som i prosjekt 2, og all styling er in-line. Dette har gjort det enkelt å style enkeltkomponenter, og vi unngår rotete css-filer til småting. Responsiviteten er altså testet på både mobil og på laptop-skjerm.

## Tester
Nettsiden vår er testet med både ende-til-ende testing samt et par enkle enhetstester for å teste at det fungerer slik det skal. Ende-til-ende testen er laget med JavaScript rammeverket Cypress, og tester paginering ved å bla fram og tilbake og sjekke hvilke land som er i listen, samt filtrering og at riktig info kommer når man klikker på et land. Enhetstestene er lagd med React-testing-library og JavaScript test rammeverket Jest, hvor det testes at komponentene rendres og at det som skal vises faktisk vises på nettsiden. For å kjøre cypress tester npx cypress run. For å kjøre Jest tester npm test.

## Design 
For designet har vi valgt å holde oss til et gjennomgående tema med tydelige farger, eksempelvis svart tekst på hvit bakgrunn for å sikre økt lesbarhet på viktig info, og gjenkjennbare komponenter med et design slik brukeren forventer.
