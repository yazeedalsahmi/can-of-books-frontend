import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import newBookForm from './newBookForm';
import Button from 'react-bootstrap/Button';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail =this.props.auth0.user.userEmail,
      books =[],
      displayAddModal: false,
    }
  }
  handelDisplayModal = () => {
    this.setState({ displayAddModal: true });
  }

  componentDidMount() {
    this.fetchBooks()
  }
  fetchBooks = async () => {
    try {
      const responce = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${this.state.userEmail}`)
      this.setState({
        books: responce.data[0]?.books || []
      })
    } catch (err) {
      alert(err.message);
    }
  }
  addNewBook = (e) => {
    e.preventDefault();

    const body = {
      email: this.props.auth0.user.email,
      title: e.target.bookName.value,
      description: e.target.description.value,
      status: e.target.status.value,
    };

    axios.post(`${process.env.REACT_APP_SERVER}/books`, body).then(axiosResponse => {
      this.state.books.push(axiosResponse.data.books[0]);
      this.setState({
        books: this.state.books

      })

    }).catch(error => alert(error));
    this.setState({ displayAddModal: false });
  }


  deleteBook = (index) => {
    const { user } = this.props.auth0;

    const Data = {
      email: user.email,
    }
    axios
      .delete(`${process.env.REACT_APP_SERVER}/books/${index}`, { params: Data })
      .then((dataResult) => {
        this.setState({
          books: dataResult.data
        })
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div>
        <Button variant="secondary" onClick={() => this.handelDisplayModal()}>Add new book </Button>
        <newBookForm 
                 show={this.state.displayAddModal}
                 handelDisplayModal={this.handelDisplayModal}
                 addBook={this.addBook}
                /> 

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
           <div key={i}>
                    <Button variant="outline-danger" onClick={() => this.deleteBook(i)}>Delete this book</Button>
                    </div>
        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
