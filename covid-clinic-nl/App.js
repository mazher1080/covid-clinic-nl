import React, { Component } from 'react';
import { TouchableOpacity, Button, TextInput, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-number-input';
import { DatePicker } from 'react-native-woodpicker';


export default class App extends Component {
  state = {
    pickedDate: new Date(),
    modalVisible: true,
    modalScreen: 0,
    markers: [
      {
        title: 'Mount Pearl Senior High [Mount Pearl]',
        waittime: '65 mins',
        latlng: {
          latitude: 47.516395,
          longitude: -52.822152,
        },
      },
      {
        title: 'Clarenville Senior High [Clarenville]',
        waittime: '15 mins',
        latlng: {
          latitude: 48.160418,
          longitude: -53.982871,
        },
      },
      {
        title: 'Danny Cleary Harbour Grace Community Centre [Harbour Grace]',
        waittime: '15 mins',
        latlng: {
          latitude: 47.676103,
          longitude: -53.264986,
        },
      },
      {
        title: 'St. Theresa\'s Elementary [St. John\'s]',
        waittime: '60 mins',
        latlng: {
          latitude: 47.546318,
          longitude: -52.749328,
        },
      },
      {
        title: 'College of the North Atlantic [Burin]',
        waittime: '15 mins',
        latlng: {
          latitude: 47.098095,
          longitude: -55.196295,
        },
      },
      {
        title: 'College of the North Atlantic [Gander]',
        waittime: '15 mins',
        latlng: {
          latitude: 48.960993,
          longitude: -54.634844,
        },
      },
      {
        title: 'Corduroy Brook Nature Centre [Grand Falls-Windsor]',
        waittime: '15 mins',
        latlng: {
          latitude: 48.956521,
          longitude: -55.64591,
        },
      },
      {
        title: 'Corner Brook Civic Centre [Corner Brook]',
        waittime: '15 mins',
        latlng: {
          latitude: 48.939606,
          longitude: -57.940462,
        },
      },
      {
        title: 'Bay St. George Medical Clinic [Stephenville]',
        waittime: '15 mins',
        latlng: {
          latitude: 48.559012,
          longitude: -58.5823,
        },
      },
    ]
  };
  
  _renderButton = (text, onPress, style) => (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <View>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  handlePlaceholder = () =>
    this.state.pickedDate
      ? this.state.pickedDate.toDateString()
      : "No date selected";

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{ flexDirection: 'row' }}>
        {
          (this.state.modalScreen == 0) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Welcome to the COVID-19 Self Assessment Survey {"\n\n"}
                  Press next to continue.
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 1) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Are you experiencing any of the following:   {"\n\n"}
                  - Difficulty breathing                         {"\n"}
                  - Chest pain                                 {"\n"}
                  - Feeling confused                           {"\n"}
                  - Blacking out                               {"\n"}
                  - Fever                                      {"\n"}
                  - Cough
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 2) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Are you experiencing two or more of the following symptoms?   {"\n\n"}
                  - Runny nose                                                  {"\n"}
                  - Sore throat                                                 {"\n"}
                  - Headache                                                    {"\n"}
                  - Loss of senses                                              {"\n"}
                  - Fatigue                                                     {"\n"}
                  - Muscle aches
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 3) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Are you a rotational worker who has travelled within Canada to another Province or Territory in the past 14 days?
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 4) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Have you travelled outside the province to a COVID-19 affected area in the last 14 days?
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 5) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Have you had contact with a person who tested positive for COVID-19?
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 6) ?
            (
              <View style={{ flex: 1 }}>
                <Text>
                  Since you do not have any symptoms, you do not need to be tested for COVID-19.
                </Text>
              </View>
            ) :
          (this.state.modalScreen == 7) ?
            (
              <View style={{ flex: 1 }}>
                <Text>Full Name:</Text>
                <TextInput
                  backgroundColor="#ecf0f1"
                />

                <Text>Age:</Text>
                <TextInput
                  keyboardType="number-pad"
                  backgroundColor="#ecf0f1"
                />

                <Text>Phone Number:</Text>
                <PhoneInput
                  defaultCode="CA"
                />

                <Text>Date:</Text>
                <DatePicker
                  minDate={new Date()}
                  onDateChange={(data) => { this.setState({ pickedDate: data }) }}
                  value={this.state.pickedDate}
                  title="Date Picker"
                  placeholder={this.handlePlaceholder()}
                  androidPickerMode="spinner"
                  style={{
                    margin: 12,
                  }}
                />
              </View>
            ) :
          (
            <View style={{ flex: 1 }}>
              <Text>
                Your appointment request has been sent. You will receive a follow up call soon.
              </Text>
            </View>
          )
        }
        {
          (this.state.modalScreen > 0) ?
            (this.state.modalScreen < 6) ?
              this._renderButton('Yes', () => this.setState({ modalScreen: 7 })) :
              null :
            this._renderButton('Next', () => this.setState({ modalScreen: 1 }))
        }
        {
          (this.state.modalScreen > 0 && this.state.modalScreen < 6) ?
            this._renderButton('No', () => this.setState({ modalScreen: this.state.modalScreen + 1 })) :
            null
        }
      </View>
      <View style={{ flexDirection: 'row' }}>
        {
          (this.state.modalScreen == 7) ?
            this._renderButton('Schedule', () => this.setState({ modalScreen: this.state.modalScreen + 1 })) :
            null
        }
        {
          this._renderButton('Close', () => this.setState({ modalVisible: false }), {  })
        }
      </View>
    </View>
  );

  reshowModal = () => {
    this.setState({
      modalVisible: true,
      modalScreen: 0,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => { this.setState({ modalVisible: false }) }}
          backdropOpacity={0}
          avoidKeyboard={false}
        >
          {this._renderModalContent()}
        </Modal>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: 47.561508,
            longitude: -52.712578,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0421,
          }}
        >
          {
            this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={"Wait time: " + marker.waittime}
              />
            ))
          }
        </MapView>
        <View style={{ flex: 1, position: 'absolute', bottom: '2%', right: '2%' }}>
          <TouchableOpacity
            onPress={this.reshowModal}
            style={styles.footerButton}
          >
            <View style={{ flexDirection: 'row', }}>
              <Icon
                name="calendar-question"
                size={32}
              />
              <Text
                style={{ marginTop: '5%' }}
              >
                Self Assessment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
  },
  mapStyle: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#FF8D74',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
  footerButton: {
    flexDirection: 'row',
    backgroundColor: '#FF8D74',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
})
