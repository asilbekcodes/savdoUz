import { notification } from "antd";

// type NotificationType = "success" | "info" | "warning" | "error";
// type PlacementType =
//   | "top "
//   | "topLeft"
//   | "topRight"
//   | "bottom"
//   | "bottomLeft"
//   | "bottomRight";

class NotificationService {
  constructor() {
    this.mode = "success";
    this.message = "";
    this.description = "";
    this.duration = 2;
    this.placement = "topRight";
  }

  setMode(mode) {
    this.mode = mode;
    return this;
  }

  setDuration(duration) {
    this.duration = duration;
    return this;
  }

  setPlacement(placement) {
    this.placement = placement;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  setDesc(description) {
    this.description = description;
    return this;
  }

  get config() {
    return {
      message: this.message,
      description: this.description,
      duration: this.duration,
      placement: this.placement,
    };
  }

  success() {
    notification.success(this.config);
  }

  error() {
    notification.error(this.config);
  }

  warning() {
    notification.warning(this.config);
  }

  reset() {
    this.mode = "success";
    this.message = "";
    this.description = "";
    this.duration = 2;
    this.placement = "topRight";
  }
}

const toast = new NotificationService();

export default toast;
