import io from "socket.io-client";
import store from "../store";
import {
  setIncomingCall,
  callAccepted,
  callRejected,
  callEnded,
  updateCallStatus,
} from "../states/videoCallSlice";
import { showToast } from "../states/popUpSlice";
import { useNavigate } from "react-router";
import { PATH } from "../routes/path";

const SOCKET_URL = "http://localhost:8000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const connectSocket = (userId) => {
  if (socket.connected) return;

  socket.auth = { userId };
  socket.connect();

  socket.on("connect", () => {
    console.log(`Connected with ID: ${socket.id}`);
    socket.emit("join", userId); // Emit join event upon connection
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    store.dispatch(
      showToast({ message: "Failed to connect to server", status: "error" })
    );
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
    // store.dispatch(showToast({ message: 'Disconnected from server', status: 'warning' }));
    store.dispatch(updateCallStatus({ isInCall: false }));
  });

  socket.on("incomingCall", (callData) => {
    store.dispatch(setIncomingCall(callData));
  });

  socket.on("callAccepted", (callData) => {
    store.dispatch(callAccepted(callData));
    store.dispatch(showToast({ message: "Call accepted", status: "success" }));
  });

  socket.on("callRejected", (callData) => {
    console.log("Call rejected:", callData);
    store.dispatch(callRejected(callData));
    store.dispatch(showToast({ message: "Call rejected", status: "info" }));
  });

  socket.on("callEnded", (callData) => {
    console.log("Call ended:", callData);
    store.dispatch(callEnded(callData));
    store.dispatch(showToast({ message: "Call ended", status: "info" }));
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
