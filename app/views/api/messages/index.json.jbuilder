json.array! @messages do |message|
  json.content message.content
  json.name message.user.name
  json.image message.image.url
  json.created_at message.created_at.to_s
  json.id message.id
end
