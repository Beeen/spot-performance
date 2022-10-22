import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';

export default function BookTabScreen({ navigation }: RootTabScreenProps<'BookTab'>) {

  const [items, setItems] = useState({})
  const [bookings, myBookings] = useState()
  const [isFiltered, setFiltered] = useState(false)

  // Should be called only once when component mounts
  useEffect(() => {
    
  }, []);

  // Should be called when the bookings on the day we are observing changes
  useEffect(() => {
    
  }, [bookings]);

  // Should be called when the user filters or un-filters the bookings
  useEffect(() => {
    
  }, [isFiltered]);

  const loadItems = (day: DateData) => {
    console.log('Loading items for day: ' + day.dateString)

  }

  const updateBookings = () => {
    items[strTime] = [];
        
    const numItems = Math.floor(Math.random() * 3 + 1);
    for (let j = 0; j < numItems; j++) {
      items[strTime].push({
        name: 'Item for ' + strTime + ' #' + j,
        height: Math.max(50, Math.floor(Math.random() * 150)),
        day: strTime
      });
    }
    
    const newItems: AgendaSchedule = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems)
  }

  const renderItem = () => {return <View />;}
  const renderEmptyDate = () => {return <View />;}
  const rowHasChanged = () => {}
  const onDayPress = (day: DateData) => {
    
  }

  const getToday = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  return (
    <View style={styles.container}>
      <Agenda
        style={styles.agenda}
        items={items}
        loadItemsForMonth={loadItems}
        selected={getToday()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        showClosingKnob={true}
        onDayPress={onDayPress}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  agenda: {
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
