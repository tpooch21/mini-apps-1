// All components go in here
// Define App and establish components in render
// At the end, render App

// App should use conditional rendering to render either:
//  1. Home page - checkout button
//  2. Form 1 - name, email, pw  - next button
//  3. Form 2 - Address (line 1, line 2, city, state, zip) and phone # - next button
//  4. Form 3 - Credit card #, expiry date, CVV, billing zip - purchase button

const UserSignup = props => React.createElement(
  "form",
  { id: "signup-form", method: "post", action: "http://localhost:4568/users" },
  React.createElement(
    "label",
    { "for": "user" },
    "Name: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "name", id: "user-name" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "email" },
    "Email Address: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "email", id: "user-email" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "user" },
    "Password: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "password", id: "user-password" }),
  React.createElement("br", null),
  React.createElement("input", { type: "submit", value: "Next", onClick: e => {
      props.onClick(e);
    } })
);

const UserAddress = props => React.createElement(
  "form",
  { id: "address-form", method: "post", action: "http://localhost:4568/addresses" },
  React.createElement(
    "label",
    { "for": "address1" },
    "Address Line 1: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "address1", id: "address-line1" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "address2" },
    "Address Line 2: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "address2", id: "address-line2" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "city" },
    "City: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "city", id: "address-city" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "state" },
    "State: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "state", id: "address-state" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "zip" },
    "Zip: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "zip", id: "address-zip" }),
  React.createElement("br", null),
  React.createElement("input", { type: "submit", value: "Next", onClick: e => {
      props.onClick(e);
    } })
);

const UserCard = props => React.createElement(
  "form",
  { id: "card-form", method: "post", action: "http://localhost:4568/cards" },
  React.createElement(
    "label",
    { "for": "cardNum" },
    "Credit Card Number: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "cardNum", id: "card-number" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "expiry" },
    "Expiration Date: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "expiry", id: "card-expiry" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "security" },
    "CVV: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "security", id: "card-security" }),
  React.createElement("br", null),
  React.createElement(
    "label",
    { "for": "billingZip" },
    "Billing Zip: "
  ),
  React.createElement("br", null),
  React.createElement("input", { type: "text", name: "billingZip", id: "card-zip" }),
  React.createElement("br", null),
  React.createElement("input", { type: "submit", value: "Purchase", onClick: e => {
      props.onClick(e);
    } })
);

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
    // event.preventDefault();
    console.log('In here');

    let nextPage;

    if (this.state.page === 'home') {
      nextPage = 'F1';
    } else if (this.state.page === 'F1') {
      nextPage = 'F2';
    } else if (this.state.page === 'F2') {
      nextPage = 'F3';
    } else {
      nextPage = 'home';
    }

    this.setState({
      page: nextPage
    });
  }

  render() {

    if (this.state.page === 'home') {
      return React.createElement(
        "div",
        { id: "home-page" },
        React.createElement(
          "h1",
          null,
          "Shop Til You Drop"
        ),
        React.createElement(
          "button",
          { id: "checkout-button", onClick: e => {
              this.onSubmit(e);
            } },
          "Checkout"
        )
      );
    } else if (this.state.page === 'F1') {
      return React.createElement(
        "div",
        { id: "user-signup" },
        React.createElement(UserSignup, { onClick: this.onSubmit })
      );
    } else if (this.state.page === 'F2') {
      return React.createElement(
        "div",
        { id: "user-address" },
        React.createElement(UserAddress, { onClick: this.onSubmit })
      );
    } else {
      return React.createElement(
        "div",
        { id: "user-card" },
        React.createElement(UserCard, { onClick: this.onSubmit })
      );
    }
  }

};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIlVzZXJTaWdudXAiLCJwcm9wcyIsImUiLCJvbkNsaWNrIiwiVXNlckFkZHJlc3MiLCJVc2VyQ2FyZCIsIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJzdGF0ZSIsInBhZ2UiLCJvblN1Ym1pdCIsImJpbmQiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJuZXh0UGFnZSIsInNldFN0YXRlIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxhQUFjQyxLQUFELElBRWpCO0FBQUE7QUFBQSxJQUFNLElBQUcsYUFBVCxFQUF1QixRQUFPLE1BQTlCLEVBQXFDLFFBQU8sNkJBQTVDO0FBQ0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxNQUFYO0FBQUE7QUFBQSxHQURGO0FBQ2tDLGlDQURsQztBQUVFLGlDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE1BQXhCLEVBQStCLElBQUcsV0FBbEMsR0FGRjtBQUVpRCxpQ0FGakQ7QUFHRTtBQUFBO0FBQUEsTUFBTyxPQUFJLE9BQVg7QUFBQTtBQUFBLEdBSEY7QUFHNEMsaUNBSDVDO0FBSUUsaUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssT0FBeEIsRUFBZ0MsSUFBRyxZQUFuQyxHQUpGO0FBSW1ELGlDQUpuRDtBQUtFO0FBQUE7QUFBQSxNQUFPLE9BQUksTUFBWDtBQUFBO0FBQUEsR0FMRjtBQUtzQyxpQ0FMdEM7QUFNRSxpQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxJQUFHLGVBQXRDLEdBTkY7QUFNeUQsaUNBTnpEO0FBT0UsaUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sTUFBM0IsRUFBa0MsU0FBVUMsQ0FBRCxJQUFPO0FBQUNELFlBQU1FLE9BQU4sQ0FB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QUFLQyxRQUEzQjtBQURGLE9BREY7QUFLRCxLQU5NLE1BTUE7QUFDTCxhQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcsV0FBUjtBQUNFLDRCQUFDLFFBQUQsSUFBVSxTQUFTLEtBQUtBLFFBQXhCO0FBREYsT0FERjtBQUtEO0FBRUY7O0FBL0QrQixDQWlFakM7O0FBRURRLFNBQVNELE1BQVQsQ0FDRSxvQkFBQyxHQUFELE9BREYsRUFFRUUsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQVNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbGwgY29tcG9uZW50cyBnbyBpbiBoZXJlXG4vLyBEZWZpbmUgQXBwIGFuZCBlc3RhYmxpc2ggY29tcG9uZW50cyBpbiByZW5kZXJcbi8vIEF0IHRoZSBlbmQsIHJlbmRlciBBcHBcblxuLy8gQXBwIHNob3VsZCB1c2UgY29uZGl0aW9uYWwgcmVuZGVyaW5nIHRvIHJlbmRlciBlaXRoZXI6XG4vLyAgMS4gSG9tZSBwYWdlIC0gY2hlY2tvdXQgYnV0dG9uXG4vLyAgMi4gRm9ybSAxIC0gbmFtZSwgZW1haWwsIHB3ICAtIG5leHQgYnV0dG9uXG4vLyAgMy4gRm9ybSAyIC0gQWRkcmVzcyAobGluZSAxLCBsaW5lIDIsIGNpdHksIHN0YXRlLCB6aXApIGFuZCBwaG9uZSAjIC0gbmV4dCBidXR0b25cbi8vICA0LiBGb3JtIDMgLSBDcmVkaXQgY2FyZCAjLCBleHBpcnkgZGF0ZSwgQ1ZWLCBiaWxsaW5nIHppcCAtIHB1cmNoYXNlIGJ1dHRvblxuXG5jb25zdCBVc2VyU2lnbnVwID0gKHByb3BzKSA9PiAoXG5cbiAgPGZvcm0gaWQ9XCJzaWdudXAtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBhY3Rpb249XCJodHRwOi8vbG9jYWxob3N0OjQ1NjgvdXNlcnNcIj5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPk5hbWU6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBpZD1cInVzZXItbmFtZVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZGRyZXNzOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwidXNlci1lbWFpbFwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwidXNlclwiPlBhc3N3b3JkOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiIGlkPVwidXNlci1wYXNzd29yZFwiLz48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIG9uQ2xpY2s9eyhlKSA9PiB7cHJvcHMub25DbGljayhlKX19Lz5cbiAgPC9mb3JtPlxuXG4pO1xuXG5jb25zdCBVc2VyQWRkcmVzcyA9IChwcm9wcykgPT4gKFxuXG4gIDxmb3JtIGlkPVwiYWRkcmVzcy1mb3JtXCIgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHA6Ly9sb2NhbGhvc3Q6NDU2OC9hZGRyZXNzZXNcIj5cbiAgICA8bGFiZWwgZm9yPVwiYWRkcmVzczFcIj5BZGRyZXNzIExpbmUgMTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczFcIiBpZD1cImFkZHJlc3MtbGluZTFcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cImFkZHJlc3MyXCI+QWRkcmVzcyBMaW5lIDI6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MyXCIgaWQ9XCJhZGRyZXNzLWxpbmUyXCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+Q2l0eTogPC9sYWJlbD48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIGlkPVwiYWRkcmVzcy1jaXR5XCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJzdGF0ZVwiPlN0YXRlOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdGF0ZVwiIGlkPVwiYWRkcmVzcy1zdGF0ZVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiemlwXCI+WmlwOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ6aXBcIiBpZD1cImFkZHJlc3MtemlwXCIvPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgb25DbGljaz17KGUpID0+IHtwcm9wcy5vbkNsaWNrKGUpfX0vPlxuICA8L2Zvcm0+XG5cbik7XG5cbmNvbnN0IFVzZXJDYXJkID0gKHByb3BzKSA9PiAoXG5cbiAgPGZvcm0gaWQ9XCJjYXJkLWZvcm1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiaHR0cDovL2xvY2FsaG9zdDo0NTY4L2NhcmRzXCI+XG4gICAgPGxhYmVsIGZvcj1cImNhcmROdW1cIj5DcmVkaXQgQ2FyZCBOdW1iZXI6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNhcmROdW1cIiBpZD1cImNhcmQtbnVtYmVyXCIvPjxicj48L2JyPlxuICAgIDxsYWJlbCBmb3I9XCJleHBpcnlcIj5FeHBpcmF0aW9uIERhdGU6IDwvbGFiZWw+PGJyPjwvYnI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cGlyeVwiIGlkPVwiY2FyZC1leHBpcnlcIi8+PGJyPjwvYnI+XG4gICAgPGxhYmVsIGZvcj1cInNlY3VyaXR5XCI+Q1ZWOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWN1cml0eVwiIGlkPVwiY2FyZC1zZWN1cml0eVwiLz48YnI+PC9icj5cbiAgICA8bGFiZWwgZm9yPVwiYmlsbGluZ1ppcFwiPkJpbGxpbmcgWmlwOiA8L2xhYmVsPjxicj48L2JyPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJiaWxsaW5nWmlwXCIgaWQ9XCJjYXJkLXppcFwiLz48YnI+PC9icj5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUHVyY2hhc2VcIiBvbkNsaWNrPXsoZSkgPT4ge3Byb3BzLm9uQ2xpY2soZSl9fS8+XG4gIDwvZm9ybT5cblxuKTtcblxuXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6ICdob21lJ1xuICAgIH07XG5cbiAgICB0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLy8gRGV0ZXJtaW5lIHdoYXQgcGFnZSB0byBzZW5kIHRoZSB1c2VyIHRvIG5leHQgYmFzZWQgb24gdGhlIGN1cnJlbnQgcGFnZVxuICBvblN1Ym1pdChldmVudCkge1xuICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2coJ0luIGhlcmUnKTtcblxuICAgIGxldCBuZXh0UGFnZTtcblxuICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdob21lJykge1xuICAgICAgbmV4dFBhZ2UgPSAnRjEnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnRjEnKSB7XG4gICAgICBuZXh0UGFnZSA9ICdGMic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdGMicpIHtcbiAgICAgIG5leHRQYWdlID0gJ0YzJztcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dFBhZ2UgPSAnaG9tZSc7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlOiBuZXh0UGFnZVxuICAgIH0pO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnaG9tZScpIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtcGFnZVwiPlxuICAgICAgICAgIDxoMT5TaG9wIFRpbCBZb3UgRHJvcDwvaDE+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImNoZWNrb3V0LWJ1dHRvblwiIG9uQ2xpY2s9eyhlKSA9PiB7dGhpcy5vblN1Ym1pdChlKX19PkNoZWNrb3V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gJ0YxJykge1xuICAgICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGlkPVwidXNlci1zaWdudXBcIj5cbiAgICAgICAgICA8VXNlclNpZ251cCBvbkNsaWNrPXt0aGlzLm9uU3VibWl0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdGMicpIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBpZD1cInVzZXItYWRkcmVzc1wiPlxuICAgICAgICAgIDxVc2VyQWRkcmVzcyBvbkNsaWNrPXt0aGlzLm9uU3VibWl0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBpZD1cInVzZXItY2FyZFwiPlxuICAgICAgICAgIDxVc2VyQ2FyZCBvbkNsaWNrPXt0aGlzLm9uU3VibWl0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cblxuXG5cblxuLy8gQ2hlY2tvdXQgYnV0dG9uIHRha2VzIHVzZXIgdG8gZm9ybSAxXG4vLyBOZXh0IGJ1dHRvbiB0YWtlcyB1c2VyIHRvIGZvcm0gMlxuLy8gTmV4dCBidXR0b24gdGFrZXMgdXNlciB0byBmb3JtIDNcbi8vIFB1cmNoYXNlIGJ1dHRvbiB0YWtlcyB1c2VyIHRvIGhvbWUgcGFnZVxuXG4vLyBBcHAgd2lsbCBiZSBhIHN0YXRlZnVsIGNsYXNzIGNvbXBvbmVudFxuLy8gJ1N0YXRlJyB3aWxsIGJlIHRoZSBwYWdlIHRoYXQgdGhlIHVzZXIgaXMgY3VycmVudGx5IHZpZXdpbmdcbi8vIEV2ZW50IGhhbmRsZXIgZm9yIGJ1dHRvbiBjbGlja3Ncbi8vICBPbmUgY2VudHJhbCBldmVudCBoYW5kbGVyXG4vLyAgV2lsbCBvYnNlcnZlIGN1cnJlbnQgc3RhdGUsIGFuZCBkZXRlcm1pbmUgd2hhdCBwYWdlIHRvIHNldCB0aGUgc3RhdGUgdG8gbmV4dFxuLy8gIGV4LiBpZiBzdGF0ZSA9IEYyLCBzZXRTdGF0ZSB0byBGM1xuLy8gICAgICBpZiBzdGF0ZSA9IEYzLCBzZXRTdGF0ZSB0byBob21lXG5cbi8vIFJlbmRlclxuLy8gIFJlbmRlciBtZXRob2Qgd2lsbCBvYnNlcnZlIHRoZSBjdXJyZW50IChuZXdseSBzZXQpIHN0YXRlLCBhbmQgZGV0ZXJtaW5lIHdoaWNoIGZvcm0gdG8gcmVuZGVyXG4vLyAgRm9ybSBkZXRhaWxzIGZvciBzZXJ2ZXIvcXVlcnkgcHVycG9zZXM6XG4vLyAgICAxLiBGMSAtLT4gYWN0aW9uIHdpbGwgcG9pbnQgdG8gdXNlcnMgZW5kcG9pbnRcbi8vICAgIDIuIEYyIC0tPiBhY3Rpb24gd2lsbCBwb2ludCB0byBhZGRyZXNzZXMgZW5kcG9pbnRcbi8vICAgIDMuIEYzIC0tPiBhY3Rpb24gd2lsbCBwb2ludCB0byBjYXJkcyBlbmRwb2ludFxuXG4iXX0=