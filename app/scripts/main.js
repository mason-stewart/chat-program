$(document).ready(function(){
	getMessages()
	$("#submit-btn").click(function(){saveMessage()})
})
var namespacing = {};


var Message = Parse.Object.extend("Message");
	
var MessageCollection = Parse.Collection.extend({		
	model: Message						
});
var messages = new MessageCollection();


// function to save message to parse

function saveMessage(){
	var message = new Message();
	message.set('username', $('#username').val());
	message.set('content', $('.form-control').val());
	$('.form-control').val('');
	message.save(message, {						

		success: function(message){
			console.log('message saved, YEAH!!!!!!!!!!!!!!!!!')
			addToChatWindow(message);
		}, 
		error: function(message, error){
			console.log('message not saved, BOOOO!!!!!!!!!!!!!!!!!')
		}
	})	
}

function getMessages(){
	messages.fetch({
		success: function(collection){
			collection.each(function(msg){
				namespacing.counter = namespacing.counter + 1;
				addToChatWindow(msg)
			})
		}
	})
}


function addToChatWindow(msg){
	message = msg;
	var chatMessage = _.template($("#chat-message").text());
	chatMessage({
		message: message
	})
	$(".chat-window").append(chatMessage)
}
function timeoutRefresh(){
	setInterval(checkForNewChat, 3000);
}

function formatTime(timestamp) {
	var time = moment(timestamp).format("hh:mm");
	return time;
}
function checkForNewChat (){
	messages.fetch({
		success: function(collection){
			
		}
	})
}
