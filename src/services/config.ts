const config = {
    URL:
    {
        REPOSITORY: process.env.REACT_APP_REPOSITORY || 'http://localhost:5000/api/books',
        AUTHENTICATION: process.env.REACT_APP_AUTHENTICATION || 'http://localhost:5000/signin',
        PAYMENT: process.env.REACT_APP_PAYMENT || 'http://localhost:5000/payment/checkout'
    }
}

export default config;