import React, { useContext, useDebugValue, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import firebase from '../../services/firebase/FirebaseConfig'
import {getFirestore, query, where, collection, onSnapshot } from "firebase/firestore";
import { Text, View } from '../../components/Themed';
import { AuthUserContextType, Booking, NewAgenda, RootTabScreenProps } from '../../types';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import testIDs from '../../testIDs';
import FirebaseService from '@services/firebase/FirebaseService';
import {AuthUserContext} from '@context/AuthUserContext';
import { FontAwesome } from '@expo/vector-icons';
import Colors from 'constants/Colors';

export default function BookTabScreen({ navigation }: RootTabScreenProps<'BookTab'>) {
  const {userId} = useContext(AuthUserContext) as AuthUserContextType;
  const initialItems: AgendaSchedule = {}
  const [items, setItems] = useState(initialItems)
  const initialBookings: { [time: number] : Booking; } = {}
  const [bookings, setBookings] = useState(initialBookings)
  const [isFiltered, setFiltered] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const openTime = 8
  const closeTime = 17

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Pressable
        onPress={() => headerPressed()}
        >
          <FontAwesome
            name="filter"
            size={25}
            style={{ marginRight: 15, color: isFiltered ? 'red' : 'white' }}
          />
        </Pressable>
      ),
    });
  }, [navigation, isFiltered]);

  // Should be called only once when component mounts
  useEffect(() => {
    console.log("LIFECYCLE: Component Mounted");
    setCurrentDate(new Date())
  }, []);

  // Should be called when the bookings on the day we are observing changes
  useEffect(() => {
    const currentStrTime = currentDate.toISOString().split('T')[0]
    console.log("LIFECYCLE: Bookings state updated. Current Date: " + currentStrTime + " Num items: " + Object.keys(bookings).length);
    updateBookings(currentStrTime)
  }, [bookings]);

  // Should be called when the user filters or un-filters the bookings
  useEffect(() => {
    console.log("LIFECYCLE: Filter state updated");
    const currentStrTime = currentDate.toISOString().split('T')[0]
    updateBookings(currentStrTime)
  }, [isFiltered]);

  // Should be called when the user filters or un-filters the bookings
  useEffect(() => {
    console.log("LIFECYCLE: Current date updated");
  }, [currentDate]);

  const headerPressed = () => {
    console.log("HeaderButton Pressed");
    setFiltered(isFiltered => !isFiltered)
  }

  const loadItems = (day: DateData) => {
    console.log('Should load items for day: ' + day.dateString)
    // For some reason, the Agenda tries to load a random past date
    // This logic only happens if we have expressively set currentDate when the user presses a day
    console.log('Loading items for day: ' + day.dateString)
    const firestore = getFirestore(firebase);

    const date = new Date(day.timestamp)
    console.log('Todays date: ' + date.toDateString())
    const startKey = getTimeKey(date, openTime)
    console.log('StartKey: ' + startKey)

    const endKey = getTimeKey(date, closeTime)
    console.log('End key: ' + endKey)

    //console.log('startKey < endKey: ' + startKey < endKey)
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
      console.log("Current bookings for day : ", Object.keys(bookings).length);
      setBookings(bookings)
    });
  }

  const updateBookings = (strTime: string) => {
    //console.log("Updating bookings for strTime : ", strTime);
    //console.log("Updating bookings for day : ", currentDate.toString());
    items[strTime] = [];
    
    for (let j = openTime; j < closeTime; j++) {
      const key = getTimeKey(currentDate, j);
      console.log('Checking bookings for time: ' + key)
      if (bookings[key] != undefined) {
        console.log('Found booking for time: ' + key)
        items[strTime].push({
          name: bookings[key].reference,
          height: bookings[key].time,
          day: bookings[key].user
        });
      }
      else if (!isFiltered) {
        const hour = ("00" + (j)).slice (-2);
        const endHour = ("00" + (j + 1)).slice (-2);
        items[strTime].push({
          name: 'Book from ' + hour + "h to " + endHour + "h " + key,
          height: key,
          day: ""
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
    const height = 70;

    if (reservation.day == "")
    {
      return (
        <TouchableOpacity
          testID={testIDs.agenda.ITEM}
          style={[styles.item, {height: height, opacity: 1}]}
          onPress={() => availableSlotTapped(reservation)}
        >
          <Text style={{fontSize, color}}>{reservation.name}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity
          testID={testIDs.agenda.ITEM}
          style={[styles.item, {height: height, opacity: 0.5}]}
          onPress={() => bookedSlotTapped(reservation)}
        >
          <Text style={{fontSize, color}}>Reference: {reservation.name}</Text>
          {/* <Text style={{fontSize, color}}>User: {reservation.day}</Text> */}
        </TouchableOpacity>
      );
    }
  }

  const renderEmptyDate = () => {return <View />;}
  const rowHasChanged = () => {}
  const onDayPress = (day: DateData) => {
    console.log('Day pressed')
    setCurrentDate(new Date(day.timestamp))
  }

  const availableSlotTapped = (reservation: AgendaEntry) => {
    Alert.prompt("Make a booking",
    "Enter a reference for your booking",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Book", onPress: reference => createBooking(reservation.height, reference)}
    ])
  }

  const bookedSlotTapped = (reservation: AgendaEntry) => {
    if (userId == reservation.day)
    {
      Alert.prompt("Edit a booking reference",
    "Do you want to change your booking reference?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Confirm", onPress: reference => editBooking(reservation.height, reference)}
    ])
    }
  }

  const createBooking = (time: number, reference?: string) => {
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
              }).catch(({ error }) => {
                console.log('There was an error creating the booking: ' + error)
              })
    }
  }

  const editBooking = (time: number, reference?: string) => {
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
              }).catch(({ error }) => {
                console.log('There was an error creating the booking: ' + error)
              })
    }
  }

  const getToday = () => {
    const date = new Date();
    const strTime = date.toISOString().split('T')[0]
    return strTime;
  }

  const getTimeKey = (date: Date, hour: number) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    //console.log('GetMonth: ' + month)
    const day = date.getDate()
    //console.log('GetDay: ' + day)
    const timeKey = year * 1000000 + month * 10000 + day * 100 + hour
    return timeKey
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
        theme={{
          backgroundColor: '#000000',
          calendarBackground: '#000000',
          agendaDayTextColor: '#CF0E20',
          agendaTodayColor: '#CF0E20',
          //textSectionTitleColor: '#b6c1cd',
          // textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#CF0E20',
          // selectedDayTextColor: '#ffffff',
          todayTextColor: '#CF0E20',
          dayTextColor: 'white',
          // textDisabledColor: '#d9e1e8',
          // dotColor: '#00adf5',
          // selectedDotColor: '#ffffff',
          // arrowColor: 'orange',
          // disabledArrowColor: '#d9e1e8',
          monthTextColor: 'white',
          // indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16
        }}
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
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: 'white'
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
    backgroundColor: '#000000'
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
