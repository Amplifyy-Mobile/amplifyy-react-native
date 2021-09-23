import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
function Bookmarks() {
  return (
    <View style={styles.container}>
      <Text>Hey you're saved articles go here </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Bookmarks;
