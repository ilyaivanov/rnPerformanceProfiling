import React, {useState, useReducer, useCallback} from 'react';
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
  const [items, loadMore] = useItems();
  const renderer = useCallback(({index}) => <Row index={index} />, []);

  // console.log('NEW ITEMS', items.length);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.parentView}>
        <FlatList
          contentContainerStyle={styles.container}
          onEndReached={loadMore}
          onEndReachedThreshold={10}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderer}
        />
      </View>
    </>
  );
};

const keyExtractor = (_, index) => index + '';

const createArrayOfSize = size => Array.from(new Array(size));

const loadMore = items => items.concat(createArrayOfSize(chunkSize));

const useItems = () => useReducer(loadMore, createArrayOfSize(chunkSize));

const Row = React.memo(({index}) => {
  // console.log('Row.render');
  return (
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
  );
});

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
  container: {
    paddingTop: 20,
  },
  parentView: {
    backgroundColor: 'black',
  },
});

export default App;
