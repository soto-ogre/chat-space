$(document).on('turbolinks:load',function(){
  
  function buildHTML(message){
      var img = message.image ? `<a href="${message.image}" target="_blank"><img src= ${ message.image } width="300px"></a>`
                                    : "";
      var html = `<div class="content__post" data-messege-id="${message.id}">
                    <div class="content__data">
                      <div class="content__user">
                      ${message.name}
                      </div>
                      <div class="content__time">
                      ${message.created_at}
                      </div>
                    </div>
                    <p class="content__message">
                    ${message.content}
                    </p>
                    ${img}
                  </div>`
                  console.log(html)
    return html;
  };



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.content__talk').append(html);
      $('.content__talk').animate({ scrollTop: $('.content__talk')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.content__post:last').data('message-id');
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id},
      })
      .done(function (messages) {
        var insertHTML = '';
        $.each(messages, function (i, message) {
          insertHTML += buildHTML(message);
        $('.content__talk').append(insertHTML);
        $('.content__talk').animate({ scrollTop: $('.content__talk')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 7000);
});