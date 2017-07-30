var firebase
var moment
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

var database = firebase.database()

// Clock  
setInterval(function () {
  $('.current-time').text(moment().format('dddd, MMMM Do, kk:mm:ss'))
}, 1000)

// Button for adding train
$('#add-train-btn').on('click', function (event) {
  event.preventDefault()
  // Grabs user input
  var trainName = $('#train-name-input').val().trim()
  var trainDestination = $('#destination-input').val().trim()
  var trainFirst = $('#first-train-input').val().trim()
  var trainFrequency = $('#frequency-input').val().trim()

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  }
  // Uploads train data to the database
  database.ref().push(newTrain)

  // Logs everything to console
  console.log(newTrain.name)
  console.log(newTrain.destination)
  console.log(newTrain.first)
  console.log(newTrain.frequency)

  // Clears all of the text-boxes
  $('#train-name-input').val('')
  $('#destination-input').val('')
  $('#first-train-input').val('')
  $('#frequency-input').val('')
})
// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on('child_added', function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val())

  // Store everything into a variable.
  var trainName = childSnapshot.val().name
  var trainDestination = childSnapshot.val().destination
  var trainFirst = childSnapshot.val().first
  var trainFrequency = childSnapshot.val().frequency

  var trainFirstConverted = moment(trainFirst, 'hh:mm').subtract(1, 'years')
  console.log(trainFirstConverted)
  var currentTime = moment()
  console.log('Current Time: ' + moment(currentTime).format('hh:mm'))
  var diffTime = moment().diff(moment(trainFirstConverted), 'minutes')
  console.log('Difference In Time: ' + diffTime)
  var tRemainder = diffTime % trainFrequency
  console.log(tRemainder)
  var tMinutesTillTrain = trainFrequency - tRemainder
  console.log('Minutes Until Train: ' + tMinutesTillTrain)
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes')
  console.log('Arrival Time: ' + moment(nextTrain).format('hh:mm'))

  // Train Info
  console.log(trainName)
  console.log(trainDestination)
  console.log(trainFirst)
  console.log(trainFrequency)
  console.log(nextTrain)
  console.log(tMinutesTillTrain)

  // Add each train's data into the table
  $('#schedule-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>')
})
