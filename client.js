$(function () {
  $.ajax({
    url: 'http://localhost:3000/players',
    type: 'GET'
  })
    .done(function (data) {
      console.log('success')

      $('leaderBoard').empty()
      data.forEach(function (elem, index) {
        $('leaderBoard').append('<div class="card"  id="' + index + '">' +
          '<div class="card-header">' + elem.name + '</div>' +
          '<div class="card-block">' + elem.score + '</div>' +
          '</div>')
      })
    })
    .fail(function () {
      console.log('error')
    })
    .always(function () {
      console.log('complete')
    })
})

// $.get("localhost:3000/players").done function(){
// 	var players=$.get("localhost:3000/player");
	
// 	var playerName=players[i].name;
// 	var playerScore=players[i].score;

// }