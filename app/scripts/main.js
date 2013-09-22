$(document).ready(function(){
	getMessages();
	$("#submit-btn").click(function(){saveMessage()})
	timeoutRefresh();
});


var Message = Parse.Object.extend("Message");
	
var MessageCollection = Parse.Collection.extend({		
	model: Message						
});
var messages = new MessageCollection();

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
			$('.chat-window').html('')  /*!!! this goes here because parse takes a half a second to refresh, 2 lines up, then clears .chat-window*/
			collection.each(function(msg){
				addToChatWindow(msg);
			});
		}
	});
};

function addToChatWindow(msg){
	message = msg;
	var chatMessage = _.template($("#chat-message").text());
	chatMessage({
		message: message
	});

	$(".chat-window").append(chatMessage)
};

function timeoutRefresh(){
	setInterval(checkForNewChat, 3000);
};

function formatTime(timestamp) {
	var time = moment(timestamp).format("hh:mm");
	return time;
};

function checkForNewChat(){
	getMessages();				/*!!! as opposed to putting --$('.chat-window').html('')-- here, because it clears the .chat-window before parse updates/refreshes/fetches so you see the half a second it takes parse to refresh happening. clear screen, wait half a second, then refresh*/
};
