Parse.initialize("hM7WAdklsjmnzqt381MfrXpcwlXy68a6VAQ4jdr9", "qFcvl9ZRt48yFxQACHV53qouuVXVViVvMzY4FDug");

// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}, {
//   success: function(object) {
//     alert("yay! it worked");
//   }
// });

var chatMessage = _.template($("#chat-message"));
chatMessage({
	message: message
})

var Message = Parse.Object.extend("Message");

var messageCollection = Parse.Collection.extend({		
	model: Message						
});

var message = new Message();	

					// function sendItToParse(){
					// 	$('.form-control').append(message);
					// }


$('.submit-btn').click(function(){ 
	

});

// function to save message to parse

function saveMessage(messageArg){
	message.set('message-content', $('.form-control').val());
	message.set('message-user', $('#username').val());
	
	message.save(null, {						

	success: function(msg){
		console.log('message saved, YEAH!!!!!!!!!!!!!!!!!')
	}, 
	error: function(msg, error){
		console.log('message not saved, BOOOO!!!!!!!!!!!!!!!!!')
	}
	}		
}

function refreshMessages(){
	messageCollection.fetch({
		success: function(collection){
			collection.each(function(msg){
				addToChatWindow(msg)
			})
		}
	})
}
