$(document).ready(function(){
    let nom;

    if(document.cookie != ""){
        nom = document.cookie;
    }
    else{
        nom = prompt("quel est votre nom ?");
        document.cookie = nom;
    }

    var exampleSocket = new WebSocket(`ws://127.0.0.1:8080/chat?pseudo=${nom}`, "protocolOne");

    exampleSocket.addEventListener('open',function(event){

        $("#chat_body").append("<p>vous etes connecter au serveur </p>");
        $("#bonhomme").append("<p>" + nom + "</p>");
    });



    exampleSocket.addEventListener('message',function(event){
        //$("#chat_body").append("<p>vous etes connecter au serveur </p>");
        console.log(event);

        var lemessage = JSON.parse(event.data);
        console.log(lemessage.emetteur);
        console.log(lemessage.texte);



        $("#chat_body").append("<p>" + lemessage.emetteur + " : "+ lemessage.texte + "</p>");
    });

   $("#boutonEnvoyer").click(function () {
       let messagetext = $("#messageText").val();
       $("#messageText").val("");
        exampleSocket.send(messagetext);return false;
    });

});
