// 3p
import env from 'dotenv'

// Project
import App from './app'


/* --- Main Entry Point --- */
env.config()

const port = process.env.API_PORT || 8000
const isProduction = process.env.NODE_ENV === 'production'

const app = new App(isProduction);
app.listen(port, () => console.log(`Listening on port: ${port}`))