import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';
import  Button  from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myEmail: this.props.auth0.user.myEmail,
      books: [],
      displayAddModal:false,
    };
  }
  componentDidMount() {
    this.gitBooks();
  }
  handelDisplayModal = () =>{
    this.setState({displayAddModal:true})
  }
  gitBooks = async () => {
    try {
      const responce = await axios.get(
        `${process.env.REACT_APP_SERVER}/books?email=${this.state.myEmail}`

      );
      this.setState({
        books: responce.data[0]?.books || [],
      });
    } catch (error) {
      alert(error.message);
    }
  };
  addBook=(e)=>{
    e.preventDefault();
  
  const body = {
    myEmail:this.props.auth0.user.myEmail,
    title: e.target.bookname.value,
    description: e.target.description.value,
    status: e.target.status.value,
  };
axios.post(`${process.env.REACT_APP_SERVER}/book`,body).then(axiosResponse => {
  this.state.books.push(axiosResponse.data.books[0]);
  this.setState({
    books: this.state.books
  });
  console.log(this.state.books);
}).catch(error => alert(error));
this.setState({
  displayAddModal:false
});
  }
  removeBook=(index)=>{
    const { user } =this.props.auth0;
    const Data ={
      email:user.email,
    }
    axios.delete(`${process.env.REACT_APP_SERVER}/book/${index}}`,{params:Data})
    .then((dataResult) => {
      this.setState({
        books:dataResult.data
      })
      })
      .catch((err) => {
        alert(err);
        <h1>error happened</h1>
      })
  }
  render() {
    return (
      <div>
        <>
        <Button variant = "secondary"  onClick ={() => this.handelDisplatModal()}>Add a book</Button>
        <BookFormModal
        show={this.state.displayAddModal}
        handelDisplayModal ={this.handelDisplayModal}
        addBook={this.addBook}
        />
          <Carousel>
            {this.state.books.length > 0 &&
              this.state.books.map((book, id) => (
                <Carousel.Item ley={id}>
                  <img
                    className='d-block w-30'
                    style={{
                      height: '500px',
                      width: '700px',
                      maginLeft: '29%',
                    }}
                    src={
                      'https://t3.ftcdn.net/jpg/03/13/53/94/360_F_313539495_TIfAx53PwhMQopiuu7J1RiY2lVzSWrep.jpg'
                    }
                    alt='Book'
                  />
                  <Carousel.Caption>
                    <h3
                      style={{
                        frontSize: '25px',
                        backgroundColor: '#fff',
                        color: '#333',
                        width: '38%',
                        textAlign: 'center',
                        marginLeft: '30%',
                      }}
                    >
                      {book.title}
                    </h3>
                    <p
                      style={{
                        frontSize: '18px',
                        width: '34%',
                        textAlign: 'center',
                        marginLeft: '34%',
                      }}
                    >
                      {book.description}
                      {book.status}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>{' '}
        </>
      </div>
    );
  }
}

export default withAuth0(BestBooks);


