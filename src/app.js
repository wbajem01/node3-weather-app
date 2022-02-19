const path = require('path'); // core Node module
const express = require('express'); // npm module
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express configuration.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve static assets.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Wayne Bajema',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Wayne Bajema',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Wayne Bajema',
    message: 'We are here to help!',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided!',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          address: req.query.address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  // matches anything after /help (that hasn't been matched ealier)
  res.render('404', {
    title: '404',
    name: 'Wayne Bajema',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Wayne Bajema',
    errorMessage: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});
