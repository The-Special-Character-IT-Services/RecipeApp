import React from 'react';
import { memo } from 'react';
// import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const actionItem = [
  {
    path: 'Facebook',
    title: 'Facebook',
    icon: <Icon name="logo-facebook" />,
  },
  {
    path: 'FacebookMessenger',
    title: 'Facebook Messenger',
    icon: <Icon name="logo-whatsapp" />,
  },
];

const Fab = () => (
    <ActionButton size={50} buttonColor="rgba(231,76,60,1)" backgroundTappable={false}>
    {actionItem.map(item => (
      <ActionButton.Item
        key={item}
        buttonColor="#fff"
        textStyle={{ color: '#000' }}
        onPress={() => onClick(item.path)}
        {...item}>
        {item.icon}
      </ActionButton.Item>
    ))}
  {/* </ActionButton>
  <ActionButton buttonColor="rgba(231,76,60,1)">
    <ActionButton.Item buttonColor="#9b59b6" title="New Task"/>
      <Icon name="me-create" />
    </ActionButton.Item>
    <ActionButton.Item buttonColor="#3498db" title="Notifications" onPress={() => {}}>
      <Icon name="me-notifications-off" />
    </ActionButton.Item>
    <ActionButton.Item buttonColor="#1abc9c" title="All Tasks" onPress={() => {}}>
      <Icon name="md-done-all" />
    </ActionButton.Item>
  </ActionButton> */}
);

export default memo(Fab);
