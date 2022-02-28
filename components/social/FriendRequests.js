import React, { useState } from 'react'
import { Text } from 'react-native'
import fire from '../fire'

function FriendRequests() {
    const usersDB = fire.firestore().collection('users')
    const userID = fire.auth().currentUser.uid

    const [friendRequests, setFriendRequests] = useState(null);
    const [friendRequestRetrieved, setFriendRequestRetrieved] = useState(false);

    const getFriendRequests = () => {
        usersDB.doc(userID).collection('friendRequests').get()
            .then((querySnapshot) => {
                let friendRequests = querySnapshot.docs.map(doc => doc.data());
                setFriendRequests(friendRequests);
                setFriendRequestRetrieved(true);
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
                <Text>You have friend requests!</Text>
            }
        </React.Fragment>
    )
}

export default FriendRequests