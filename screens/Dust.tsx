import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { OPENWEATHER_KEY } from '../config.js';

export default function Dust({ navigation }: RootTabScreenProps<'Dust'>) {
	const [pm, setPM] = React.useState("? PM");
	
	const fineRateArr = ["Good: 0-20 μg/m3", "Fair: 20-40 μg/m3", "Moderate: 40-50 μg/m3", "Poor: 50-100 μg/m3", "Very Poor: 100-150 μg/m3", "Extremely Poor: 150-1200 μg/m3"];
	const fineRates = fineRateArr.map((word, idx) => 
	{
		return "\n" + word;
	});
	
	const coarseRateArr = ["Good: 0-10 μg/m3", "Fair: 10-20 μg/m3", "Moderate: 20-25 μg/m3", "Poor: 25-50 μg/m3", "Very Poor: 50-75 μg/m3", "Extremely Poor: 75-800 μg/m3"];
	const coarseRates = coarseRateArr.map((word, idx) => 
	{
		return "\n" + word;
	});
	
	constructor()
	{
		const pollutionAPI = "https://api.openweathermap.org/data/2.5/air_pollution?lat=35.3733&lon=-119.0187&units=imperial&appid=" + OPENWEATHER_KEY;
		fetch(pollutionAPI)
		  .then(response => response.json())
		  .then(data => {
				setPM(data.list[0].components.pm2_5 + "μg/m3 of Fine Particle Matter\n" + data.list[0].components.pm10 + "μg/m3 of Coarse Particle Matter");
		  })
		  .catch((e) => {
			  if(e instanceof TypeError) setPM("The sky is falling");
			  else setPM("Something went wrong\n(" + e + ")");
		  });
	}
  
  return (
    <View style={styles.container}>
      <Text>{pm}{"\n"}</Text>
		<Text style={styles.guide}>For Fine Particle Matter: {fineRates}</Text>
		<Text style={styles.guide}>{"\n"}For Coarse Particle Matter: {coarseRates}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  guide: {
    color: "#ddf",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
