import React, {Component} from 'react';
import Axios from 'axios';
import {Container, Content, CardItem, Card, Body} from 'native-base';
import {Text, Image, TouchableOpacity} from 'react-native';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const categoryId = JSON.stringify(
      navigation.getParam('categoryId', 'NO-ID'),
    );
    Axios({
      method: 'get',
      url: `http://192.168.1.32:5000/api/v1/category/${categoryId}/events`,
    }).then(res => {
      this.setState({events: res.data});
    });
  }

  render() {
    return (
      <Container>
        <Content style={{padding: 15}}>
          {this.state.events.length > 0 ? (
            this.state.events.map((event, i) => {
              return (
                <Card key={i}>
                  <CardItem>
                    <Body>
                      <Image
                        source={{uri: event.image}}
                        style={{height: 200, width: '100%', flex: 1}}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Event', {
                            eventId: event.id,
                          })
                        }>
                        <Text style={{fontSize: 30}}>{event.title}</Text>
                      </TouchableOpacity>
                      <Text>
                        {event.description.length > 200
                          ? event.description.substr(0, 200) + '...'
                          : event.description}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            })
          ) : (
            <Text>No event In This Category</Text>
          )}
        </Content>
      </Container>
    );
  }
}

export default Category;
