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
    data: { json: JSON.stringify(options) },
    url: `http://localhost:4568/${endpoint}`,
    success: successCB,
    error: () => {
      console.log('Error posting data');
    }
  });
};

// User contact info form
const UserSignup = props => React.createElement(
  'form',
  { id: 'signup-form', method: 'post', action: 'http://localhost:4568/users', onSubmit: props.onChange },
  React.createElement(
    'label',
    { 'for': 'user' },
    'Name: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'name', id: 'user-name' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'email' },
    'Email Address: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'email', id: 'user-email' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'user' },
    'Password: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'password', id: 'user-password' }),
  React.createElement('br', null),
  React.createElement('input', { type: 'submit', value: 'Next' })
);

// User Address info form
const UserAddress = props => React.createElement(
  'form',
  { id: 'address-form', method: 'post', action: 'http://localhost:4568/addresses' },
  React.createElement(
    'label',
    { 'for': 'address1' },
    'Address Line 1: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'address1', id: 'address-line1' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'address2' },
    'Address Line 2: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'address2', id: 'address-line2' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'city' },
    'City: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'city', id: 'address-city' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'state' },
    'State: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'state', id: 'address-state' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'zip' },
    'Zip: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'zip', id: 'address-zip' }),
  React.createElement('br', null),
  React.createElement('input', { type: 'submit', value: 'Next', onClick: e => {
      props.onClick(e);
    } })
);

// User credit card info form
const UserCard = props => React.createElement(
  'form',
  { id: 'card-form', method: 'post', action: 'http://localhost:4568/cards' },
  React.createElement(
    'label',
    { 'for': 'cardNum' },
    'Credit Card Number: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'cardNum', id: 'card-number' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'expiry' },
    'Expiration Date: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'expiry', id: 'card-expiry' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'security' },
    'CVV: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'security', id: 'card-security' }),
  React.createElement('br', null),
  React.createElement(
    'label',
    { 'for': 'billingZip' },
    'Billing Zip: '
  ),
  React.createElement('br', null),
  React.createElement('input', { type: 'text', name: 'billingZip', id: 'card-zip' }),
  React.createElement('br', null),
  React.createElement('input', { type: 'submit', value: 'Purchase', onClick: e => {
      props.onClick(e);
    } })
);

// Stateful class component that renders form based on state
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'home'
    };

    this.onSubmit = this.onSubmit.bind(this);
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

      console.log('Logging form elements => ', form.elements);

      // let dataToPost = {};
      // form.elements.forEach(input => {
      //   dataToPost[input.name] = formData.get(input.name);
      // });

      let dataToPost = {};
      for (var pair of formData.entries()) {
        dataToPost[pair[0]] = pair[1];
      };

      console.log('Did I do it? => ', dataToPost);

      postData(dataToPost, endpoint, () => {
        console.log('AY!');
      });
    } else {
      nextPage = 'F1';
    }

    this.setState({
      page: nextPage
    });
  }

  render() {

    if (this.state.page === 'home') {
      return React.createElement(
        'div',
        { id: 'home-page' },
        React.createElement(
          'h1',
          null,
          'Shop Til You Drop'
        ),
        React.createElement(
          'button',
          { id: 'checkout-button', onClick: e => {
              this.onSubmit(e);
            } },
          'Checkout'
        )
      );
    } else if (this.state.page === 'F1') {
      return React.createElement(
        'div',
        { id: 'user-signup' },
        React.createElement(UserSignup, { onChange: this.onSubmit })
      );
    } else if (this.state.page === 'F2') {
      return React.createElement(
        'div',
        { id: 'user-address' },
        React.createElement(UserAddress, { onChange: this.onSubmit })
      );
    } else {
      return React.createElement(
        'div',
        { id: 'user-card' },
        React.createElement(UserCard, { onChange: this.onSubmit })
      );
    }
  }

};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbInBvc3REYXRhIiwib3B0aW9ucyIsImVuZHBvaW50Iiwic3VjY2Vzc0NCIiwiZXJyb3JDQiIsIiQiLCJhamF4IiwibWV0aG9kIiwiZGF0YSIsImpzb24iLCJKU09OIiwic3RyaW5naWZ5IiwidXJsIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIlVzZXJTaWdudXAiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiVXNlckFkZHJlc3MiLCJlIiwib25DbGljayIsIlVzZXJDYXJkIiwiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInN0YXRlIiwicGFnZSIsIm9uU3VibWl0IiwiYmluZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJuZXh0UGFnZSIsImZvcm0iLCJ0YXJnZXQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZWxlbWVudHMiLCJkYXRhVG9Qb3N0IiwicGFpciIsImVudHJpZXMiLCJzZXRTdGF0ZSIsInJlbmRlciIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNQSxXQUFXLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUFvQkMsU0FBcEIsRUFBK0JDLFVBQVUsSUFBekMsS0FBa0Q7QUFDakVDLElBQUVDLElBQUYsQ0FBTztBQUNMQyxZQUFRLE1BREg7QUFFTEMsVUFBTSxFQUFDQyxNQUFNQyxLQUFLQyxTQUFMLENBQWVWLE9BQWYsQ0FBUCxFQUZEO0FBR0xXLFNBQU0seUJBQXdCVixRQUFTLEVBSGxDO0FBSUxXLGFBQVNWLFNBSko7QUFLTFcsV0FBTyxNQUFNO0FBQ1hDLGNBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUNEO0FBUEksR0FBUDtBQVNELENBVkQ7O0FBY0E7QUFDQSxNQUFNQyxhQUFjQyxLQUFELElBRWpCO0FBQUE7QUFBQSxJQUFNLElBQUcsYUFBVCxFQUF1QixRQUFPLE1BQTlCLEVBQXFDLFFBQU8sNkJBQTVDLEVBQTBFLFVBQVVBLE1BQU1DLFFBQTFGO0FBQ0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxNQUFYO0FBQUE7QUFBQSxHQURGO0FBQ2tDLGlDQURsQztBQUVFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE1BQXhCLEVBQStCLElBQUcsV0FBbEMsR0FGRjtBQUVpRCxpQ0FGakQ7QUFHRTtBQUFBO0FBQUEsTUFBTyxPQUFJLE9BQVg7QUFBQTtBQUFBLEdBSEY7QUFHNEMsaUNBSDVDO0FBSUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssT0FBeEIsRUFBZ0MsSUFBRyxZQUFuQyxHQUpGO0FBSW1ELGlDQUpuRDtBQUtFO0FBQUE7QUFBQSxNQUFPLE9BQUksTUFBWDtBQUFBO0FBQUEsR0FMRjtBQUtzQyxpQ0FMdEM7QUFNRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxJQUFHLGVBQXRDLEdBTkY7QUFNMEQsaUNBTjFEO0FBT0UsaUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sTUFBM0I7QUFQRixDQUZGOztBQWNBO0FBQ0EsTUFBTUMsY0FBZUYsS0FBRCxJQUVsQjtBQUFBO0FBQUEsSUFBTSxJQUFHLGNBQVQsRUFBd0IsUUFBTyxNQUEvQixFQUFzQyxRQUFPLGlDQUE3QztBQUNFO0FBQUE7QUFBQSxNQUFPLE9BQUksVUFBWDtBQUFBO0FBQUEsR0FERjtBQUNnRCxpQ0FEaEQ7QUFFRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxJQUFHLGVBQXRDLEdBRkY7QUFFeUQsaUNBRnpEO0FBR0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxVQUFYO0FBQUE7QUFBQSxHQUhGO0FBR2dELGlDQUhoRDtBQUlFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLFVBQXhCLEVBQW1DLElBQUcsZUFBdEMsR0FKRjtBQUl5RCxpQ0FKekQ7QUFLRTtBQUFBO0FBQUEsTUFBTyxPQUFJLE1BQVg7QUFBQTtBQUFBLEdBTEY7QUFLa0MsaUNBTGxDO0FBTUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssTUFBeEIsRUFBK0IsSUFBRyxjQUFsQyxHQU5GO0FBTW9ELGlDQU5wRDtBQU9FO0FBQUE7QUFBQSxNQUFPLE9BQUksT0FBWDtBQUFBO0FBQUEsR0FQRjtBQU9vQyxpQ0FQcEM7QUFRRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxPQUF4QixFQUFnQyxJQUFHLGVBQW5DLEdBUkY7QUFRc0QsaUNBUnREO0FBU0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxLQUFYO0FBQUE7QUFBQSxHQVRGO0FBU2dDLGlDQVRoQztBQVVFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLEtBQXhCLEVBQThCLElBQUcsYUFBakMsR0FWRjtBQVVrRCxpQ0FWbEQ7QUFXRSxpQ0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxNQUEzQixFQUFrQyxTQUFVRyxDQUFELElBQU87QUFBQ0gsWUFBTUksT0FBTixDQUFjRCxDQUFkO0FBQWlCLEtBQXBFO0FBWEYsQ0FGRjs7QUFrQkE7QUFDQSxNQUFNRSxXQUFZTCxLQUFELElBRWY7QUFBQTtBQUFBLElBQU0sSUFBRyxXQUFULEVBQXFCLFFBQU8sTUFBNUIsRUFBbUMsUUFBTyw2QkFBMUM7QUFDRTtBQUFBO0FBQUEsTUFBTyxPQUFJLFNBQVg7QUFBQTtBQUFBLEdBREY7QUFDbUQsaUNBRG5EO0FBRUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssU0FBeEIsRUFBa0MsSUFBRyxhQUFyQyxHQUZGO0FBRXNELGlDQUZ0RDtBQUdFO0FBQUE7QUFBQSxNQUFPLE9BQUksUUFBWDtBQUFBO0FBQUEsR0FIRjtBQUcrQyxpQ0FIL0M7QUFJRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxRQUF4QixFQUFpQyxJQUFHLGFBQXBDLEdBSkY7QUFJcUQsaUNBSnJEO0FBS0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxVQUFYO0FBQUE7QUFBQSxHQUxGO0FBS3FDLGlDQUxyQztBQU1FLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLFVBQXhCLEVBQW1DLElBQUcsZUFBdEMsR0FORjtBQU15RCxpQ0FOekQ7QUFPRTtBQUFBO0FBQUEsTUFBTyxPQUFJLFlBQVg7QUFBQTtBQUFBLEdBUEY7QUFPK0MsaUNBUC9DO0FBUUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssWUFBeEIsRUFBcUMsSUFBRyxVQUF4QyxHQVJGO0FBUXNELGlDQVJ0RDtBQVNFLGlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFVBQTNCLEVBQXNDLFNBQVVHLENBQUQsSUFBTztBQUFDSCxZQUFNSSxPQUFOLENBQWNELENBQWQ7QUFBaUIsS0FBeEU7QUFURixDQUZGOztBQWdCQTtBQUNBLE1BQU1HLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZVCxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47O0FBRUEsU0FBS1UsS0FBTCxHQUFhO0FBQ1hDLFlBQU07QUFESyxLQUFiOztBQUlBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQW5CLENBQWhCO0FBQ0Q7O0FBR0Q7QUFDQUQsV0FBU0UsS0FBVCxFQUFnQjs7QUFFZEEsVUFBTUMsY0FBTjtBQUNBLFFBQUlDLFFBQUo7O0FBRUEsUUFBSSxLQUFLTixLQUFMLENBQVdDLElBQVgsS0FBb0IsTUFBeEIsRUFBZ0M7QUFDOUI7QUFDQSxZQUFNTSxPQUFPSCxNQUFNSSxNQUFuQjtBQUNBLFVBQUlDLFdBQVcsSUFBSUMsUUFBSixDQUFhTixNQUFNSSxNQUFuQixDQUFmO0FBQ0EsVUFBSWxDLFFBQUo7QUFDQSxVQUFJLEtBQUswQixLQUFMLENBQVdDLElBQVgsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUIzQixtQkFBVyxPQUFYO0FBQ0FnQyxtQkFBVyxJQUFYO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBS04sS0FBTCxDQUFXQyxJQUFYLEtBQW9CLElBQXhCLEVBQThCO0FBQ25DM0IsbUJBQVcsV0FBWDtBQUNBZ0MsbUJBQVcsSUFBWDtBQUNELE9BSE0sTUFHQTtBQUNMaEMsbUJBQVcsT0FBWDtBQUNBZ0MsbUJBQVcsTUFBWDtBQUNEOztBQUVEbkIsY0FBUUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDbUIsS0FBS0ksUUFBOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBSUMsYUFBYSxFQUFqQjtBQUNBLFdBQUssSUFBSUMsSUFBVCxJQUFpQkosU0FBU0ssT0FBVCxFQUFqQixFQUFxQztBQUNuQ0YsbUJBQVdDLEtBQUssQ0FBTCxDQUFYLElBQXNCQSxLQUFLLENBQUwsQ0FBdEI7QUFDRDs7QUFFRDFCLGNBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ3dCLFVBQWhDOztBQUVBeEMsZUFBU3dDLFVBQVQsRUFBcUJ0QyxRQUFyQixFQUErQixNQUFNO0FBQ25DYSxnQkFBUUMsR0FBUixDQUFZLEtBQVo7QUFDRCxPQUZEO0FBSUQsS0FsQ0QsTUFrQ087QUFDTGtCLGlCQUFXLElBQVg7QUFDRDs7QUFFRCxTQUFLUyxRQUFMLENBQWM7QUFDWmQsWUFBTUs7QUFETSxLQUFkO0FBR0Q7O0FBRURVLFdBQVM7O0FBRVAsUUFBSSxLQUFLaEIsS0FBTCxDQUFXQyxJQUFYLEtBQW9CLE1BQXhCLEVBQWdDO0FBQzlCLGFBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxXQUFSO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQVEsSUFBRyxpQkFBWCxFQUE2QixTQUFVUixDQUFELElBQU87QUFBQyxtQkFBS1MsUUFBTCxDQUFjVCxDQUFkO0FBQWlCLGFBQS9EO0FBQUE7QUFBQTtBQUZGLE9BREY7QUFNRCxLQVBELE1BT08sSUFBSSxLQUFLTyxLQUFMLENBQVdDLElBQVgsS0FBb0IsSUFBeEIsRUFBOEI7QUFDbkMsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGFBQVI7QUFDRSw0QkFBQyxVQUFELElBQVksVUFBVSxLQUFLQyxRQUEzQjtBQURGLE9BREY7QUFLRCxLQU5NLE1BTUEsSUFBSSxLQUFLRixLQUFMLENBQVdDLElBQVgsS0FBb0IsSUFBeEIsRUFBOEI7QUFDbkMsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGNBQVI7QUFDRSw0QkFBQyxXQUFELElBQWEsVUFBVSxLQUFLQyxRQUE1QjtBQURGLE9BREY7QUFLRCxLQU5NLE1BTUE7QUFDTCxhQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcsV0FBUjtBQUNFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUtBLFFBQXpCO0FBREYsT0FERjtBQUtEO0FBRUY7O0FBMUYrQixDQTRGakM7O0FBRURlLFNBQVNELE1BQVQsQ0FDRSxvQkFBQyxHQUFELE9BREYsRUFFRUUsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQUtBOzs7QUFRQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQWxsIGNvbXBvbmVudHMgZ28gaW4gaGVyZVxuLy8gRGVmaW5lIEFwcCBhbmQgZXN0YWJsaXNoIGNvbXBvbmVudHMgaW4gcmVuZGVyXG4vLyBBdCB0aGUgZW5kLCByZW5kZXIgQXBwXG5cbi8vIEFwcCBzaG91bGQgdXNlIGNvbmRpdGlvbmFsIHJlbmRlcmluZyB0byByZW5kZXIgZWl0aGVyOlxuLy8gIDEuIEhvbWUgcGFnZSAtIGNoZWNrb3V0IGJ1dHRvblxuLy8gIDIuIEZvcm0gMSAtIG5hbWUsIGVtYWlsLCBwdyAgLSBuZXh0IGJ1dHRvblxuLy8gIDMuIEZvcm0gMiAtIEFkZHJlc3MgKGxpbmUgMSwgbGluZSAyLCBjaXR5LCBzdGF0ZSwgemlwKSBhbmQgcGhvbmUgIyAtIG5leHQgYnV0dG9uXG4vLyAgNC4gRm9ybSAzIC0gQ3JlZGl0IGNhcmQgIywgZXhwaXJ5IGRhdGUsIENWViwgYmlsbGluZyB6aXAgLSBwdXJjaGFzZSBidXR0b25cblxuLy8gU2V0IHVwIGFqYXggcmVxdWVzdCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gQXBwIGFzIGEgcHJvcCBhbmQgdXNlZCBpbiB0aGUgYm9keSBvZiBhcHBcbmNvbnN0IHBvc3REYXRhID0gKG9wdGlvbnMsIGVuZHBvaW50LCBzdWNjZXNzQ0IsIGVycm9yQ0IgPSBudWxsKSA9PiB7XG4gICQuYWpheCh7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgZGF0YToge2pzb246IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpfSxcbiAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjQ1NjgvJHtlbmRwb2ludH1gLFxuICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NDQixcbiAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHBvc3RpbmcgZGF0YScpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8gVXNlciBjb250YWN0IGluZm8gZm9ybVxuY29uc3QgVXNlclNpZ251cCA9IChwcm9wcykgPT4gKFxuXG4gIDxmb3JtIGlkPVwic2lnbnVwLWZvcm1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiaHR0cDovL2xvY2FsaG9zdDo0NTY4L3VzZXJzXCIgb25TdWJtaXQ9e3Byb3BzLm9uQ2hhbmdlfT5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPk5hbWU6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBpZD1cInVzZXItbmFtZVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZGRyZXNzOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwidXNlci1lbWFpbFwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPlBhc3N3b3JkOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIC8+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIi8+XG4gIDwvZm9ybT5cblxuKTtcblxuLy8gVXNlciBBZGRyZXNzIGluZm8gZm9ybVxuY29uc3QgVXNlckFkZHJlc3MgPSAocHJvcHMpID0+IChcblxuICA8Zm9ybSBpZD1cImFkZHJlc3MtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCJodHRwOi8vbG9jYWxob3N0OjQ1NjgvYWRkcmVzc2VzXCI+XG4gICAgPGxhYmVsIGZvcj1cImFkZHJlc3MxXCI+QWRkcmVzcyBMaW5lIDE6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MxXCIgaWQ9XCJhZGRyZXNzLWxpbmUxXCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJhZGRyZXNzMlwiPkFkZHJlc3MgTGluZSAyOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMlwiIGlkPVwiYWRkcmVzcy1saW5lMlwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPkNpdHk6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBpZD1cImFkZHJlc3MtY2l0eVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwic3RhdGVcIj5TdGF0ZTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdGVcIiBpZD1cImFkZHJlc3Mtc3RhdGVcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cInppcFwiPlppcDogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiemlwXCIgaWQ9XCJhZGRyZXNzLXppcFwiLz48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIG9uQ2xpY2s9eyhlKSA9PiB7cHJvcHMub25DbGljayhlKX19Lz5cbiAgPC9mb3JtPlxuXG4pO1xuXG4vLyBVc2VyIGNyZWRpdCBjYXJkIGluZm8gZm9ybVxuY29uc3QgVXNlckNhcmQgPSAocHJvcHMpID0+IChcblxuICA8Zm9ybSBpZD1cImNhcmQtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCJodHRwOi8vbG9jYWxob3N0OjQ1NjgvY2FyZHNcIj5cbiAgICA8bGFiZWwgZm9yPVwiY2FyZE51bVwiPkNyZWRpdCBDYXJkIE51bWJlcjogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZE51bVwiIGlkPVwiY2FyZC1udW1iZXJcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cImV4cGlyeVwiPkV4cGlyYXRpb24gRGF0ZTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwaXJ5XCIgaWQ9XCJjYXJkLWV4cGlyeVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwic2VjdXJpdHlcIj5DVlY6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5XCIgaWQ9XCJjYXJkLXNlY3VyaXR5XCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJiaWxsaW5nWmlwXCI+QmlsbGluZyBaaXA6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJpbGxpbmdaaXBcIiBpZD1cImNhcmQtemlwXCIvPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJQdXJjaGFzZVwiIG9uQ2xpY2s9eyhlKSA9PiB7cHJvcHMub25DbGljayhlKX19Lz5cbiAgPC9mb3JtPlxuXG4pO1xuXG4vLyBTdGF0ZWZ1bCBjbGFzcyBjb21wb25lbnQgdGhhdCByZW5kZXJzIGZvcm0gYmFzZWQgb24gc3RhdGVcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6ICdob21lJ1xuICAgIH07XG5cbiAgICB0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG5cblxuICAvLyBEZXRlcm1pbmUgd2hhdCBwYWdlIHRvIHNlbmQgdGhlIHVzZXIgdG8gbmV4dCBiYXNlZCBvbiB0aGUgY3VycmVudCBwYWdlXG4gIG9uU3VibWl0KGV2ZW50KSB7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuZXh0UGFnZTtcblxuICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgIT09ICdob21lJykge1xuICAgICAgLy8gQ3JlYXRlIGZvcm1EYXRhIG9iamVjdFxuICAgICAgY29uc3QgZm9ybSA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpO1xuICAgICAgbGV0IGVuZHBvaW50O1xuICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gJ0YxJykge1xuICAgICAgICBlbmRwb2ludCA9ICd1c2Vycyc7XG4gICAgICAgIG5leHRQYWdlID0gJ0YyJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnRjInKSB7XG4gICAgICAgIGVuZHBvaW50ID0gJ2FkZHJlc3Nlcyc7XG4gICAgICAgIG5leHRQYWdlID0gJ0YzJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZHBvaW50ID0gJ2NhcmRzJztcbiAgICAgICAgbmV4dFBhZ2UgPSAnaG9tZSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKCdMb2dnaW5nIGZvcm0gZWxlbWVudHMgPT4gJywgZm9ybS5lbGVtZW50cyk7XG5cbiAgICAgIC8vIGxldCBkYXRhVG9Qb3N0ID0ge307XG4gICAgICAvLyBmb3JtLmVsZW1lbnRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgLy8gICBkYXRhVG9Qb3N0W2lucHV0Lm5hbWVdID0gZm9ybURhdGEuZ2V0KGlucHV0Lm5hbWUpO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIGxldCBkYXRhVG9Qb3N0ID0ge307XG4gICAgICBmb3IgKHZhciBwYWlyIG9mIGZvcm1EYXRhLmVudHJpZXMoKSkge1xuICAgICAgICBkYXRhVG9Qb3N0W3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKCdEaWQgSSBkbyBpdD8gPT4gJywgZGF0YVRvUG9zdCk7XG5cbiAgICAgIHBvc3REYXRhKGRhdGFUb1Bvc3QsIGVuZHBvaW50LCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBWSEnKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRQYWdlID0gJ0YxJztcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2U6IG5leHRQYWdlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnaG9tZScpIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtcGFnZVwiPlxuICAgICAgICAgIDxoMT5TaG9wIFRpbCBZb3UgRHJvcDwvaDE+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImNoZWNrb3V0LWJ1dHRvblwiIG9uQ2xpY2s9eyhlKSA9PiB7dGhpcy5vblN1Ym1pdChlKX19PkNoZWNrb3V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gJ0YxJykge1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGlkPVwidXNlci1zaWdudXBcIj5cbiAgICAgICAgICA8VXNlclNpZ251cCBvbkNoYW5nZT17dGhpcy5vblN1Ym1pdH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnRjInKSB7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxkaXYgaWQ9XCJ1c2VyLWFkZHJlc3NcIj5cbiAgICAgICAgICA8VXNlckFkZHJlc3Mgb25DaGFuZ2U9e3RoaXMub25TdWJtaXR9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGlkPVwidXNlci1jYXJkXCI+XG4gICAgICAgICAgPFVzZXJDYXJkIG9uQ2hhbmdlPXt0aGlzLm9uU3VibWl0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cbi8vXG5cblxuXG5cblxuXG5cbi8vIENoZWNrb3V0IGJ1dHRvbiB0YWtlcyB1c2VyIHRvIGZvcm0gMVxuLy8gTmV4dCBidXR0b24gdGFrZXMgdXNlciB0byBmb3JtIDJcbi8vIE5leHQgYnV0dG9uIHRha2VzIHVzZXIgdG8gZm9ybSAzXG4vLyBQdXJjaGFzZSBidXR0b24gdGFrZXMgdXNlciB0byBob21lIHBhZ2VcblxuLy8gQXBwIHdpbGwgYmUgYSBzdGF0ZWZ1bCBjbGFzcyBjb21wb25lbnRcbi8vICdTdGF0ZScgd2lsbCBiZSB0aGUgcGFnZSB0aGF0IHRoZSB1c2VyIGlzIGN1cnJlbnRseSB2aWV3aW5nXG4vLyBFdmVudCBoYW5kbGVyIGZvciBidXR0b24gY2xpY2tzXG4vLyAgT25lIGNlbnRyYWwgZXZlbnQgaGFuZGxlclxuLy8gIFdpbGwgb2JzZXJ2ZSBjdXJyZW50IHN0YXRlLCBhbmQgZGV0ZXJtaW5lIHdoYXQgcGFnZSB0byBzZXQgdGhlIHN0YXRlIHRvIG5leHRcbi8vICBleC4gaWYgc3RhdGUgPSBGMiwgc2V0U3RhdGUgdG8gRjNcbi8vICAgICAgaWYgc3RhdGUgPSBGMywgc2V0U3RhdGUgdG8gaG9tZVxuXG4vLyBSZW5kZXJcbi8vICBSZW5kZXIgbWV0aG9kIHdpbGwgb2JzZXJ2ZSB0aGUgY3VycmVudCAobmV3bHkgc2V0KSBzdGF0ZSwgYW5kIGRldGVybWluZSB3aGljaCBmb3JtIHRvIHJlbmRlclxuLy8gIEZvcm0gZGV0YWlscyBmb3Igc2VydmVyL3F1ZXJ5IHB1cnBvc2VzOlxuLy8gICAgMS4gRjEgLS0+IGFjdGlvbiB3aWxsIHBvaW50IHRvIHVzZXJzIGVuZHBvaW50XG4vLyAgICAyLiBGMiAtLT4gYWN0aW9uIHdpbGwgcG9pbnQgdG8gYWRkcmVzc2VzIGVuZHBvaW50XG4vLyAgICAzLiBGMyAtLT4gYWN0aW9uIHdpbGwgcG9pbnQgdG8gY2FyZHMgZW5kcG9pbnRcblxuIl19