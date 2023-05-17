import React from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
// import "bootstrap/dist/css/bootstrap.min.css";
//  import { BrowserRouter } from 'react-router-dom'
// import TimeAgo from 'javascript-time-ago';
// import es from 'javascript-time-ago/locale/es.json'
// TimeAgo.addDefaultLocale(es)
import { store } from './src/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </Provider>
)
