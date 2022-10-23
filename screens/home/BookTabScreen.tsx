import React, { useContext, useDebugValue, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import firebase from '../../services/firebase/FirebaseConfig'
import {getFirestore, query, where, collection, onSnapshot } from "firebase/firestore";
import { Text, View } from '../../components/Themed';
import { AuthUserContextType, Booking, RootTabScreenProps } from '../../types';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import testIDs from '../../testIDs';
import FirebaseService from '@services/firebase/FirebaseService';
import {AuthUserContext} from '@context/AuthUserContext';

export default function BookTabScreen({ navigation }: RootTabScreenProps<'BookTab'>) {
  const {userId} = useContext(AuthUserContext) as AuthUserContextType;
  const initialItems: AgendaSchedule = {}
  const [items, setItems] = useState(initialItems)
  const initialBookings: { [time: string] : Booking; }  = {}
  const [bookings, setBookings] = useState(initialBookings)
  const [isFiltered, setFiltered] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const openTime = 8
  const closeTime = 17

  // Should be called only once when component mounts
  useEffect(() => {
    setCurrentDate(getToday())
  }, []);

  // Should be called when the bookings on the day we are observing changes
  useEffect(() => {
    console.log("Bookings state updated. Num items: " + Object.keys(bookings).length);
    updateBookings(currentDate)
  }, [bookings]);

  // Should be called when the user filters or un-filters the bookings
  useEffect(() => {
    
  }, [isFiltered]);

  const loadItems = (day: DateData) => {
    console.log('Loading items for day: ' + day.dateString)
    const firestore = getFirestore(firebase);
    const startKey = day.dateString + ("00" + (openTime)).slice (-2);
    console.log('StartKey: ' + startKey)
    const endKey = day.dateString + ("00" + (closeTime)).slice (-2);
    console.log('End key: ' + endKey)
    //const bookingsQuery = query(collection(firestore, "bookings"), where("time", ">=", startKey), where("time", "<=", endKey));
    console.log('startKey < endKey: ' + startKey < endKey)
    const bookingsQuery = query(collection(firestore, "bookings"), where("time", ">=", startKey), where("time", "<=", endKey));
    const unsub = onSnapshot(bookingsQuery, (bookingsSnap) => {
      const bookings: { [time: string] : Booking; } = {}
      bookingsSnap.forEach((doc) => {
        console.log('Found booking for: ' + doc.data().time)
        bookings[doc.data().time] = {
          reference: doc.data().reference,
          time: doc.data().time,
          user: doc.data().user
        }
      });
      // console.log("Current bookings for day : ", bookings.join(", "));
      setBookings(bookings)
    });
  }

  const updateBookings = (strTime: string) => {
    items[strTime] = [];
    
    for (let j = openTime; j < closeTime; j++) {
      const key = strTime + ("00" + (j)).slice (-2);
      console.log('Checking bookings for time: ' + key)
      if (bookings[key] != undefined) {
        console.log('Found booking for time: ' + key)
        items[strTime].push({
          name: bookings[key].reference,
          height: 1,
          day: bookings[key].time
        });
      }
      else {
        const hour = ("00" + (j)).slice (-2);
        items[strTime].push({
          name: 'Item for ' + strTime + ' #' + hour,
          height: 0,
          day: strTime + hour
        });
      }
    }
    
    const newItems: AgendaSchedule = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });

    console.log('Updating agenda items')
    setItems(newItems)
  }

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = 14;
    const color = 'black';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: 50}]}
        onPress={() => availableSlotTapped(reservation)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {return <View />;}
  const rowHasChanged = () => {}
  const onDayPress = (day: DateData) => {
    
  }

  const availableSlotTapped = (reservation: AgendaEntry) => {
    Alert.prompt("Make a booking",
    "Do you want to book?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Book", onPress: reference => createBooking(reservation.day, reference)}
    ])
  }

  const createBooking = (time: string, reference?: string) => {
    if (reference != undefined) { 
      const firebaseService = new FirebaseService()
      firebaseService.createBooking(reference, time, userId)
              .then(({ ref }) => {

                  if (ref != undefined) {
                      console.log('The booking has been created')
                  }
                  else{
                      //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
                      console.log('There was an error creating the booking')
                  }
              })
    }
    
  }

  const getToday = () => {
    const date = new Date();
    const strTime = date.toISOString().split('T')[0]
    return strTime;
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
        showOnlySelectedDayItems={true}
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
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
