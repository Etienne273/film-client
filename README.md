# Angular2 starterpack

Dit is een Angular2 startproject. Dit project is een standaard Angular CLI project, uitgebreid met een nodejs server die de single HTML page aanbiedt. De server heeft geen API; hiervoor is een externe server nodig, zoals bijvoorbeeld deze [node-mongodb-server](https://github.com/avansinformatica/node-mongodb-server).

Deze Angular starterpack draait op [Heroku](https://angular-avans-starter.herokuapp.com).

## Start

```
npm install
npm start  (of ng serve)
```

## Heroku
Je kunt deze Angular applicatie gemakkelijk op Heroku of een andere cloudprovider deployen. Je hebt dan ook een externe API server nodig. Dit kan een nodejs server zijn, maar ook een ASP.NET server op Azure. 

> Je Angular app gaat connectie maken met een backend om data op te halen. Onze app werkt met users uit de Mongodb database die via de API van de [node-mongodb-server](https://github.com/avansinformatica/node-mongodb-server) beschikbaar is. Je kunt natuurlijk ook een andere server maken, zolang die maar de juiste API aanbiedt voor jouw Angular frontend.  
> Je configureert de URL van de externe server in het bestand [environment.prod.ts](https://github.com/avansinformatica/angular-starterpack/blob/master/src/environments/environment.prod.ts).
> Vul daarin de URL van jouw Nodejs instantie op bijvoorbeeld Heroku in. Doe dat lokaal, op je eigen laptop, en push je wijzigingen naar je eigen repository. **Niet online wijzigen op GitHub!**

### Een app op Heroku
Om een app in de Heroku cloud te draaien doe je het volgende.
1. Maak een [Heroku account](http://www.heroku.com) als je die nog niet hebt, en log in. 
2. Maak een nieuwe app. Klik op 'New' en kies 'New app'. Geef een naam. Dit wordt de subdomeinnaam van jouw installatie.
3. Ga in je app naar 'Deploy' en koppel je app aan je GitHub account. Selecteer de repository waarin je je Nodejs Mongodb server beheert.
4. Klik bij 'Deploy' onderin het venster op 'Deploy'. Je app wordt nu opgehaald en geinstalleerd.
5. Klik rechtsboven op 'Open app'. Als alles goed is gegaan is je app beschikbaar.

## Referenties
- [Deploy Angular 4 app with Express to heroku](https://medium.com/@ervib/deploy-angular-4-app-with-express-to-heroku-6113146915ca)