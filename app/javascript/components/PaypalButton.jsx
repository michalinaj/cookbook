import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import scriptLoader from "react-async-script-loader";

const CLIENT = {
  sandbox:
    "Afl-u8pzp6pBiMvd9ADQh4DiQT1wHbngKa7kO-v2lCaiXRA4f_EMuFaObUnD_d_JvfX1EkT9gKAYtvc9",
  production:
    "Afl-u8pzp6pBiMvd9ADQh4DiQT1wHbngKa7kO-v2lCaiXRA4f_EMuFaObUnD_d_JvfX1EkT9gKAYtvc9"
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
let PayPalButton = null;
// const payId = document.getElementById('pay-id');

class PaypalButton extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
     showButtons: false,
     loading: true,
     paid: false
   };
  //  window.React = React;
  //  window.ReactDOM = ReactDOM;
  // payId.React = React;
  // payId.ReactDOM = ReactDOM;
 }

 componentDidMount() {
  const { isScriptLoaded, isScriptLoadSucceed } = this.props;

  if (isScriptLoaded && isScriptLoadSucceed) {
    PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
    this.setState({ loading: false, showButtons: true });
  }
}

componentWillReceiveProps(nextProps) {
  const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

  const scriptJustLoaded =
    !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

  if (scriptJustLoaded) {
    if (isScriptLoadSucceed) {
      PayPalButton = paypal.Buttons.driver("react", {
        React,
        ReactDOM
      });
      this.setState({ loading: false, showButtons: true });
    }
  }
}
createOrder = (data, actions) => {
  return actions.order.create({
    purchase_units: [
      {
        description: "Grocery List",
        amount: {
          currency_code: "USD",
          value: 18.5
        }
      }
    ]
  });
};

onApprove = (data, actions) => {
  actions.order.capture().then(details => {
    const paymentData = {
      payerID: data.payerID,
      orderID: data.orderID
    };
    console.log("Payment Approved: ", paymentData);
    this.setState({ showButtons: false, paid: true });
  });
};
render() {
  const { showButtons, loading, paid } = this.state;

    return (
      <div className="container-sm py-3 text-center">
        {loading}

        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="container py-3 text-center">
            <p>
              Your transaction was successful.{" "}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);