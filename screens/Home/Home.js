import React, { Component } from "react";
import Axios from "axios";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Button,
  StyleSheet,
  Item,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { Footer } from "native-base";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      events: [],
      ongoing: []
    };
  }

  componentDidMount() {
    // style
    const date = new Date();
    let bln = date.getMonth() + 1;
    if (bln < 10) {
      bln = "0" + bln;
    } else {
      // eslint-disable-next-line no-self-assign
      bln = bln;
    }
    let hari = date.getDate();
    if (hari < 10) {
      hari = "0" + hari;
    } else {
      // eslint-disable-next-line no-self-assign
      hari = hari;
    }
    let tgl = date.getFullYear() + "-" + bln + "-" + hari;
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);
    dateEnd.setMonth(dateEnd.getMonth());
    let endBln = dateEnd.getMonth() + 1;
    if (endBln < 10) {
      endBln = "0" + endBln;
    } else {
      // eslint-disable-next-line no-self-assign
      endBln = endBln;
    }
    let hari1 = dateEnd.getDate();
    if (hari1 < 10) {
      hari1 = "0" + hari1;
    } else {
      // eslint-disable-next-line no-self-assign
      hari1 = hari1;
    }
    let endTgl = dateEnd.getFullYear() + "-" + endBln + "-" + hari1;

    let dateOngoing = new Date();
    dateOngoing.setDate(dateOngoing.getDate() + 1);
    dateOngoing.setMonth(dateOngoing.getMonth());
    let blnOngoing = dateOngoing.getMonth() + 1;
    if (blnOngoing < 10) {
      blnOngoing = "0" + blnOngoing;
    } else {
      // eslint-disable-next-line no-self-assign
      blnOngoing = blnOngoing;
    }

    let hariOngoing = dateOngoing.getDate();
    if (hariOngoing < 10) {
      hariOngoing = "0" + hariOngoing;
    } else {
      // eslint-disable-next-line no-self-assign
      hariOngoing = hariOngoing;
    }
    let onGoing =
      dateOngoing.getFullYear() + "-" + blnOngoing + "-" + hariOngoing;

    // category
    Axios({
      method: "get",
      url: "http://192.168.1.32:5000/api/v1/categories"
    }).then(res => {
      this.setState({ categories: res.data });
    });
    // event today
    Axios({
      method: "get",
      url: `http://192.168.1.32:5000/api/v1/events?start_time=${tgl}&end_time=${endTgl}`
    }).then(res => {
      this.setState({ events: res.data });
    });
    // event on going
    Axios({
      method: "get",
      url: `http://192.168.1.32:5000/api/v1/ongoing?startTime=${onGoing}`
    }).then(res => {
      this.setState({ ongoing: res.data });
    });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <FlatList
            horizontal
            style={{ marginBottom: 20 }}
            data={this.state.categories}
            renderItem={({ item: rowData }) => {
              return (
                <Card title={null} containerStyle={{ padding: 0, width: 150 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Category", {
                        categoryId: rowData.id
                      })
                    }
                  >
                    <ImageBackground
                      source={{ uri: rowData.img }}
                      style={{
                        width: "100%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 20
                        }}
                      >
                        {rowData.name}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </Card>
              );
            }}
            keyExtractor={(item, index) => index}
          />
          <Text style={{ fontSize: 30 }}>Todays Events</Text>
          {this.state.events.length > 0 ? (
            <FlatList
              horizontal
              data={this.state.events}
              style={{ marginBottom: 20 }}
              renderItem={({ item: rowData }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Event", {
                        eventId: rowData.id
                      })
                    }
                  >
                    <Card
                      title={null}
                      containerStyle={{ padding: 0, width: 260 }}
                      image={{ uri: rowData.image }}
                    >
                      <Text style={{ fontSize: 20 }}>{rowData.title}</Text>
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {rowData.price}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View
              style={{
                backgroundColor: "red",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                No Event Todays
              </Text>
            </View>
          )}
          <Text style={{ fontSize: 30 }}>OnGoing Events</Text>
          {this.state.ongoing.length > 0 ? (
            <FlatList
              horizontal
              data={this.state.ongoing}
              style={{ marginBottom: 20 }}
              renderItem={({ item: rowData }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Event", {
                        eventId: rowData.id
                      })
                    }
                  >
                    <Card
                      title={null}
                      containerStyle={{
                        padding: 0,
                        width: 280
                      }}
                      image={{ uri: rowData.image }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {rowData.title.length > 20
                          ? rowData.title.substr(0, 20) + "..."
                          : rowData.title}
                      </Text>
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {rowData.price}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View
              style={{
                backgroundColor: "red",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                No Event Todays
              </Text>
            </View>
          )}
          <Footer style={{ backgroundColor: "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: "#000", fontWeight: "bold" }}>
                CopyRight 2019
              </Text>
            </View>
          </Footer>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    height: 50
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});

export default Home;
