#!/usr/bin/env node

import { printSuccess, printError, printWeather} from './services/log-service.js';
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from './services/storage-service.js';
import {getWeather, getIcon} from "./services/api-service.js";
import inquirer from "inquirer";
import chalk from "chalk";

let currentCity = '';
let city = '';

const saveToken = async (token) => {
 if (!token.length) {
  printError('Not entered token');
  return;
 }
 try {
  await saveKeyValue(TOKEN_DICTIONARY.token, token);
  printSuccess('Token saved');
 } catch (e) {
  printError(e.message);
 }
}

const saveCity = async (city) => {
 if (!city.length) {
  printError('City not entered! \n');
  return;
 }
 try {
  await saveKeyValue(TOKEN_DICTIONARY.city, city);
  printSuccess('City selected! \n');
 } catch (e) {
  printError(e.message);
 }
}

const getForcast = async () => {

 currentCity = await getKeyValue('city');
  city = currentCity.charAt(0).toUpperCase() + currentCity.slice(1)

 if (!TOKEN_DICTIONARY.city.length) {
  currentCity = 'Please select a city!'
 } else {
  currentCity = TOKEN_DICTIONARY.city
 }

 const answers = await inquirer.prompt({
  name: 'weather_menu',
  type: 'list',
  message: ' WEATHER-MENU \n',
  choices: [
   `Check weather [ ${city} ]`,
   `Select city`,
   'Exit'
  ]}

 );

 await MenuChoice(answers.weather_menu);

}

let MenuChoice = async (answer) => {
 switch (answer) {
  case `Check weather [ ${city} ]`:

   try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    await printWeather(weather, getIcon(weather.weather[0].icon));
   } catch (e) {
    if (e?.response?.status === 404) {
     printError(`Can't find this city!`);
    } else if (e?.response?.status === 401) {
     printError('Wrong token!');
    } else {
     printError(e.message);

    }
   }

   await getForcast();

   break;

  case 'Select city':

   const selectingCity = await inquirer.prompt({
    name: 'weather_menu',
    type: 'input',
    message: 'Write city for weather',
   }
   );

   await saveCity(selectingCity.weather_menu);
   await getForcast();

   break;

  case 'Exit':

   console.log(chalk.bgCyan('\n Goodbye ') + ' thanks for using ♡ \n' )

   break;

  default:
   console.error('Something wrong!' + answer)
   break;
 }

}

await console.clear()
await getForcast();
