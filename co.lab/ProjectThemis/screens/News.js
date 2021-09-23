import axios from 'axios';
// import {REACT_APP_API, REACT_APP_URL} from '@env';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';

export const today = new Date();

export const lastWeek = today.getDate() - 7;
export const month = today.getMonth();
export const searchQuery = {
  method: 'GET',
  url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
  params: {
    q: 'AAPI, asian-american, business, technology, politics, arts, sports, mental health',
    pageNumber: '1',
    pageSize: '15',
    autoCorrect: 'true',
    withThumbnails: 'true',
    fromPublishedDate: `2021-${month}-${lastWeek}`,
    toPublishedDate: 'null',
  },
  headers: {
    'x-rapidapi-key': '603ced2461mshfc53d2fb25a9c03p1e696ejsn5b9ef6a68053',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
  },
};

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
    };

    this.getTopNews = this.getTopNews.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  async getTopNews() {
    await axios
      .request(searchQuery)
      .then(response => {
        this.setState({
          data: response.data.value,
        });
        this.setState({isLoading: false});
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  async componentDidMount() {
    await this.getTopNews();
    console.log(this.state.data.length);
  }
  handlePress(id, title, body, source) {
    console.log('EVENT TARGET ON PRESS -->', id, title, body, source);
    // this.props.navigation.navigate('singleStory', {
    //   id,
    //   name,
    //   source,
    //   body,
    //   author,
    // });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text> Fetching your articles....</Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.articles}>
          <Text style={styles.header}>Today's</Text>
          <Text style={styles.subheader}>Top News</Text>

          {this.state.data.map((article, index) => {
            if (article.provider.name !== 'foxnews') {
              if (index < 10) {
                return (
                  <Pressable
                    key={article.id}
                    onPress={() =>
                      this.handlePress(
                        article.id,
                        article.title,
                        article.body,
                        article.provider.name,
                      )
                    }>
                    <Image
                      style={styles.image}
                      source={{uri: article.image.thumbnail}}
                    />
                    <Text style={styles.title}>{article.title}</Text>
                    <Text style={styles.date}>
                      {article.datePublished.slice(0, 10)} Source:{' '}
                      {article.provider.name}
                    </Text>
                  </Pressable>
                );
              }
            }
          })}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articles: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  header: {
    marginTop: '20%',
    justifyContent: 'center',
    fontSize: 38,
    fontWeight: '700',
  },
  subheader: {
    marginBottom: 20,
    justifyContent: 'center',
    fontSize: 38,
    fontWeight: '700',
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
  },
  date: {
    fontWeight: '300',
    color: 'grey',
    fontSize: 16,
    marginBottom: 15,
  },
  image: {
    height: 120,
    width: 150,
  },
});

export default News;
