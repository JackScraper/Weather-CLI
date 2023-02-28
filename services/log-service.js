import chalk from "chalk";
import dedent from "dedent-js";



const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printWeather = async (res, icon) => {

    console.log(dedent`${chalk.bgMagenta('\n WEATHER ')} in city ${res.name} right now \n
		${icon}  ${res.weather[0].description}! \n
		Temperature: ${res.main.temp}°C feels like ${res.main.feels_like}°C \n
		Humidity: ${res.main.humidity}% \n
		Wind speed: ${res.wind.speed} \n
		
		`
    );
};

export { printError, printSuccess, printWeather };