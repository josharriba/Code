import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import {services} from '../components/services';
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from 'native-base';
<<<<<<< HEAD
import moment from 'moment';
=======
import colors from './assets/colors/colors';
>>>>>>> master

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
<<<<<<< HEAD
        {newsData.length > 1 ? (
          <FlatList
            data={newsData}
            renderItem={({item}) => (
              <View>
                <View style={styles.newsContainer}>
                  <TouchableNativeFeedback
                    onPress={() => Linking.openURL(item.url)}>
                    <Image
                      width={550}
                      height={250}
                      resizeMode={'cover'}
                      source={{uri: item.urlToImage}}
                      alt="Alternate Text"
                    />
                  </TouchableNativeFeedback>
                  <Text style={styles.newstitle}>{item.title}</Text>
                  <Text style={styles.date}>
                    {' '}
                    {moment(item.publishedAt).format('lll')}
                  </Text>
                  <Text style={styles.newsDescriptions}>
                    {item.description}
                  </Text>
                </View>
                <Divider my={2} bg="#e0e0e0" />
=======
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
>>>>>>> master
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={StyleSheetList.spinner}>
            <Spinner color="danger.400" />
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
<<<<<<< HEAD
    backgroundColor: 'grey',
    padding: 1,
  },
  newsBox: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
=======
    backgroundColor: "grey",
    padding: 1,
>>>>>>> master
  },
  newsBox: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    //borderBottomColor: "lightgrey",
  newstitle: {
<<<<<<< HEAD
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
=======
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    //backgroundColor: "lightgrey",
    //borderRadius: 10,
>>>>>>> master
  },
  newsDescriptions: {
    fontSize: 16,
    marginTop: 10,
<<<<<<< HEAD
    backgroundColor: 'lightgrey',
  },
  date: {
    fontSize: 14,
    backgroundColor: 'lightgrey',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
=======
    //backgroundColor: "lightgrey"
  },
  date: {
    fontSize: 14,
    //backgroundColor: "lightgrey"
>>>>>>> master
  },
}
});
