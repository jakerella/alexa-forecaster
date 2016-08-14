# Alexa Weather Forecaster

This is a demo repo for creating an [Amazon Alexa (Echo) Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit). It uses the [Forecast.io API](https://developer.forecast.io/) to retrieve weather data and [Express](http://expressjs.com/) for the basic HTTP server functionality. Feel free to clone and modify this repo however you like! There is lots of room to grow.

## Running the Skill

You can run this application simply enough, just clone the repo, install the dependencies, and set your API key for forecast.io. Note that in a non-development environment this application will attempt to verify all incoming requests as being valid Alexa skill requests per Amazon's guidelines. As such, it will be difficult to run this code on your own server for any purpose _other than_ an Amazon Alexa Skill.

```
~$ git clone https://github.com/jakerella/alexa-forecaster
...
~$ cd alexa-forecaster
~/alexa-forecaster$ npm install
...
~/alexa-forecaster$ export WEATHER_API_KEY="........"
~/alexa-forecaster$ node .
```

If you want to use cards and images on them, you'll need to also set the location for your image store. Simply set this environment variable to the location of your image store: `WEATHER_IMAGE_BASE`

That server will need to have images for the various `icon` values that forecast.io returns. It must also implement the [Alexa image hosting requirements](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app#image_hosting) defined in their developer documentation.

### Sending Test Requests

You can use a tool like Postman to send test requests to your local server while in development. Here's an example of the body of a `POST` request that should be handled successfully by this skill:

> Note: you will need to update the "value" in the "When" block below with a date sometime in the next 7 days as that is all the data that Forecast.io provides in this implementation.

```
{
  "version": "1.2.3",
  "session": {
    "new": true,
    "sessionId": "123456789765432134567",
    "application": {
      "applicationId": "234567865432134567865"
    },
    "attributes": {
      "dateRequested": false
    },
    "user": {
      "userId": "8976543567897654325678965",
      "accessToken": "7865432456432145678654678"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "6578654325675432",
    "timestamp": "1234567889",
    "intent": {
      "name": "Weather",
      "slots": {
        "When": {
          "name": "When",
          "value": "2016-08-11T11:00:00"
        }
      }
    }
  }
}
```

## How do I make an Alexa Skill out of this?

It doesn't take much. You could deploy this [Node app on a Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) dyno, then you need to [register your skill with Amazon](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill#step-2-set-up-the-skill) and you should be good to go!

### What about testing my skill?

**You do not need to have your skill certified and published to use it.** But no one else would be able to install it on their Echo devices.

Once you've registered your skill on Amazon's developer portal you can use their text-based [Service Simulator](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#h2_servicesim) to send requests through Amazon to your server, or you can use [Echosim.io](echosim.io) to test your skill as if you were on a real Echo device! (And of course, you could test your skill on your own Echo device.)
