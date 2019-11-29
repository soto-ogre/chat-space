$(function(){
  function buildHTML(message){
      var img = message.image.url ? `<a href="${message.image.url}" target="_blank"><img src= ${ message.image.url } width="300px"></a>`
                                    : "";
      var html = `<div class="content__post">
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
    return html;
}



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
    })
  })
});