import { Component } from 'react'

import {
	CardElement,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends Component {
  state = {
    complete: false,
    errorMessage: '',
    email: "foobar@example.com",  // customer email
    name: "Bello Oladipupo",
    phone: "08188555611",
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {
      name,
      phone,
      email,
    } = this.state;

    const metadata = {
      user_name: name,
      user_email: email,
      user_phone: phone,
      price_id: "5b72ba7a3eb5f42efc6630a7",
      // coupon_id: "",
    };
    
    const { token, error } = await this.props.stripe.createToken();
    if (error) {
      this.setState({ errorMessage: error.message });
    } else {
      const response = await fetch("http://localhost:9100/stripe-charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          tokenId : token.id,
          metadata,
        })
      });

      if (response.ok) this.setState({ complete: true });
      this.props.onCompleted(await response.json());
    }
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  render() {
    const {
      complete,
      errorMessage,
      name,
      phone,
      email,
    } = this.state;

    if (complete) return <h1>Purchase Complete</h1>;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <span>name:</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <span>phone:</span>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
          <span>email:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <label>
          Card details
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit" disabled={!this.props.stripe}>Pay USD 20</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: '18px',
    };
  }

  render() {
    const {elementFontSize} = this.state;
    return (
      <>
        <Elements>
          <CardForm fontSize={elementFontSize} onCompleted={this.props.onCompleted}/>
        </Elements>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }

          h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }

          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }

          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }

          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }

          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }

          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08);
          }

          input,
          .StripeElement {
            display: block;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: 'Source Code Pro', monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }

          input::placeholder {
            color: #aab7c4;
          }

          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }

          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}</style>
      </>
    );
  }
}