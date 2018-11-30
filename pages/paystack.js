import React, { Component } from 'react';
import dynamic from 'next/dynamic'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });
import PaystackButton from 'react-paystack';

class App extends Component {

    state = {
        paystackkey: "pk_test_43f8936830aea3a5b9838c4893b16c9f1e7dee34", //PAYSTACK PUBLIC KEY
        email: "foobar@example.com",  // customer email
        name: "Bello Oladipupo",
        phone: "08188555611",
        amount: 10000,
        response: {}
    }

    callback = (response) => {
        //console.log(response); // card charged successfully, get reference here
        this.setState({ response });
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

    render() {
        const {
            name,
            phone,
            email,
            amount,
            paystackkey,
            response
        } = this.state;
        const metadata = {
            user_name: name,
            user_phone: phone,
            price_id: "5b72ba7a3eb5f42efc6630a7",
            // coupon_id: "",
        };
        return (
            <>
                <form>
                    <div>
                        <span>name:</span>                    
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        /><br />
                        <span>phone:</span>                    
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                        /><br />
                        <span>email:</span>                    
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        /><br/>
                        <span>amount:</span>                    
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <p>
                            <PaystackButton
                                text="Make Payment"
                                class="payButton"
                                callback={this.callback}
                                close={this.close}
                                reference={this.getReference()}
                                email={email}
                                amount={amount*100}//convert naira to kobo
                                paystackkey={paystackkey}
                                metadata={metadata}
                            />
                        </p>
                        <p>Api response:</p>
                        <ReactJson src={response} />
                    </div>
                </form>
            </>
        );
    }
}

export default App;