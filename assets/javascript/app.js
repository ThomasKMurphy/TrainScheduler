var firebase

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCO-ssItvvVxEW7FAl8nBwwbkOFeAxcVUc',
  authDomain: 'train-scheduler-e71fa.firebaseapp.com',
  databaseURL: 'https://train-scheduler-e71fa.firebaseio.com',
  projectId: 'train-scheduler-e71fa',
  storageBucket: 'train-scheduler-e71fa.appspot.com',
  messagingSenderId: '578656314247'
}
firebase.initializeApp(config)

// Create a variable to reference the database
var database = firebase.database()
// Initial Values
var moment

// Clock  
setInterval(function () {
  $('.current-time').text(moment().format('dddd, MMMM Do, kk:mm:ss'))
}, 1000)
