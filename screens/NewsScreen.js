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
import moment from 'moment';
import colors from './assets/colors/colors';

/*
  Component to display news data
  We use useEffect to automatically keep the app up to date
  with new news articles
  We use the services component in ../components/services.js
  to search for business news and dispay the news articles
*/
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
        {newsData.length > 1 ? (
          <FlatList
            data={newsData}
            renderItem={({item}) => (
              <View>
                <View style={styles.newsBox}>
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
                  <Text style={styles.newsBox.newstitle}>{item.title}</Text>
                  <Text style={styles.newsBox.date}>
                    {' '}
                    {moment(item.publishedAt).format('lll')}
                  </Text>
                  <Text style={styles.newsBox.newsDescriptions}>
                    {item.description}
                  </Text>
                </View>
                <Divider my={2} bg="#e0e0e0" />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={StyleSheet.spinner}>
            <Spinner color="danger.400" />
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: 'grey',
    padding: 1,
  },
  newsBox: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
  },

  newstitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  newsDescriptions: {
    fontSize: 16,
    marginTop: 10,
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
  },
});
