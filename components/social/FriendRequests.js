import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import fire from '../fire'

function FriendRequests() {
    const usersDB = fire.firestore().collection('users');
    const friendsDB = fire.firestore().collection('friendships');
    const currentUserID = fire.auth().currentUser.uid;

    const [friendRequests, setFriendRequests] = useState(null);

    useEffect(() => {
        usersDB.doc(currentUserID).collection('friendRequests').get()
            .then((querySnapshot) => {
                // setFriendRequestRetrieved(true); 
                let frs = querySnapshot.docs.map(doc => doc.data());
                if(frs.length > 0) {
                    setFriendRequests(frs);
                }
            })
            .catch((error) => {
                console.log('Error getting friend requests: ', error);
            })
    }, [friendRequests])
    
    //Current user accepts friend request. Friendship added
    function acceptFriendRequest(user2) {
        friendsDB.get().then(function(querySnapshot) {
            let friendshipData = querySnapshot.docs.map(doc => doc.data());
            let friendshipExists = false;

            for (let i = 0; i < friendshipData.length; i++) {
                if ((friendshipData[i].user1 == currentUserID && friendshipData[i].user2 == user2.userID) || 
                (friendshipData[i].user2 == currentUserID && friendshipData[i].user1 == user2.userID)) {
                    friendshipExists = true;
                }
            }
            
            if (!friendshipExists) {
                friendsDB.add({user1: user2.userID, user2: currentUserID})
                removeFriendRequest(user2);
                alert('Friend request accepted');
            }
        }).catch(function(error) {console.log('Error getting documents: ', error)})
    }

    // Calls an async function to delete a friend request that contains the user2 in that request
    const removeFriendRequest = async (user2) => {
        await getFriendRequestByID(user2);
        setFriendRequests(null);
    } 

    // Searches firebase for a document containing a friend request from user 2 by its id
    const getFriendRequestByID = async (user2) => {
        const snapshot = await usersDB.doc(currentUserID).collection('friendRequests').where('userID', '==', user2.userID).get();
        const doc = snapshot.docs[0];
        doc.ref.delete();

        console.log(doc.id);
        return doc.id;
    }

    return (
        <React.Fragment>
            {friendRequests === null &&
                <View style={styles.centerView}>
                    <Text>You have no friend requests :(</Text>
                </View>
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

const styles = {
    centerView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default FriendRequests