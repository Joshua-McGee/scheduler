# Interview Scheduler

## Setup

Install dependencies with `npm install`.
 * make sure PORT 8000 and 8001 is clear.

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory 
(NOT within our current scheduler directory) and follow the README.md instructions to configure and run the API server. 
  * you will need to `npm start` both scheduler-api and scheduler in order for the app to work properly.


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
## Example of Scheduler-api server Running vs Not Running

**If you run the app without the server also running it will populate no data**

!["app without data"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/Without-server-api.png?raw=true)

**you can expect to see this in the terminal if your server is not running**

!["error in terminal"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/terminal-no-api.png?raw=true)

**If everything is set up correctly you should see something similar to this**

!["working app"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/day-selected-example.png?raw=true)

## Screenshots of Final Product

!["fully booked day"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/fully-booked-day.png?raw=true)
!["hover state"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/hover-state.png?raw=true)
!["edit"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/edit-an-appointment.png?raw=true)
!["delete"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/deleting-an-appointment.png?raw=true)
!["mobile view"](https://github.com/Joshua-McGee/scheduler/blob/master/docs/mobile-view.png?raw=true)