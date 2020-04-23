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

      let dataToPost = {};
      for (var pair of formData.entries()) {
        dataToPost[pair[0]] = pair[1];
      };

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

ReactDOM.render(React.createElement(App, { postData: postData }), document.getElementById('app'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbInBvc3REYXRhIiwib3B0aW9ucyIsImVuZHBvaW50Iiwic3VjY2Vzc0NCIiwiZXJyb3JDQiIsIiQiLCJhamF4IiwibWV0aG9kIiwiZGF0YSIsImpzb24iLCJKU09OIiwic3RyaW5naWZ5IiwidXJsIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIlVzZXJTaWdudXAiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiVXNlckFkZHJlc3MiLCJlIiwib25DbGljayIsIlVzZXJDYXJkIiwiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInN0YXRlIiwicGFnZSIsIm9uU3VibWl0IiwiYmluZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJuZXh0UGFnZSIsImZvcm0iLCJ0YXJnZXQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZGF0YVRvUG9zdCIsInBhaXIiLCJlbnRyaWVzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTUEsV0FBVyxDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBb0JDLFNBQXBCLEVBQStCQyxVQUFVLElBQXpDLEtBQWtEO0FBQ2pFQyxJQUFFQyxJQUFGLENBQU87QUFDTEMsWUFBUSxNQURIO0FBRUxDLFVBQU0sRUFBQ0MsTUFBTUMsS0FBS0MsU0FBTCxDQUFlVixPQUFmLENBQVAsRUFGRDtBQUdMVyxTQUFNLHlCQUF3QlYsUUFBUyxFQUhsQztBQUlMVyxhQUFTVixTQUpKO0FBS0xXLFdBQU8sTUFBTTtBQUNYQyxjQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDRDtBQVBJLEdBQVA7QUFTRCxDQVZEOztBQWFBO0FBQ0EsTUFBTUMsYUFBY0MsS0FBRCxJQUVqQjtBQUFBO0FBQUEsSUFBTSxJQUFHLGFBQVQsRUFBdUIsUUFBTyxNQUE5QixFQUFxQyxRQUFPLDZCQUE1QyxFQUEwRSxVQUFVQSxNQUFNQyxRQUExRjtBQUNFO0FBQUE7QUFBQSxNQUFPLE9BQUksTUFBWDtBQUFBO0FBQUEsR0FERjtBQUNrQyxpQ0FEbEM7QUFFRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxNQUF4QixFQUErQixJQUFHLFdBQWxDLEdBRkY7QUFFaUQsaUNBRmpEO0FBR0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxPQUFYO0FBQUE7QUFBQSxHQUhGO0FBRzRDLGlDQUg1QztBQUlFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE9BQXhCLEVBQWdDLElBQUcsWUFBbkMsR0FKRjtBQUltRCxpQ0FKbkQ7QUFLRTtBQUFBO0FBQUEsTUFBTyxPQUFJLE1BQVg7QUFBQTtBQUFBLEdBTEY7QUFLc0MsaUNBTHRDO0FBTUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssVUFBeEIsRUFBbUMsSUFBRyxlQUF0QyxHQU5GO0FBTTBELGlDQU4xRDtBQU9FLGlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLE1BQTNCO0FBUEYsQ0FGRjs7QUFjQTtBQUNBLE1BQU1DLGNBQWVGLEtBQUQsSUFFbEI7QUFBQTtBQUFBLElBQU0sSUFBRyxjQUFULEVBQXdCLFFBQU8sTUFBL0IsRUFBc0MsUUFBTyxpQ0FBN0M7QUFDRTtBQUFBO0FBQUEsTUFBTyxPQUFJLFVBQVg7QUFBQTtBQUFBLEdBREY7QUFDZ0QsaUNBRGhEO0FBRUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssVUFBeEIsRUFBbUMsSUFBRyxlQUF0QyxHQUZGO0FBRXlELGlDQUZ6RDtBQUdFO0FBQUE7QUFBQSxNQUFPLE9BQUksVUFBWDtBQUFBO0FBQUEsR0FIRjtBQUdnRCxpQ0FIaEQ7QUFJRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxJQUFHLGVBQXRDLEdBSkY7QUFJeUQsaUNBSnpEO0FBS0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxNQUFYO0FBQUE7QUFBQSxHQUxGO0FBS2tDLGlDQUxsQztBQU1FLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE1BQXhCLEVBQStCLElBQUcsY0FBbEMsR0FORjtBQU1vRCxpQ0FOcEQ7QUFPRTtBQUFBO0FBQUEsTUFBTyxPQUFJLE9BQVg7QUFBQTtBQUFBLEdBUEY7QUFPb0MsaUNBUHBDO0FBUUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssT0FBeEIsRUFBZ0MsSUFBRyxlQUFuQyxHQVJGO0FBUXNELGlDQVJ0RDtBQVNFO0FBQUE7QUFBQSxNQUFPLE9BQUksS0FBWDtBQUFBO0FBQUEsR0FURjtBQVNnQyxpQ0FUaEM7QUFVRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxLQUF4QixFQUE4QixJQUFHLGFBQWpDLEdBVkY7QUFVa0QsaUNBVmxEO0FBV0UsaUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sTUFBM0IsRUFBa0MsU0FBVUcsQ0FBRCxJQUFPO0FBQUNILFlBQU1JLE9BQU4sQ0FBY0QsQ0FBZDtBQUFpQixLQUFwRTtBQVhGLENBRkY7O0FBa0JBO0FBQ0EsTUFBTUUsV0FBWUwsS0FBRCxJQUVmO0FBQUE7QUFBQSxJQUFNLElBQUcsV0FBVCxFQUFxQixRQUFPLE1BQTVCLEVBQW1DLFFBQU8sNkJBQTFDO0FBQ0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxTQUFYO0FBQUE7QUFBQSxHQURGO0FBQ21ELGlDQURuRDtBQUVFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLFNBQXhCLEVBQWtDLElBQUcsYUFBckMsR0FGRjtBQUVzRCxpQ0FGdEQ7QUFHRTtBQUFBO0FBQUEsTUFBTyxPQUFJLFFBQVg7QUFBQTtBQUFBLEdBSEY7QUFHK0MsaUNBSC9DO0FBSUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssUUFBeEIsRUFBaUMsSUFBRyxhQUFwQyxHQUpGO0FBSXFELGlDQUpyRDtBQUtFO0FBQUE7QUFBQSxNQUFPLE9BQUksVUFBWDtBQUFBO0FBQUEsR0FMRjtBQUtxQyxpQ0FMckM7QUFNRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxJQUFHLGVBQXRDLEdBTkY7QUFNeUQsaUNBTnpEO0FBT0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxZQUFYO0FBQUE7QUFBQSxHQVBGO0FBTytDLGlDQVAvQztBQVFFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLFlBQXhCLEVBQXFDLElBQUcsVUFBeEMsR0FSRjtBQVFzRCxpQ0FSdEQ7QUFTRSxpQ0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxVQUEzQixFQUFzQyxTQUFVRyxDQUFELElBQU87QUFBQ0gsWUFBTUksT0FBTixDQUFjRCxDQUFkO0FBQWlCLEtBQXhFO0FBVEYsQ0FGRjs7QUFnQkE7QUFDQSxNQUFNRyxHQUFOLFNBQWtCQyxNQUFNQyxTQUF4QixDQUFrQztBQUNoQ0MsY0FBWVQsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOOztBQUVBLFNBQUtVLEtBQUwsR0FBYTtBQUNYQyxZQUFNO0FBREssS0FBYjs7QUFJQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNEOztBQUdEO0FBQ0FELFdBQVNFLEtBQVQsRUFBZ0I7O0FBRWRBLFVBQU1DLGNBQU47QUFDQSxRQUFJQyxRQUFKOztBQUVBLFFBQUksS0FBS04sS0FBTCxDQUFXQyxJQUFYLEtBQW9CLE1BQXhCLEVBQWdDO0FBQzlCO0FBQ0EsWUFBTU0sT0FBT0gsTUFBTUksTUFBbkI7QUFDQSxVQUFJQyxXQUFXLElBQUlDLFFBQUosQ0FBYU4sTUFBTUksTUFBbkIsQ0FBZjtBQUNBLFVBQUlsQyxRQUFKO0FBQ0EsVUFBSSxLQUFLMEIsS0FBTCxDQUFXQyxJQUFYLEtBQW9CLElBQXhCLEVBQThCO0FBQzVCM0IsbUJBQVcsT0FBWDtBQUNBZ0MsbUJBQVcsSUFBWDtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtOLEtBQUwsQ0FBV0MsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUNuQzNCLG1CQUFXLFdBQVg7QUFDQWdDLG1CQUFXLElBQVg7QUFDRCxPQUhNLE1BR0E7QUFDTGhDLG1CQUFXLE9BQVg7QUFDQWdDLG1CQUFXLE1BQVg7QUFDRDs7QUFFRCxVQUFJSyxhQUFhLEVBQWpCO0FBQ0EsV0FBSyxJQUFJQyxJQUFULElBQWlCSCxTQUFTSSxPQUFULEVBQWpCLEVBQXFDO0FBQ25DRixtQkFBV0MsS0FBSyxDQUFMLENBQVgsSUFBc0JBLEtBQUssQ0FBTCxDQUF0QjtBQUNEOztBQUVEeEMsZUFBU3VDLFVBQVQsRUFBcUJyQyxRQUFyQixFQUErQixNQUFNO0FBQ25DYSxnQkFBUUMsR0FBUixDQUFZLEtBQVo7QUFDRCxPQUZEO0FBSUQsS0F6QkQsTUF5Qk87QUFDTGtCLGlCQUFXLElBQVg7QUFDRDs7QUFFRCxTQUFLUSxRQUFMLENBQWM7QUFDWmIsWUFBTUs7QUFETSxLQUFkO0FBR0Q7O0FBRURTLFdBQVM7O0FBRVAsUUFBSSxLQUFLZixLQUFMLENBQVdDLElBQVgsS0FBb0IsTUFBeEIsRUFBZ0M7QUFDOUIsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLFdBQVI7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBUSxJQUFHLGlCQUFYLEVBQTZCLFNBQVVSLENBQUQsSUFBTztBQUFDLG1CQUFLUyxRQUFMLENBQWNULENBQWQ7QUFBaUIsYUFBL0Q7QUFBQTtBQUFBO0FBRkYsT0FERjtBQU1ELEtBUEQsTUFPTyxJQUFJLEtBQUtPLEtBQUwsQ0FBV0MsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUNuQyxhQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcsYUFBUjtBQUNFLDRCQUFDLFVBQUQsSUFBWSxVQUFVLEtBQUtDLFFBQTNCO0FBREYsT0FERjtBQUtELEtBTk0sTUFNQSxJQUFJLEtBQUtGLEtBQUwsQ0FBV0MsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUNuQyxhQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcsY0FBUjtBQUNFLDRCQUFDLFdBQUQsSUFBYSxVQUFVLEtBQUtDLFFBQTVCO0FBREYsT0FERjtBQUtELEtBTk0sTUFNQTtBQUNMLGFBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxXQUFSO0FBQ0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBS0EsUUFBekI7QUFERixPQURGO0FBS0Q7QUFFRjs7QUFqRitCLENBbUZqQzs7QUFFRGMsU0FBU0QsTUFBVCxDQUNFLG9CQUFDLEdBQUQsSUFBSyxVQUFVM0MsUUFBZixHQURGLEVBRUU2QyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBRkY7O0FBS0E7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbGwgY29tcG9uZW50cyBnbyBpbiBoZXJlXG4vLyBEZWZpbmUgQXBwIGFuZCBlc3RhYmxpc2ggY29tcG9uZW50cyBpbiByZW5kZXJcbi8vIEF0IHRoZSBlbmQsIHJlbmRlciBBcHBcblxuLy8gQXBwIHNob3VsZCB1c2UgY29uZGl0aW9uYWwgcmVuZGVyaW5nIHRvIHJlbmRlciBlaXRoZXI6XG4vLyAgMS4gSG9tZSBwYWdlIC0gY2hlY2tvdXQgYnV0dG9uXG4vLyAgMi4gRm9ybSAxIC0gbmFtZSwgZW1haWwsIHB3ICAtIG5leHQgYnV0dG9uXG4vLyAgMy4gRm9ybSAyIC0gQWRkcmVzcyAobGluZSAxLCBsaW5lIDIsIGNpdHksIHN0YXRlLCB6aXApIGFuZCBwaG9uZSAjIC0gbmV4dCBidXR0b25cbi8vICA0LiBGb3JtIDMgLSBDcmVkaXQgY2FyZCAjLCBleHBpcnkgZGF0ZSwgQ1ZWLCBiaWxsaW5nIHppcCAtIHB1cmNoYXNlIGJ1dHRvblxuXG4vLyBTZXQgdXAgYWpheCByZXF1ZXN0IGZ1bmN0aW9uLCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBBcHAgYXMgYSBwcm9wIGFuZCB1c2VkIGluIHRoZSBib2R5IG9mIGFwcFxuY29uc3QgcG9zdERhdGEgPSAob3B0aW9ucywgZW5kcG9pbnQsIHN1Y2Nlc3NDQiwgZXJyb3JDQiA9IG51bGwpID0+IHtcbiAgJC5hamF4KHtcbiAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICBkYXRhOiB7anNvbjogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9LFxuICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6NDU2OC8ke2VuZHBvaW50fWAsXG4gICAgc3VjY2Vzczogc3VjY2Vzc0NCLFxuICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgcG9zdGluZyBkYXRhJyk7XG4gICAgfVxuICB9KTtcbn07XG5cblxuLy8gVXNlciBjb250YWN0IGluZm8gZm9ybVxuY29uc3QgVXNlclNpZ251cCA9IChwcm9wcykgPT4gKFxuXG4gIDxmb3JtIGlkPVwic2lnbnVwLWZvcm1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiaHR0cDovL2xvY2FsaG9zdDo0NTY4L3VzZXJzXCIgb25TdWJtaXQ9e3Byb3BzLm9uQ2hhbmdlfT5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPk5hbWU6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBpZD1cInVzZXItbmFtZVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZGRyZXNzOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwidXNlci1lbWFpbFwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPlBhc3N3b3JkOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiIC8+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIi8+XG4gIDwvZm9ybT5cblxuKTtcblxuLy8gVXNlciBBZGRyZXNzIGluZm8gZm9ybVxuY29uc3QgVXNlckFkZHJlc3MgPSAocHJvcHMpID0+IChcblxuICA8Zm9ybSBpZD1cImFkZHJlc3MtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCJodHRwOi8vbG9jYWxob3N0OjQ1NjgvYWRkcmVzc2VzXCI+XG4gICAgPGxhYmVsIGZvcj1cImFkZHJlc3MxXCI+QWRkcmVzcyBMaW5lIDE6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MxXCIgaWQ9XCJhZGRyZXNzLWxpbmUxXCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJhZGRyZXNzMlwiPkFkZHJlc3MgTGluZSAyOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMlwiIGlkPVwiYWRkcmVzcy1saW5lMlwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPkNpdHk6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBpZD1cImFkZHJlc3MtY2l0eVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwic3RhdGVcIj5TdGF0ZTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdGVcIiBpZD1cImFkZHJlc3Mtc3RhdGVcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cInppcFwiPlppcDogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiemlwXCIgaWQ9XCJhZGRyZXNzLXppcFwiLz48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIG9uQ2xpY2s9eyhlKSA9PiB7cHJvcHMub25DbGljayhlKX19Lz5cbiAgPC9mb3JtPlxuXG4pO1xuXG4vLyBVc2VyIGNyZWRpdCBjYXJkIGluZm8gZm9ybVxuY29uc3QgVXNlckNhcmQgPSAocHJvcHMpID0+IChcblxuICA8Zm9ybSBpZD1cImNhcmQtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCJodHRwOi8vbG9jYWxob3N0OjQ1NjgvY2FyZHNcIj5cbiAgICA8bGFiZWwgZm9yPVwiY2FyZE51bVwiPkNyZWRpdCBDYXJkIE51bWJlcjogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZE51bVwiIGlkPVwiY2FyZC1udW1iZXJcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cImV4cGlyeVwiPkV4cGlyYXRpb24gRGF0ZTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwaXJ5XCIgaWQ9XCJjYXJkLWV4cGlyeVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwic2VjdXJpdHlcIj5DVlY6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5XCIgaWQ9XCJjYXJkLXNlY3VyaXR5XCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJiaWxsaW5nWmlwXCI+QmlsbGluZyBaaXA6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJpbGxpbmdaaXBcIiBpZD1cImNhcmQtemlwXCIvPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJQdXJjaGFzZVwiIG9uQ2xpY2s9eyhlKSA9PiB7cHJvcHMub25DbGljayhlKX19Lz5cbiAgPC9mb3JtPlxuXG4pO1xuXG4vLyBTdGF0ZWZ1bCBjbGFzcyBjb21wb25lbnQgdGhhdCByZW5kZXJzIGZvcm0gYmFzZWQgb24gc3RhdGVcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6ICdob21lJ1xuICAgIH07XG5cbiAgICB0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG5cblxuICAvLyBEZXRlcm1pbmUgd2hhdCBwYWdlIHRvIHNlbmQgdGhlIHVzZXIgdG8gbmV4dCBiYXNlZCBvbiB0aGUgY3VycmVudCBwYWdlXG4gIG9uU3VibWl0KGV2ZW50KSB7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuZXh0UGFnZTtcblxuICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgIT09ICdob21lJykge1xuICAgICAgLy8gQ3JlYXRlIGZvcm1EYXRhIG9iamVjdFxuICAgICAgY29uc3QgZm9ybSA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpO1xuICAgICAgbGV0IGVuZHBvaW50O1xuICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gJ0YxJykge1xuICAgICAgICBlbmRwb2ludCA9ICd1c2Vycyc7XG4gICAgICAgIG5leHRQYWdlID0gJ0YyJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnRjInKSB7XG4gICAgICAgIGVuZHBvaW50ID0gJ2FkZHJlc3Nlcyc7XG4gICAgICAgIG5leHRQYWdlID0gJ0YzJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZHBvaW50ID0gJ2NhcmRzJztcbiAgICAgICAgbmV4dFBhZ2UgPSAnaG9tZSc7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhVG9Qb3N0ID0ge307XG4gICAgICBmb3IgKHZhciBwYWlyIG9mIGZvcm1EYXRhLmVudHJpZXMoKSkge1xuICAgICAgICBkYXRhVG9Qb3N0W3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICAgIH07XG5cbiAgICAgIHBvc3REYXRhKGRhdGFUb1Bvc3QsIGVuZHBvaW50LCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBWSEnKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRQYWdlID0gJ0YxJztcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2U6IG5leHRQYWdlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnaG9tZScpIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtcGFnZVwiPlxuICAgICAgICAgIDxoMT5TaG9wIFRpbCBZb3UgRHJvcDwvaDE+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImNoZWNrb3V0LWJ1dHRvblwiIG9uQ2xpY2s9eyhlKSA9PiB7dGhpcy5vblN1Ym1pdChlKX19PkNoZWNrb3V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gJ0YxJykge1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGlkPVwidXNlci1zaWdudXBcIj5cbiAgICAgICAgICA8VXNlclNpZ251cCBvbkNoYW5nZT17dGhpcy5vblN1Ym1pdH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnRjInKSB7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxkaXYgaWQ9XCJ1c2VyLWFkZHJlc3NcIj5cbiAgICAgICAgICA8VXNlckFkZHJlc3Mgb25DaGFuZ2U9e3RoaXMub25TdWJtaXR9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGlkPVwidXNlci1jYXJkXCI+XG4gICAgICAgICAgPFVzZXJDYXJkIG9uQ2hhbmdlPXt0aGlzLm9uU3VibWl0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8QXBwIHBvc3REYXRhPXtwb3N0RGF0YX0vPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4pO1xuXG4vL1xuXG5cblxuXG5cblxuXG4vLyBDaGVja291dCBidXR0b24gdGFrZXMgdXNlciB0byBmb3JtIDFcbi8vIE5leHQgYnV0dG9uIHRha2VzIHVzZXIgdG8gZm9ybSAyXG4vLyBOZXh0IGJ1dHRvbiB0YWtlcyB1c2VyIHRvIGZvcm0gM1xuLy8gUHVyY2hhc2UgYnV0dG9uIHRha2VzIHVzZXIgdG8gaG9tZSBwYWdlXG5cbi8vIEFwcCB3aWxsIGJlIGEgc3RhdGVmdWwgY2xhc3MgY29tcG9uZW50XG4vLyAnU3RhdGUnIHdpbGwgYmUgdGhlIHBhZ2UgdGhhdCB0aGUgdXNlciBpcyBjdXJyZW50bHkgdmlld2luZ1xuLy8gRXZlbnQgaGFuZGxlciBmb3IgYnV0dG9uIGNsaWNrc1xuLy8gIE9uZSBjZW50cmFsIGV2ZW50IGhhbmRsZXJcbi8vICBXaWxsIG9ic2VydmUgY3VycmVudCBzdGF0ZSwgYW5kIGRldGVybWluZSB3aGF0IHBhZ2UgdG8gc2V0IHRoZSBzdGF0ZSB0byBuZXh0XG4vLyAgZXguIGlmIHN0YXRlID0gRjIsIHNldFN0YXRlIHRvIEYzXG4vLyAgICAgIGlmIHN0YXRlID0gRjMsIHNldFN0YXRlIHRvIGhvbWVcblxuLy8gUmVuZGVyXG4vLyAgUmVuZGVyIG1ldGhvZCB3aWxsIG9ic2VydmUgdGhlIGN1cnJlbnQgKG5ld2x5IHNldCkgc3RhdGUsIGFuZCBkZXRlcm1pbmUgd2hpY2ggZm9ybSB0byByZW5kZXJcbi8vICBGb3JtIGRldGFpbHMgZm9yIHNlcnZlci9xdWVyeSBwdXJwb3Nlczpcbi8vICAgIDEuIEYxIC0tPiBhY3Rpb24gd2lsbCBwb2ludCB0byB1c2VycyBlbmRwb2ludFxuLy8gICAgMi4gRjIgLS0+IGFjdGlvbiB3aWxsIHBvaW50IHRvIGFkZHJlc3NlcyBlbmRwb2ludFxuLy8gICAgMy4gRjMgLS0+IGFjdGlvbiB3aWxsIHBvaW50IHRvIGNhcmRzIGVuZHBvaW50XG5cbiJdfQ==