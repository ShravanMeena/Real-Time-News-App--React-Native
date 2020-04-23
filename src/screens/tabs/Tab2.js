import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {Alert, View, ActivityIndicator, ActivityIndicatorBase} from 'react-native'
import DataItem from '../../components/DataItem'
import { getArticle } from '../../service/news'
import Modal from '../../components/Modal'

export default class ListThumbnailExample extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {}
    }
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    })

  }

  handleModalClose = () => {
      this.setState({
        setModalVisible: false,
        modalArticleData: {}
      })
  }

  componentDidMount() {
    getArticle('business').then(data => {
      this.setState({
        isLoading: false,
        data: data
      }); 
    }, error => {
      Alert.alert('Error', 'Something went wrong...');
    }
    )
  }

  render() {
    console.log(this.state.data)
    let view = this.state.isLoading ? (
      <View>
        <ActivityIndicator style={{marginTop: 20}} animating={this.state.isLoading}/>
        <Text style={{marginTop: 10}}>
          Please Wait...
        </Text>
      </View>
    ) : (
       <List 
          dataArray={this.state.data} 
          renderRow={(item) => {
            return <DataItem onPress={this.handleItemDataOnPress} data={item}/>
          }}
          />
    )

    return (
      <Container>
        <Content>
         {view}
        </Content>
        <Modal 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}