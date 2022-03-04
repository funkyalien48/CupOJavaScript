import React, { useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import fire from '../fire'

function FriendRequests() {
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [friendRequests, setFriendRequests] = useState(null);
    const [friendRequestRetrieved, setFriendRequestRetrieved] = useState(false);

    const getFriendRequests = () => {
        usersDB.doc(userID).collection('friendRequests').get()
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
                        <Text>{item.first_name + " " + item.last_name + " wants to send you a friend request"}</Text>
                    )}
                />
            }
        </React.Fragment>
    )
}

export default FriendRequests