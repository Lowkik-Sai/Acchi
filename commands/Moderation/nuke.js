module.exports = {
  name: 'nuke',
  description: 'clone a channel',
   
  execute(client, message, args) {
    if(!message.member.hasPermission(["ADMINISTRATOR", "MANAGE_MESSAGES"]))  return message.channel.send("You can't use this command.")   
        message.channel.send(`Cloning as **${message.channel.name}** `)
    
        function nuke(){
         let id= message.channel.id;
        const fetchedChannel =  client.channels.cache.get(id);
          clone(id);
        fetchedChannel.delete();
       }
        
       function clone(id){
        let channel= client.channels.cache.get(id);
        let pos=channel.position
         channel.clone().then(clone => clone.setPosition(+pos)).then(clone => sendmsg(clone.id,"**Cloned This Channel!** \n https://imgur.com/TD7ydmH"));
       }
        
        function sendmsg(chnlID,msg){
           var generalChannel = client.channels.cache.get(chnlID) // Replace with known channel ID
          generalChannel.send(msg)  
        }; 
        nuke();
      }
    }