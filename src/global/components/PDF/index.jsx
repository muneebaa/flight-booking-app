import React from 'react';
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  Canvas,
  Font,
  View,
} from '@react-pdf/renderer';

Font.register({
  family: 'Ubuntu',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  body: { padding: 30 },
  page: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '2px solid grey',
    padding: 5,

    // alignItems: 'center',
  },
  text: {
    fontSize: 10,
    margin: 0,
    padding: 0,
    height: 20,
  },

  logo: {
    color: '#605DEC',
    fontSize: 30,
    margin: 0,
    padding: 0,
  },
  info: {
    margin: 20,
  },
});

const PDFFile = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.page}>
          <Text style={styles.logo}>GetGo</Text>
          <Text>E-Ticket</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Important Information</Text>
          <Text style={styles.text}>
            • This is your E-Ticket Iternary. You must bring it to the airport
            for check-in, and it is recommended you to retain a copy for your
            records.
          </Text>
          <Text style={styles.text}>
            • Each passenger travelling needs a printed copy of this document
            for immigrations, customs, airport security checks and duty free
            purchases.
          </Text>
          <Text style={styles.text}>
            • Economy Class passengers should report to airline check-in desks 3
            hours prior to departure of all flights. First and Business Class
            passengers should report to airline check-in desks not later than 1
            hour prior to departure. Boarding for your flight begins at least 35
            minutes before your scheduled departure time. Gates close 15 minutes
            prior to departure
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
