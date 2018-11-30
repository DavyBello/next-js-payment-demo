    import React, { Component } from 'react';
    import dynamic from 'next/dynamic'
    import Head from 'next/head'

    const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

    import { StripeProvider } from 'react-stripe-elements';
    import CheckoutForm from '../components/CheckoutForm'

    class App extends Component {
        state = {
            stripe: null,
            response: {}
        }

        componentDidMount() {
            // Create Stripe instance in componentDidMount
            const stripekey = 'pk_test_9ECZqKsI1jNj0UOqIP03ZzGW'
            this.setState({ stripe: window.Stripe(stripekey) });
        }

        onCompleted = (response) => {
            //console.log(response); // card charged successfully, get reference here
            this.setState({ response });
        }

        render() {
            const {
                stripe,
                response
            } = this.state;
            return (
                <>
                    <Head>
                        <script src="https://js.stripe.com/v3/"></script>
                    </Head>
                    <StripeProvider stripe={stripe}>
                        <CheckoutForm onCompleted={this.onCompleted}/>
                    </StripeProvider>
                    <p>Api response:</p>
                    <ReactJson src={response} />
                </>
            );
        }
    }

    export default App;