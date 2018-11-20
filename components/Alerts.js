import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

export default class Alerts extends React.Component {
  state = {
    longitude: null,
    latitude: null,
    text: '',
  };

  componentWillMount = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  writeAlertData = (body, location) => {
    firebase
      .database()
      .ref('alerts/')
      .push({
        body,
        location,
      })
      .then((data) => {
        console.log('data ', data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    Alert.alert('Thanks, your report has been submitted. 🙃');
  };

  sendData = () => {
    this.writeAlertData(this.state.text, {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  };

  render() {
    return (
      <View>
        <Text>Report a Bad Route</Text>
        <TextInput placeholder="Body" onChangeText={text => this.setState({ text })} />
        {this.state.text !== '' && <Button title="Submit" onPress={this.sendData} />}
      </View>
    );
  }
}