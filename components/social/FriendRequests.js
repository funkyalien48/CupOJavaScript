import React, { useState } from 'react'
import { Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import fire from '../fire'

function FriendRequests() {
    const usersDB = fire.firestore().collection('users');
    const friendsDB = fire.firestore().collection('friendships');
    const currentUserID = fire.auth().currentUser.uid;

    const [friendRequests, setFriendRequests] = useState(null);
    const [friendRequestRetrieved, setFriendRequestRetrieved] = useState(false);

    const getFriendRequests = () => {
        usersDB.doc(currentUserID).collection('friendRequests').get()
            .then((querySnapshot) => {
                setFriendRequestRetrieved(true); 
                let frs = querySnapshot.docs.map(doc => doc.data());
                if(frs.length > 0) {
                    setFriendRequests(frs);
                }
            })
            .catch((error) => {
                console.log('Error getting friend requests: ', error);
            })
    }

    if(friendRequestRetrieved == false) {
        getFriendRequests();
    }
    
    //Current user accepts friend request. Friendship added
    function acceptFriendRequest(user2)
    {
        friendsDB.get().then(function(querySnapshot) 
        {
            let friendshipData = querySnapshot.docs.map(doc => doc.data());
            let friendshipExists = false;

            for (let i = 0; i < friendshipData.length; i++)
            {
                if ((friendshipData[i].user1 == currentUserID && friendshipData[i].user2 == user2.userID) || 
                (friendshipData[i].user2 == currentUserID && friendshipData[i].user1 == user2.userID))
                {
                    friendshipExists = true;
                }
            }
            
            if (!friendshipExists)
            {
                friendsDB.add({user1: user2.userID, user2: currentUserID})
                removeFriendRequest(user2);
                alert('Friend request accepted');
            }
        }).catch(function(error) {console.log('Error getting documents: ', error)})
    }
    
    //change/update state to only remove 1
    //Removes friend request from current user
    function removeFriendRequest(user2) //user2 sent you 
    {
        usersDB.doc(currentUserID).collection('friendRequests').get()
            .then((querySnapshot) => 
            {
                let removeRequest = querySnapshot.docs.map(doc => doc.data());
                let requestRemoved = false
                let friendRequestCollection = fire.firestore().ref('users/friendRequests');
                //compare user2ID friend request if match
                for (let i = 0; i < removeRequest.length; i++)
                {
                    if (removeRequest[i].userID == user2.userID)
                    {
                        requestRemoved = true;
                        friendRequestCollection.remove();
                        //doc.ref.delete(); -- removes document
                        //friendRequestCollection.doc(currentUserID).delete();
                       // usersDB.doc(currentUserID).collection('friendRequests').delete();
                    }
                    console.log(friendRequestCollection);
                    console.log(removeRequest[i].userID == user2.userID); //true
                }
                console.log(doc.ref.delete());
                console.log(requestRemoved); //true

            }).catch(function(error) {console.log('Error removing friend request: ', error)})
    }

    return (
        <React.Fragment>
            {friendRequests === null &&
                <Text>You have no friend requests :(</Text>
            }
            {friendRequests != null &&
                <FlatList
                    keyExtractor={(item) => item.userID}
                    data={friendRequests}
                    renderItem={({ item }) => (
                        <View>
                        <Text>{item.first_name + " " + item.last_name + " wants to send you a friend request"}</Text>
                            <Button
                                title="Accept"
                                onPress={() => acceptFriendRequest(item)}
                            />
                            <Button
                                title="Reject"
                                onPress={() => removeFriendRequest(item)}
                            />
                        </View>
                    )}
                />
            }
        </React.Fragment>
    )
}

export default FriendRequests