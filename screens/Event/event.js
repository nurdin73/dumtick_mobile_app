import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Axios from "axios";
import { Card, Container, Content, CardItem, Body, Col } from "native-base";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: []
    };
  }
  static navigationOptions = {
    title: "Events"
  };

  componentDidMount() {
    const { navigation } = this.props;
    const event_id = JSON.stringify(navigation.getParam("eventId", "NO-ID"));
    Axios({
      method: "get",
      url: `http://192.168.1.32:5000/api/v1/event/${event_id}`
    }).then(res => {
      this.setState({ event: res.data });
      console.log(this.state.event.img);
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: this.state.event.img }}
                  style={{ height: 200, width: "100%", flex: 1 }}
                />
                <Text style={{ fontSize: 30 }}>{this.state.event.title}</Text>
                <Text style={{ color: "red", fontSize: 15 }}>
                  {this.state.event.price}
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  {this.state.event.description}
                </Text>
                <Button
                  color="red"
                  title="Buy"
                  onPress={() => alert("buying")}
                />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Events;
