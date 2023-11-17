import React, { useEffect } from "react"
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setMessage } from "../store/slicers";
import { Notification, Notifications } from "react-native-notifications";

const Message = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: RootState) => state.message);
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         let localNotification = Notifications.postLocalNotification({
    //             body: "Local notification!",
    //             title: "Local Notification Title",
    //             sound: "chime.aiff",
    //             silent: false,
    //             category: "SOME_CATEGORY",
    //             userInfo: { },
    //             fireDate: new Date(),
    //         });
    //         return localNotification
    //     }, 500)
    // },[])


    const handlePress = () => {
        dispatch(setMessage('Message from dawdawdw'));
    };

    const postNotification = async () => {

        let localNotification = Notifications.postLocalNotification({
            body: "Local notification!",
            title: "Local Notification Title",
            sound: "chime.aiff",
            silent: false,
            category: "SOME_CATEGORY",
            userInfo: { },
            fireDate: new Date(),
        });
        return localNotification
    };

    return (
        <View>
            <Text>{message}</Text>
            <Button title={'Set Message'} onPress={postNotification} />
        </View>
    );
};

export default Message;