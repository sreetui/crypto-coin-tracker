# crypto-coin-tracker
Crypto coin tracker tracks top 100 cypto coins


# Description
Crypto coin tracker application uses latest Angular 17 features like Signals, control blocks, standalone components, directives, Ngrx State management, RxJs operators and NgPrime P-table etc.

It uses CoinMarketCap api to fetch the latest 100 crypto coins. I subscribed to pro coinmarketcap account for free 10k api credits per month.

After fetching the latest 100 crypto currencies, it uses Binance websocket stream API to get the latest values to update all the 100 coins. It uses the Angular 17 signal to update the latest coin prices from stream.

Application uses NgPrime table to render the coins in table format. I personally liked NgPrime table which is very powerful module to render table in various formats.

Supported browsers: Chrome

This is responsive application. Please check "[Crypto Coin Tracker Screenshots.pdf](https://github.com/sreetui/crypto-coin-tracker/blob/main/Crypto%20Coin%20Tracker%20Screenshots.pdf)" under root project "crypto-coin-tracker" folder for detailed information

Please click the below link to access application directly from AWS Cloud.

[Crypto Coin Tracker](http://sree-crypto-coin-tracker.s3-website-us-east-1.amazonaws.com/)



# Instructions
Clone project

run "npm install" from project root folder ( where package.json resides )

run "ng serve" from project root folder ( where package.json resides )

open browser and hit "http://localhost:4200" to run the application.
