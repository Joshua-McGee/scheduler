# Interview Scheduler

## Setup

Install dependencies with `npm install`.

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory 
(NOT within our current scheduler directory) and follow the README.md instructions to configure and run the API server. 
  * you will need to have both the scheduler-api and scheduler running in order for the app to populate data

## Example of Server Running vs Not Running
####If you run the app without the server also running it will populate no data
!["app without data"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/Without-server-api.png?raw=true)

####you can expect to see this in your terminal if your server is not running
!["error in terminal"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/terminal-no-api.png?raw=true)

####If everything is set up correctly you should see something similar to this
!["working app](https://github.com/Joshua-McGee/scheduler/blob/master/docs/day-selected-example.png?raw=true)


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
