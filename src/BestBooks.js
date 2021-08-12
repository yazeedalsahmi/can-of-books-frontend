import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userEmail =this.props.auth0.user.userEmail,
      books = []
    }
  }

  componentDidMount(){
    this.fetchBooks()
  }
  fetchBooks = async ()=>{
    try {
      const responce = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${this.state.userEmail}`)
      this.setState({
          books: responce.data[0]?.books || []
      })
  } catch (err) {
      alert(err.message);
  }
}
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div>
          {
            this.state.books.length > 0 &&
            this.state.books.map((value, id) => {
              return (
                <div key={id}>
                  <p>Name :{value.name}</p>
                  <p>Description :{value.description}</p>
                  <p>status : {value.status}</p>
                </div>
              )
            })
          }
        </div>
        <div>
            {
              this.state.books.length > 0 &&
              this.state.books.map((value, id) => {
                return (
                  <div key={id}>
                    <p>Name :{value.name}</p>
                    <p>Description :{value.description}</p>
                    <p>status : {value.status}</p>
                  </div>
                )
              })
            }
          </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
