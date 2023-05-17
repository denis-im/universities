# Universities App

Universities App is simple demonstration application which fetches data about universities
in different countries from Universities API "http://universities.hipolabs.com/search".
Main page presents list of countries with name of country, ISO code, Flag and number of universities
in country. User can click on any country and app presents next page with list of universities in
selected country. This table presents name of universities, state or province, first domain and first
web page. After selecting university page with all data of university is shown: name of country, ISO code,
flag, name of university, list of domains and list of webpages. Here webpages are links which open selected
link in new tab in browser. In footer is back button which leads one level up and breadcrumb with all levels.
Above both tables there is search input which filters results to names of countries or universities accordingly.

Project is built in Typescript with React, React country flag, React router, Material UI and Material icons.

## To get a local copy up and running follow these simple steps:

1. Clone the repo

### git clone https://github.com/denis-im/universities

2. To run the application it was used the concurrently package. Install it with command

### npm install

or

### yarn

3. Start the project

### npm start

or

### yarn start
