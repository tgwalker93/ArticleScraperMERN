![https://github.com/tgwalker93/ArticleScraperMERN/blob/master/client/src/images/newspaper.jpg](https://github.com/tgwalker93/ArticleScraperMERN/blob/master/client/src/images/newspaper.jpg)

# MERN Article Scraper
A `NodeJS`, `MongoDB`, `Express`, and `ReactJS` application that pulls articles from the New York Times and allows the user to save and add notes to it. This application uses cheerio to scrape new articles from nytimes.com.

This application is live on Heroku. [Click here to view](https://mernarticlescraper.herokuapp.com/) 

## Functionality
On the backend, the app uses `express` to serve routes and `mongoose` to interact with a `MongoDB` database.

On the frontend, the app uses `ReactJS` for rendering components, `axios` for internal/external API calls, and `bootstrap` as a styling framework.

In order to transpile the JSX code, `webpack` and `babel` were utilized. All of the JSX  code in the `/app` folder was transpiled into the `bundle.js` file located in the `/public` folder.


## Built With

* [Mongo](https://www.mongodb.com/) - Database
* [React](https://reactjs.org/docs/hello-world.html) - Front-End Framework
* [Mongoose](http://mongoosejs.com/docs/api.html) - ODM Library
* [Node.js](https://nodejs.org/en/docs/) - Back-End Framework
* [Express.js](https://expressjs.com/) - Routing and middleware web framework
* [Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/) - Front-End Framework


## Authors

* **Tyler Walker** - *Sole Developer* - [tgwalker93](https://github.com/tgwalker93)


## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
```

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!


---


[![HitCount](http://hits.dwyl.io/tgwalker93/ArticleScraperMERN.svg)](http://hits.dwyl.io/tgwalker93/ArticleScraperMERN)