var firebase
var moment

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

setInterval(function () {
  $('.current-time').text(moment().format('dddd, MMMM Do, kk:mm:ss'))
}, 1000)

$('#add-train-btn').on('click', function (event) {
  event.preventDefault()

  var trainName = $('#train-name-input').val().trim()
  var trainDestination = $('#destination-input').val().trim()
  var trainFirst = $('#first-train-input').val().trim()
  var trainFrequency = $('#frequency-input').val().trim()

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  }

  database.ref().push(newTrain)

  console.log(newTrain.name)
  console.log(newTrain.destination)
  console.log(newTrain.first)
  console.log(newTrain.frequency)

  $('#train-name-input').val('')
  $('#destination-input').val('')
  $('#first-train-input').val('')
  $('#frequency-input').val('')
})

database.ref().on('child_added', function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val())

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
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('hh:mm')
  console.log('Arrival Time: ' + nextTrain)

  console.log(trainName)
  console.log(trainDestination)
  console.log(trainFirst)
  console.log(trainFrequency)
  console.log(nextTrain)
  console.log(tMinutesTillTrain)

  $('#schedule-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>')
})
