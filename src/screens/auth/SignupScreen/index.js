import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { Input } from '../../../components';
import * as actions from '../../../actions/auth/authActions';
import styles from './styles';

class SignupScreen extends Component {
    onImagePickerPress = () => {
        this.props.navigation.navigate('ImagePicker')
    }

    onSubmit = () => {
        const { email, password, username, intervalID, imageURI, navigation, signup } = this.props;
        signup(intervalID, email, password, username, imageURI, navigation);
    }

    renderImage() {
        const uri = this.props.imageURI;
        if(uri) {
            return (
                <Image
                    style={styles.image}
                    source={{ uri }}
                />
            );
        }
    }

    render() {
        const { username, email, password, updateForm } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Sign Up
                </Text>
                <Input
                    placeholder='Username'
                    onChangeText={text => updateForm('username', text)}
                    value={username}
                />
                <Input
                    placeholder='Email'
                    onChangeText={text => updateForm('email', text)}
                    value={email}
                />
                <Input
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={text => updateForm('password', text)}
                    value={password}
                />
                <View style={styles.imagePickerContainer}>
                    {this.renderImage()}
                    <Button
                        title='Select Avatar'
                        onPress={this.onImagePickerPress}
                    />
                </View>
                <Button
                    title='Sign Up'
                    onPress={this.onSubmit}
                />
                <Text>{JSON.stringify(this.props.error)}</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ auth, splash }) => {
    return { ...auth, ...splash };
}

export default connect(mapStateToProps, actions)(SignupScreen);