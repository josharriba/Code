import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {services} from '../components/services';
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from 'native-base';
import colors from './assets/colors/colors';

export default function NewsScreen() {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    services('business')
      .then(data => {
        setNewsData(data);
      })
      .catch(error => {
        alert(error);
      });
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView height={850}>
        <FlatList
          data={newsData}
          renderItem={({item}) => (
            <View>
              <View style={styles.newsContainer}>
                <View style={styles.newsBox}>
                <Text style={styles.newsBox.newstitle}>{item.title}</Text>
                <Text style={styles.newsBox.date}>{item.publishedAt}</Text>
                <Text style={styles.newsBox.newsDescriptions}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: "grey",
    padding: 1,
  },
  newsBox: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    //borderBottomColor: "lightgrey",
  newstitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    //backgroundColor: "lightgrey",
    //borderRadius: 10,
  },
  newsDescriptions: {
    fontSize: 16,
    marginTop: 10,
    //backgroundColor: "lightgrey"
  },
  date: {
    fontSize: 14,
    //backgroundColor: "lightgrey"
  },
}
});
