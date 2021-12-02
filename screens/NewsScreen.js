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
                <Text style={styles.newstitle}>{item.title}</Text>
                <Text style={styles.date}>
                  {moment(item.publishedAt).format('lll')}
                </Text>
                <Text style={styles.newsDescriptions}>{item.description}</Text>
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
    padding: 10,
  },
  newstitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  newsDescriptions: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
});
