function UserDataModal(userData){
const {
  userId,
  userName,
  firstName,
  lastName,
  emailId,
  shortName,
  bio,
  fbId,
  appleId,
  userImage,
} = userData;
this.userId = userId;
this.userName = userName;
this.firstName = firstName;
this.lastName = lastName;
this.emailId = emailId;
this.shortName = shortName;
this.bio = bio;
this.fbId = fbId;
this.appleId = appleId;
this.userImage =userImage;
}

export default UserDataModal;