$(document).ready(function(){
	refreshMessages()
	setInterval(refreshMessages, 3000);
	$("#submit-btn").click(function(){saveMessage()})
})



var Message = Parse.Object.extend("Message");
var message = new Message();	
var MessageCollection = Parse.Collection.extend({		
	model: Message						
});
var messages = new MessageCollection();


// function to save message to parse

function saveMessage(messageArg){
	message.set('username', $('#username').val());
	message.set('content', $('.form-control').val());
	
	message.save(null, {						

		success: function(msg){
			console.log('message saved, YEAH!!!!!!!!!!!!!!!!!')
			refreshMessages()
		}, 
		error: function(msg, error){
			console.log('message not saved, BOOOO!!!!!!!!!!!!!!!!!')
		}
	})	
}

function refreshMessages(){
	messages.fetch({
		success: function(collection){
			collection.each(function(msg){
				addToChatWindow(msg)
			})
		}
	})
}


function addToChatWindow(message){

	var chatMessage = _.template($("#chat-message").text());
	chatMessage({
		message: message
	})
	$(".chat-window").append(chatMessage)
}