import React from 'react';
import { BackHandler, Button, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function PurchaseTabScreen() {

  const renderItem = (item: {key: string}) => {
    return (
      <View style={styles.item}>
        <Button title={item.key}></Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={[
          {key: '1 Session - £18'},
          {key: '6 Session - £90'},
          {key: '12 Session - £156'},
          {key: '20 Session - £220'},
          {key: '30 Session - £300'},
          {key: '60 Session - £540'},
        ]}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    width: '100%',
    backgroundColor: 'red'
  },
  item: {
    padding: 10,
    justifyContent: 'center',
    fontSize: 18,
    height: '50%',
    backgroundColor: 'white'
  }
});
