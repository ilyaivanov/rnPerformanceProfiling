import React, {useState} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';

const chunkSize = 300;

const createColor = index => {
  var tinycolor = require('tinycolor2');
  const colorModifier = val =>
    index % (chunkSize * 2) < chunkSize
      ? tinycolor('black').lighten(val)
      : tinycolor('white').darken(val);
  return colorModifier(((index % chunkSize) / chunkSize) * 100);
};

const getColor = index => createColor(index).toString();

const getTextColor = index => (createColor(index).isDark() ? 'white' : 'black');

const App = () => {
  const [items, setItems] = useState(Array.from(new Array(chunkSize)));

  const concat = () => {
    const newItems = items.concat(Array.from(new Array(chunkSize)));
    setItems(newItems);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{backgroundColor: 'black'}}>
        <FlatList
          contentContainerStyle={{paddingTop: 20}}
          onEndReached={concat}
          onEndReachedThreshold={10}
          data={items}
          keyExtractor={(_, index) => index + ''}
          renderItem={({index}) => (
            <View style={[styles.bar, {backgroundColor: getColor(index)}]}>
              <Image
                style={styles.image}
                height={50}
                width={50}
                source={{uri: 'https://cdn141.picsart.com/252986329011202.jpg'}}
              />
              <Text style={[styles.text, {color: getTextColor(index)}]}>
                {Math.floor(index / chunkSize)} - {index + 1}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  bar: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'blue',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    width: 100,
    fontSize: 23,
  },
});

export default App;
