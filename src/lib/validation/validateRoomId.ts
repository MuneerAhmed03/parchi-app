export const validateRoomId = (roomId: string): string => {
  if (roomId.length > 5) {
    return "Room ID should not be longer than 5 characters";
  }
  if (!/^[A-Z0-9]*$/.test(roomId)) {
    return "Room ID should only contain numbers and capital letters";
  }
  return "";
};
