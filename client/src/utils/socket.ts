import { io } from "socket.io-client";

const socket = io("https://plivo-sgnh.onrender.com"); // your backend URL

export default socket;
