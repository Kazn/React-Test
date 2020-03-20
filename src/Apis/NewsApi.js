import httpService from "../services/HttpService";
const topHeadlinemoduleKey = "top-headlines?country=us&apiKey=";
const selectedKeylinemoduleKey = "everything?q=";
const apikey ="1bdb8928f6fb4adca1e1d1d601250d6e"
import moment from 'moment';

export function getNews(keyWord) {

  const service = new httpService();
  var url =''
  if(keyWord==null){
    url = 'https://newsapi.org/v2/'+topHeadlinemoduleKey+apikey

  }else{
    url = "http://newsapi.org/v2/"+selectedKeylinemoduleKey+keyWord+"&from="+moment(new Date()).format("YYYY-MM-DD")+"&sortBy=popularity&apiKey="+apikey
  }
  let req = service.get(url);

  return req;
}

