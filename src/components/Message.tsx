import React from "react"
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setMessage } from "../store/slicers";

const Message = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: RootState) => state.message);

    const handlePress = () => {
        dispatch(setMessage('Message from dawdawdw'));
    };

    return (
        <View>
            <Text>{message}</Text>
            <Button title={'Set Message'} onPress={handlePress} />
        </View>
    );
};

export default Message;