import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { OPENWEATHER_KEY } from '../config.js';

export default function Polution({ navigation }: RootTabScreenProps<'Polution'>) 
{
	const [aqi, setAqi] = React.useState("? AQI");
	const [breakdown, setBreakdown] = React.useState("?\n?\n?");
	
	constructor()
	{
		const pollutionAPI = "https://api.openweathermap.org/data/2.5/air_pollution?lat=35.3733&lon=-119.0187&units=imperial&appid=" + OPENWEATHER_KEY;
		fetch(pollutionAPI)
		  .then(response => response.json())
		  .then(data => {
				setAqi(data.list[0].main.aqi);
				setBreakdown(data.list[0].components.co + "μg/m3 of CO (Carbon Monoxide)\n" 
				+ data.list[0].components.no + "μg/m3 of NO (Nitrogen Monoxide)\n"
				+ data.list[0].components.no2 + "μg/m3 of NO2 (Nitrogen Dioxide)\n"
				+ data.list[0].components.o3 + "μg/m3 of O3 (Ozone)\n"
				+ data.list[0].components.so2 + "μg/m3 of SO2 (Sulphur Dioxide)\n"
				+ data.list[0].components.pm2_5 + "μg/m3 of PM2.5 (Fine Particle Matter)\n"
				+ data.list[0].components.pm10 + "μg/m3 of PM10 (Coarse Particle Matter)\n"
				+ data.list[0].components.nh3 + "μg/m3 of NH3 (Ammonia)\n");
		  })
		  .catch((e) => {
			  if(e instanceof TypeError) setAqi("? AQI");
			  else setAqi("Something went wrong\n(" + e + ")");
		  });
	}
	
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AQI: {aqi}</Text>
	  <Text style={styles.softTitle}>{"\n"}Full breakdown:</Text>
	  <Text>{breakdown}</Text>
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
  softTitle:
  {
	  fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
