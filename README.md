# RoomMate

## TEKNISK FÖRSTUDIE OCH GRUPPKONTRAKT:

### TEKNISK FÖRSTUDIE	3
Sammanfattning	4
Bakgrund, syfte och mål	5
Bakgrund	5
Syfte	5
Mål	5
Tekniska problem/utmaningar	5
Tekniska utmaningar/ ev teknisk problemställning	6
React och realtidskommunikation med signalR (@microsoft/signalR).	6
Autentisering mot SmartHuts API (@azure/msal-browser).	6
Kravspecifikation	8
Produktkrav	8
Projektkrav	9
Förutsättningar	9
Leverans och införande	9
Nulägesanalys (frivilligt)	9
Genomförande	11
Tekniska avgränsningar	11
Arbetspaket	11
Tidplan	12
Mockup	12
GRUPPKONTRAKT	13
Gruppkontrakt	13

 
### TEKNISK FÖRSTUDIE

Namn på förstudie
SmartHut YMCA RoomMate App
Beställare
Andreas Boozon
Ansvarig (tex PL)
Viktor Lyresten
Teammedlemmar
Nandan Tyagi, Carl Anthon Wellsjö, Rasmus Lind



### Sammanfattning
Förstudien som uppskattas vara klar senast den 10 september kommer skapa ett underlag för att kunna utveckla en MVP i klarhet genom att: 
Identifiera styr-parametrarna och hur de skall prioriteras.
Resurser
Tre utvecklare på heltid
Tid
2 veckor för förstudie
2 veckor för utveckling
1 vecka för testning
Kvalitet
MVP enligt avstämd mockup
 
Studera de tekniska underlag som behövs för att kunna slutföra arbetet för inlärning av följande teman:
SignalR
MSAL.js
Hur react interagerar med SignalR och MSAL.js
Smart Hut's AP.
 
Forma och adaptera gruppens workflow och roller för ett effektivt arbete och god arbetsmiljö.
Skapa gruppkontrakt

## Bakgrund, syfte och mål
###Bakgrund
YMCA hotell vill digitalisera sin klimatanläggning och har installera en stor mängd smarta digitala sensorer i hotellets rum. Sensorerna: 1. Övervakar temperaturen och 2. larmar ifall ett värde hamnar utanför det normala.
Dessa sensorer är utvecklade och installerade av SmartHut, vars API tillhandahåller de verktyg som vi behöver för att utveckla ett gränssnitt som kan användas av personalen på hotellet för att läsa av värdena.
Vi är tre utvecklare och en IT-ansvarig som ska utveckla detta gränssnitt och har blivit anställda av hotellets ägare, Andreas Boozon.
 
### Syfte 
Denna förstudie ämnar att undersöka genomförbarheten av detta projekt genom att:  
Väga våra resurser (kunskap) mot andra styrparametrar (produktkvalitet, tidsplan).
Värdera kunskap och kunskapsbrister inom gruppen och hur de påverkar vår tidsplan.
Definiera alla löst definierade produktkrav som t.ex. UI och UX. 

### Mål
Förstudien ska: 
Identifiera vilket ramverk/bibliotek som är lämpligt för att skapa APP:en.
Identifiera vilket/vilka bibliotek som är lämpliga för kommunikationen med SmartHuts API:er.
Analysera kundens förväntningar på APPens design och färgteman.
Identifiera och påbörja gruppens inlärning av nödvändigt material för att kunna färdigställa en MVP.

## Tekniska problem/utmaningar
Tekniska utmaningar/ ev teknisk problemställning
React och realtidskommunikation med signalR (@microsoft/signalR).
Beskrivning: 
Produktens krav förutsätter att klient-gränssnittet kommunicerar med SmartHuts API, som använder biblioteket signalR. Denna utmaning förutsätter att utvecklarna införskaffar kunskap om hur signalR fungerar med react (javascript) och hur vi ska initiera en handshake + kontinuerlig realtidskommunikation med SmartHuts API. 

## Instuderingsmaterial:
Skapa en chat-app med asp.net, signalR och React.
Using SignalR in ASP.NET Core & React TypeScript to Send Messages

Pluralsight kurs om SignalR med ASP.NET:
https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwibtb-NhdvyAhUIEXsKHZ1KAwYYABAAGgJsZQ&ae=2&ohost=www.google.com&cid=CAESQOD2RVd_Uh8fgCFBffb8PDM01QSuP8dtsxOxzdlKxT12vqjd8DN4hgOzmwNexpAv_c_8du6QSEllpv7SlxhBO_Q&sig=AOD64_0nOfeY5Qikht6LxhwqidRtfrHgqw&q&adurl&ved=2ahUKEwjCl7aNhdvyAhVEQvEDHTjVA5QQ0Qx6BAgCEAE

###Artikel om SignalR .Net Core Web API med React.js:
Creating a simple real-time chat with .NET Core, ReactJS and SignalR

###Artikel om SignalR:
SignalR server and client communication process based on(Others-Community)
Autentisering mot SmartHuts API (@azure/msal-browser).
Beskrivning: 
Användare av APP:en ska kunna autentisera sig med sitt Microsoft-konto i klientgränssnittet. Denna autentisering kommer enligt rekommendationer från SmartHuts dokumentation ske med hjälp av biblioteket @azure/msal-browser. Detta bibliotek är utvecklat av microsoft för användning av autentisering mot Active Directory i javascript från klientsidan. Inloggningen kommer ske mot SmartHuts eget Azure-konto (active directory), och förutsätter därmed att användarna är registrerade där för att kunna autentiseras. 

Denna autentisering garanterar större säkerhet i ROOMMATE eftersom bara en lyckad inloggning returnerar den token som sedan krävs för att upprätta en anslutning (aka. handshake) men signalR. Bara därefter kan användaren få tillgång till sensorernas information.

### Instuderingsmaterial: 
Länk till msal:s npm-sida.
https://www.npmjs.com/package/@azure/msal-react

Video om autentisering med MSAL.js för SignalR
Authenticate users in JavaScript apps with MSAL.js

Länk till teknisk dokumentation på canvas om SmartHuts autentisering:
https://ju.instructure.com/courses/4383/pages/teknisk-dokumentation?module_item_id=112858
https://ju.instructure.com/courses/4383/files/496195/download?wrap=1


##Kravspecifikation

### Produktkrav
ID nr
KRAV
TYP  S=SKALL B=BÖR SI= SKALL INTE I=INFO
1
UI/UX
1.1
APP:en skall tydligt visa när ett larm har gått.
S
1.2
APP:ens UI ska vara tilltalande, användbart och följa de riktlinjer som kunden efterfrågat.
S
1.3
APP:en skall anpassas för  användning på telefoner och läsplattor.
S
1.4
Användaren skall kunna se specifika värden efter dess geografiska plats. (även funktionellt krav)

s
2

### Funktionalitet

2.1
Användaren skall kunna stänga av ett alarm från APP:en så att tillståndet på SmartHuts server/DB uppdateras.
S
2.2
APP:en skall alltid visa rätt/uppdaterade värden från SmartHut.
S
2.3
APP:en skall inte behöva laddas om för att uppdatera värden.
S
2.4
Användaren skall kunna söka på värdet från en specifik sensor. (Typ av sökfunktion, skroll eller sökfält?)
S
2.5
Användaren skall kunna se specifika värden efter dess geografiska plats. (även UI/UX-krav)
S
2.6
Användaren skall kunna logga in och logga ut.
S
2.7
Användaren skall inte kunna ändra temperaturinställningar från APP:en.
SI


## Projektkrav

Projektet ska genomföras med ett utvecklarteam på 3 heltidsanställa utvecklare + 1 IT- arkitektur-ansvarig.
Kravet från kunden är att produkten förväntas uppfylla samtliga krav vid deadline (25:e september 2021) och då vara färdig för driftsättning.
Projektet startar 24:e augusti och avslutas den 25:e september.



## Förutsättningar
Att samtliga teammedlemmar kommer till möten och tar del av gemensam information.
Att instuderingsmaterial studeras av samtliga utvecklare som förväntas arbeta med relevant teknik. 
Alla utvecklare gör sina arbetsuppgifter efter utsatt tid för att kunna driva projektet framåt.

## Leverans och införande
I slutet av arbetsperioden skall projektarbetet redovisas för övriga intressenter. Under presentationen demonstrerar vi  att vårt projektarbete fungerar live. Viktor Lyresten, IT-ansvarig, kommer sedan att driftsätta applikationen på hotellets server.


##Nulägesanalys (frivilligt)

### SWOT-analys

### Styrkor
Api finns
Sensorer på plats
Realtidskommunikation


### Svagheter
Ny teknologi
Begränsad kunskap
Barn
Tid

### Möjligheter
Tydlig översikt av klimatet på hotellet


### Hot
Tidsbrist
Felande sensorer
Misskommunikation i API

### Slutsatser
Appen är möjlig att utveckla med nuvarande förutsättningar.

## Genomförande

### Tekniska avgränsningar
Tekniska val och övergripande systemlösningar/arkitektur

Det får inte köpas in några färdiga UI-bibliotek och APP:en ska utvecklas till fullo av utvecklarteamet (utan betaltjänster).
Appen ska kommunicera med SmartHuts eget API, och därmed behövs bara ett klientgränssnitt och ingen egen API eller någon databas behöver utvecklas. 
Ett klientgränssnitt kommer byggas med react (create-react-app) där javascript-biblioteket @microsoft/signalr används för realtidskommunikation och @azure/msal-browser för autentisering (ev. @azure/msal-react om detta anses medföra ett mervärde).

### Arbetspaket

Kanban över förstudie hittas på:  https://trello.com/b/whSND5nV/smarthut-ymca
WBS finns på: wbs

### Tidplan
Tidplan / Gantt-schema

Se bifogad fil. https://smarthutproject.slack.com/files/U02CQ8G16JH/F02DLPDGE06/gantt_schema_smarthut_f__rstudie.xlsx

### Mockup
Under förstudien gjordes en avstämning med Andreas Boozon där följande mockup presenterades (på avstämningsmötena den 9/9 -21 och 10/9-21). Andreas bekräftade då att denna modell fungerar som en bra mall för appens UI och UX.

## GRUPPKONTRAKT
Gruppkontrakt
Gruppens namn/nummer:
Grupp 5
Regler och rutiner:

Gruppen träffas varje arbetsdag i veckan. Möte på morgonen klockan 10.15 för att stämma av vad och hur vi ska göra under dagen. 

Beslut i gruppen fattas genom att tillsammans diskutera olika frågor som dyker upp. Alla måste vara överens om viktiga beslut innan de kan fattas.

Vid frånvaro tar vi reda på anledningen och varför den var nödvändig och arbetar sedan därifrån. Är detta något som händer kontinuerligt så får detta tas upp med ansvariga läraren. Den person som ej ska närvara har som skyldighet att informera gruppen i god tid om anledningen och sedan ta reda på vad som bestämts under mötet.

Godtagbara skäl för frånvaro är om man är sjuk, barn är sjuk samt akuta ärenden. Om det går ska man meddela i förväg om detta kan bli aktuellt.

Våra etablerade metoder att arbeta efter är scrum och kanban.

Om en person inte sköter sina arbetsuppgifter eller ansvarsområde pratar vi med personen och ser vart problemet ligger. Är det någon arbetsuppgift som personen inte klarar av så får vi hjälpas åt för att lösa problemet. Är detta något som upprepas så får man ta kontakt med Viktor som är ansvarig för projektet.


## Roller och arbetsfördelning

Genom att tillsammans arbeta ut vad de olika personerna kan och fördela arbetet rättvist. Visar det sig att någon person får mer att göra än de andra får man diskutera och fördela om arbetet. Ha en öppen dialog ofta och konsekvent på både slack och zoom.

Vi har fördelat roller efter 3 ansvarsområden:
Projektansvarig (Rasmus): 
Ansvarar för att produkten uppfyller alla krav.
Git-ansvarig (Anthon):
Ansvarar för att alla branches merge:ar utan konflikter och testar koden.
UI/UX-ansvarig (Nandan):
Ansvarar för att APP:en uppfyller de estetiska krav och är intuitiv att använda.

Ansvarsområdena har lottats ut och innebär inte att arbetet ska delas upp till hundra procent. Varje utvecklares arbete överskrider dessa gränser och om eventuella byten kan göras om de ansvariga är överens.


## Kommunikation
Vi använder oss kontinuerligt av slack och trello för att stämma av och se vad personer gör. 

Genom att låta alla prata till punkt och respektera vad alla har att säga så får alla ge sin åsikt i de punkter vi tar upp på mötena. Respekt och tålamod för att alla inte har samma erfarenheter krävs för att ge alla utrymme i diskussionerna.

Zoom, slack och trello används för att fatta gemensamma beslut.

Möten bokas på zoom för att ta upp viktiga frågor med läraren. Vi använder slack för kortare och akut kommunikation med läraren. Den projektansvarige ansvarar för övriga gemensamma frågor från gruppen om dessa inte framförs gemensamt.


Detta kontrakt har upprättats av följande gruppmedlemmar:
Datum
Närvarande
10/9-21
Rasmus, Anthon, Nandan
