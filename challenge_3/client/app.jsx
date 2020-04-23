// All components go in here
// Define App and establish components in render
// At the end, render App

// App should use conditional rendering to render either:
//  1. Home page - checkout button
//  2. Form 1 - name, email, pw  - next button
//  3. Form 2 - Address (line 1, line 2, city, state, zip) and phone # - next button
//  4. Form 3 - Credit card #, expiry date, CVV, billing zip - purchase button

// Set up ajax request function, which will be passed to App as a prop and used in the body of app
const postData = (options, endpoint, successCB, errorCB = null) => {
  $.ajax({
    method: 'post',
    data: {json: JSON.stringify(options)},
    url: `http://localhost:4568/${endpoint}`,
    success: successCB,
    error: () => {
      console.log('Error posting data');
    }
  });
};


// User contact info form
const UserSignup = (props) => (

  <form id="signup-form" method="post" action="http://localhost:4568/users" onSubmit={props.onChange}>
    <label for="user">Name: </label><br></br>
    <input type="text" name="name" id="user-name"/><br></br>
    <label for="email">Email Address: </label><br></br>
    <input type="text" name="email" id="user-email"/><br></br>
    <label for="user">Password: </label><br></br>
    <input type="text" name="password" id="user-password" /><br></br>
    <input type="submit" value="Next"/>
  </form>

);

// User Address info form
const UserAddress = (props) => (

  <form id="address-form" method="post" action="http://localhost:4568/addresses">
    <label for="address1">Address Line 1: </label><br></br>
    <input type="text" name="address1" id="address-line1"/><br></br>
    <label for="address2">Address Line 2: </label><br></br>
    <input type="text" name="address2" id="address-line2"/><br></br>
    <label for="city">City: </label><br></br>
    <input type="text" name="city" id="address-city"/><br></br>
    <label for="state">State: </label><br></br>
    <input type="text" name="state" id="address-state"/><br></br>
    <label for="zip">Zip: </label><br></br>
    <input type="text" name="zip" id="address-zip"/><br></br>
    <input type="submit" value="Next" onClick={(e) => {props.onClick(e)}}/>
  </form>

);

// User credit card info form
const UserCard = (props) => (

  <form id="card-form" method="post" action="http://localhost:4568/cards">
    <label for="cardNum">Credit Card Number: </label><br></br>
    <input type="text" name="cardNum" id="card-number"/><br></br>
    <label for="expiry">Expiration Date: </label><br></br>
    <input type="text" name="expiry" id="card-expiry"/><br></br>
    <label for="security">CVV: </label><br></br>
    <input type="text" name="security" id="card-security"/><br></br>
    <label for="billingZip">Billing Zip: </label><br></br>
    <input type="text" name="billingZip" id="card-zip"/><br></br>
    <input type="submit" value="Purchase" onClick={(e) => {props.onClick(e)}}/>
  </form>

);

// Stateful class component that renders form based on state
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'home',
      id:
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  // Submits ajax request to server, and updates state with most recent mySQL insertion ID
  postToServer(options, endpoint) {

    this.props.postData(options, endpoint, (results) => {
      console.log('Logging results upon successful insertion => ', results);
    });

  }



  // Determine what page to send the user to next based on the current page
  onSubmit(event) {

    event.preventDefault();
    let nextPage;

    if (this.state.page !== 'home') {
      // Create formData object
      const form = event.target;
      let formData = new FormData(event.target);
      let endpoint;
      if (this.state.page === 'F1') {
        endpoint = 'users';
        nextPage = 'F2';
      } else if (this.state.page === 'F2') {
        endpoint = 'addresses';
        nextPage = 'F3';
      } else {
        endpoint = 'cards';
        nextPage = 'home';
      }

      let dataToPost = {};
      for (var pair of formData.entries()) {
        dataToPost[pair[0]] = pair[1];
      };

      // Send data to postToServer ajax handler, which will post to server, and update the state with the most recent insert id
      this.props.postToServer(dataToPost, endpoint);

    } else {
      nextPage = 'F1';
    }

    this.setState({
      page: nextPage
    });
  }

  render() {

    if (this.state.page === 'home') {
      return(
        <div id="home-page">
          <h1>Shop Til You Drop</h1>
          <button id="checkout-button" onClick={(e) => {this.onSubmit(e)}}>Checkout</button>
        </div>
      );
    } else if (this.state.page === 'F1') {
      return(
        <div id="user-signup">
          <UserSignup onChange={this.onSubmit} />
        </div>
      );
    } else if (this.state.page === 'F2') {
      return(
        <div id="user-address">
          <UserAddress onChange={this.onSubmit} />
        </div>
      );
    } else {
      return(
        <div id="user-card">
          <UserCard onChange={this.onSubmit} />
        </div>
      );
    }

  }

};

ReactDOM.render(
  <App postData={postData}/>,
  document.getElementById('app')
);

//







// Checkout button takes user to form 1
// Next button takes user to form 2
// Next button takes user to form 3
// Purchase button takes user to home page

// App will be a stateful class component
// 'State' will be the page that the user is currently viewing
// Event handler for button clicks
//  One central event handler
//  Will observe current state, and determine what page to set the state to next
//  ex. if state = F2, setState to F3
//      if state = F3, setState to home

// Render
//  Render method will observe the current (newly set) state, and determine which form to render
//  Form details for server/query purposes:
//    1. F1 --> action will point to users endpoint
//    2. F2 --> action will point to addresses endpoint
//    3. F3 --> action will point to cards endpoint

