import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css'

export const Success = (message) => {
  Store.addNotification({
      title: "Success!",
      message: message,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
  });
  return message
}

export const Error = (message) => {
  Store.addNotification({
      title: "Error!",
      message: message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
  });
  return message;
}