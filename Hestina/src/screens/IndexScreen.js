/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Icon } from 'native-base';
const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    useEffect(() => {
        getBlogPosts();
    }, []);
    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ShowScreen', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableHighlight onPress={() => deleteBlogPost(item.id)}>
                                    <Icon style={styles.icon} name="trash" />
                                </TouchableHighlight>
                            </View>
                        </TouchableOpacity>);
                }} />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () =>
            <TouchableOpacity onPress={() => navigation.navigate('CreateScreen')}>
                <Icon name="add" fontSize={24} />
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    },
});
export default IndexScreen;
