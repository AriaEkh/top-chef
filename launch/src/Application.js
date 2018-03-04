import React, { Component } from 'react';
import './Application.css';
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';
import { ProgressBar } from 'react-fetch-progressbar';
import Table from './Table.js'

setOriginalFetch(window.fetch);
window.fetch = progressBarFetch;
class Application extends Component {
  constructor(){
    super();
    this.state = { restaurants : []}
  }

  componentDidMount(){
    fetch('/api/restaurants')
    .then(resul => resul.json())
    .then(json => {
      this.setState({restaurants : json})
      console.log(this.state.restaurants)  
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <ProgressBar/>
      <div className="jumbotron">
        <h1 className="display-4">Promotion Finder </h1>
        <p className="lead">Promotion finder from the website : lafourchette.com</p>
        <hr className="my-4"/>
        <h2 className="display-4">Promotions :</h2>
        <Table restaurants = {this.state.restaurants}/>
      </div>
      </div>
        );
  }
}

export default Application;