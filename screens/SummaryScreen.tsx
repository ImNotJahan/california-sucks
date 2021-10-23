import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Config from "../config.js";

export default function SummaryScreen({ navigation }: RootTabScreenProps<'Summary'>)
{
	const [temperature, setTemperature] = React.useState("Getting Temperature...");
	const [air, setAir] = React.useState("Getting Air Quality...");
	const [dust, setDust] = React.useState("Getting Amount of Dust...");
	const [fire, setFire] = React.useState("Getting Nearby Fires...");
	const [light, setLight] = React.useState("Getting Today's Brightness...");
	constructor()
	{			
		const temperatureAPI = "https://api.openweathermap.org/data/2.5/weather?q=bakersfield&units=imperial&appid=" + Config.OPENWEATHER_KEY;
		const pollutionAPI = "https://api.openweathermap.org/data/2.5/air_pollution?lat=35.3733&lon=-119.0187&units=imperial&appid=" + Config.OPENWEATHER_KEY;
		const fireRSS = "https://firefighterinsider.com/feed/";
		
		fetch(temperatureAPI)
		  .then(response => response.json())
		  .then(data => {
				var temp = data.main.temp;
				setTemperature(evaluate(temp) + " (" + temp + "°F)");
		  })
		  .catch((e) => {
			setTemperature("Something went wrong\n(" + e + ")");
		  });
		  
		  fetch(pollutionAPI)
		  .then(response => response.json())
		  .then(data => {
				var aqi = data.list[0].main.aqi;
				var dust = data.list[0].components.pm2_5;
				setAir(aqiEval(aqi) + " air quality (" + aqi + " AQI)");
				setDust(dustEval(dust) + " (" + dust + " PM)")
		  })
		  .catch((e) => {
			setAir("Something went wrong\n(" + e + ")");
		  });
		  
		  fetch(fireRSS)
		  .then(response => response.text())
		  .then(data => {
				setFire("There are " + getSubstringAmount(data, "<item>") + " fires nearby");
			})
		  .catch((e) => {
			setAir("Something went wrong\n(" + e + ")");
		  });
		  
		  console.log("Constructor called")
	}
	
	function getSubstringAmount(string, word) 
	{
      return string.split(word).length - 1;
	}
	
	function dustEval(dust)
	{
		if(dust < 12) return "Not much dust";
		else if(dust < 35) return "Pretty dusty";
		else if(dust < 55) return "This much dust can hurt";
		else if(dust < 150) return "There's a dangerous amount of dust";
		else if(dust < 250) return "There's a very dangerous amount of dust";
		else if(dust < 500) return "A deadly amount of dust";
		return "The air must be solid";
	}
	
	function aqiEval(aqi)
	{
		switch(aqi)
		{
			case 1:
			return "Good";
			
			case 2:
			return "Fair";
			
			case 3:
			return "Meh";
			
			case 4:
			return "Bad";
			
			case 5:
			return "Really bad";
			
			default:
			return "???";
		}
	}
	
	function evaluate(temp)
	{
		var roundedTemp = Math.round(temp / 10);
		
		switch(roundedTemp)
		{
			case 11:
			return "You're going to die";
			
			case 10:
			return "Stay inside";
			
			case 9:
			return "Very hot";
			
			case 8:
			return "Pretty hot, wear short sleeves";
			
			case 7:
			return "It's a nice temperature";
			
			case 6:
			return "Slightly chilly";
			
			case 5:
			return "Bring a sweater";
			
			case 4:
			return "You're going to want longjohns";
			
			case 3:
			return "It's freezing out";
			
			case 2:
			return "Wear gloves and a hat";
			
			case 1:
			return "Put on snow gear";
			
			case 0:
			return "You're going to slip";
			
			case -1:
			return "Stay inside and drink some coco";
			
			default:
			return "The temperature out is extreme";
		}
		
		return "Freezing, put on snow gear";
	}
	
  return (
    <View style={styles.container}>
	<Text style={styles.text}>{temperature}{"\n"}{air}{"\n"}{dust}{"\n"}{fire}{"\n"}{light}</Text>
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
  text:
  {
	  fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
