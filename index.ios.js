/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

var NetworkInfo = require('react-native-network-info');
var Button = require('react-native-button');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

import { header, interest, knowledge } from 'semantic-internet-protocol'

var AwsomeProject = React.createClass({
  getInitialState: function() {
    return { data: '', ip: '', remote: '192.168.0.2', socket: false, content: 'iphone' };
  },

  componentDidMount: function() {
    NetworkInfo.getIPAddress(ip => this.setState({ ip }))
  },

  buttonClicked: function() {
    var socket = io('http://'+ this.state.remote +':5442');
    this.setState({data: ''})

    const bodyStr   = knowledge.serialize({ vocabulary: '', infoContent: this.state.content })
    const headerStr = header.serialize({version: 1.0, contentLength: bodyStr.length, command: 'expose'})

    socket.emit('expose', headerStr + bodyStr);
    socket.on('interest', data => this.setState({data}));
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.ip}>
          { this.state.ip }
        </Text>
        <TextInput
          style={{height: 40, textAlign: 'center'}}
          placeholder='remote ip adress'
          autoFocus={false}
          onChangeText={(remote) => this.setState({remote})}
          value={this.state.remote}
        />
        <TextInput
          style={{height: 40, textAlign: 'center'}}
          placeholder='content'
          autoFocus={true}
          onChangeText={(content) => this.setState({content})}
          value={this.state.content}
        />
        <Button
          style={styles.button} onPress={this.buttonClicked.bind(this)}>
          Send!
        </Button>
        <Text style={styles.instructions}>
          {this.state.data}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
  },
  ip: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwsomeProject', () => AwsomeProject);
