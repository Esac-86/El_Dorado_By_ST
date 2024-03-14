import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #F4F4F4;
  align-items: center;
  justify-content: center;
  padding-horizontal: 30px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin-bottom: 20px;
  padding-horizontal: 20px;
  background-color: #ffffff;
  font-size: 16px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #6B46C1;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-top: 10px;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  elevation: 5;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: #FF0000;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;
