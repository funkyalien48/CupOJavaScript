import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, SafeAreaView, Image} from 'react-native'
import fire from '../fire'

function FriendRequests() {
    const usersDB = fire.firestore().collection('users');
    const friendsDB = fire.firestore().collection('friendships');
    const currentUserID = fire.auth().currentUser.uid;

    const [friendRequests, setFriendRequests] = useState(null);

    // Retrieves friendRequests from firebase
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
    
    // acceptFreindRequest() - This function checks the database so that... (continued on next line)
    // 1. Users do not have a friendship in the database
    // 2. If friendship does not exist then create a friendship between the 2 users
    // 3. Delete the friend request
    // 4. You are now friends!
    function acceptFriendRequest(user2) {
        friendsDB.get().then(function(querySnapshot) {
            let friendshipData = querySnapshot.docs.map(doc => doc.data());
            let friendshipExists = false;

            // Checks to see if a friendship between 2 users matches
            for (let i = 0; i < friendshipData.length; i++) {
                if ((friendshipData[i].user1 == currentUserID && friendshipData[i].user2 == user2.userID) || 
                (friendshipData[i].user2 == currentUserID && friendshipData[i].user1 == user2.userID)) {
                    friendshipExists = true;
                }
            }
            
            // If friendship does NOT exist -> write the friendship between 2 users to firebase
            if (!friendshipExists) {
                // Create friendship in firebase between 2 users
                friendsDB.add({user1: user2.userID, user2: currentUserID})
                // delete the friend request from the receiving user
                removeFriendRequest(user2);
                // Alert the user that friend request has been accepted
                alert('Friend request accepted');
            }
        }).catch(function(error) {console.log('Error getting documents: ', error)})
    }

    // removeFriendRequest() - Calls an async function to delete a friend request that contains the user2 in that request
    const removeFriendRequest = async (user2) => {
        await getFriendRequestByID(user2);
        // Set friendRequests to null to refresh friendRequests
        setFriendRequests(null);
    } 

    // getFriendRequestByID() - Searches firebase for a document containing a friend request from user 2 by its id
    const getFriendRequestByID = async (user2) => {
        // Query firebase where a friend request object contains the user that has sent the request by ID
        const snapshot = await usersDB.doc(currentUserID).collection('friendRequests').where('userID', '==', user2.userID).get();
        // retrieve the document
        const doc = snapshot.docs[0];
        // delete the document (friend request)
        doc.ref.delete();

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
                        <SafeAreaView style={styles.container}>
                        <View style={styles.fixToText}>
                        <View style = {[styles.profileData, styles.text]}>
                            <Image source={{uri: item.profilePicId}} style={styles.profilePicture}/>
                        </View>
                        <Text style={styles.title}>{item.first_name + " " + item.last_name + "\n" +
                        " sent you a friend request."}</Text>   
                        <View style={styles.fixToText}>
                            <Pressable style={styles.buttonTitle}
                                title="Accept"
                                onPress={() => acceptFriendRequest(item)}>
                                <Text> Accept </Text>
                            </Pressable>
                            <Pressable style={styles.buttonTitle}
                                title="Reject"
                                onPress={() => removeFriendRequest(item)}>
                                <Text> Reject </Text>
                            </Pressable>
                        </View>
                        </View>
                        </SafeAreaView>
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
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 0,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
      fontSize: 13,
    },
    text: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fixToText: {
      flexDirection: 'row',
      height: 80,
    },
    profilePicture: {
        marginLeft: 10,
        marginTop: 10,
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    profileData: {
        borderWidth: 0.0,
        borderColor: "#D3D3D3",
        alignItems: 'baseline'
    },
    buttonTitle: {
        backgroundColor: 'rgba(39, 209, 245, 0.8)',
        borderRadius: 100,
        paddingTop: 10,
        paddingBottom: 10,
        width: '30%',
        height: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
  }

export default FriendRequests