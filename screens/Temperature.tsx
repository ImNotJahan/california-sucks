import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { OPENWEATHER_KEY } from "../config.js";

export default function TemperatureScreen({ navigation }: RootTabScreenProps<'Temperature'>) 
{
	const [temperature, setTemperature] = React.useState("Getting Temperature...");
	const [feelsLike, setFeelsLike] = React.useState("?");
	const [range, setRange] = React.useState("? and ?");
	const [wind, setWind] = React.useState("? and ?");
	
	constructor()
	{
		const temperatureAPI = "https://api.openweathermap.org/data/2.5/weather?q=bakersfield&units=imperial&appid=" + OPENWEATHER_KEY;
		fetch(temperatureAPI)
		  .then(response => response.json())
		  .then(data => {
				var temp = data.main.temp;
				setTemperature(temp + "°F");
				setFeelsLike(data.main.feels_like);
				setRange(data.main.temp_min + "°F and " + data.main.temp_max + "°F");
				setWind("Moving at " + data.wind.speed + "MPH\nDirected at a " + data.wind.deg + "° angle\nGusting at " + data.wind.gust + "MPH");
		  })
		  .catch((e) => {
			  if(e instanceof TypeError) setTemperature("?°F");
			  else setTemperature("Something went wrong\n(" + e + ")");
		  });
	}
	
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{temperature}</Text>
	  <Text>Feels like {feelsLike}°F</Text>
	  <Text>Will range between {range}{"\n"}</Text>
	  <Text style={styles.title}>Wind</Text>
	  <Text>{wind}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
