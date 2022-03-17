//NMG Server
// Dev Server Link
//export const APP_BASE_URL = "https://demo.newmediaguru.co/vouch_dev/";
// Stage Server Link
//export const APP_BASE_URL = "https://demo.newmediaguru.co/vouch_stage/";


// Client Server

// export const APP_BASE_URL = "https://demo.vouchvault.com/dev/";
//  export const APP_BASE_URL = "https://demo.vouchvault.com/stage/"; 
export const APP_BASE_URL = "https://app.vouchvault.com/";

export const VOUCH_API = {
  BASE_URL: `${APP_BASE_URL}api/`,
  REGISTER: "register",
  LOGIN: "login",
  VERIFY_EMAIL: "verify_email",
  RESEND_OTP: 'send_otp',
  CHANGE_USER_NAME: "change_user_name",
  UPLOAD_AVATAR: "upload_avatar",
  FORGOT_PASSWORD: "forgot_password",
  FEEDS: "feeds",
  USERS_LIST: "users_list",
  INVITE_USER: "invite_user",
  COMMENT_LIST: "comment_list",
  ADD_COMMENT: "add_comment",
  UPDATE_PROFILE: "update_profile",
  MY_VOUCH_LIST: "my_vouch_list",
  MY_TRY_LIST: "my_try_list",
  ADD_TRY_VOUCH: "add_try_vouch",
  PROFILE: "profile",
  FROM_TRY_TO_VOUCH: "from_try_to_vouch",
  SOCIAL_LOGIN: "social_login",
  CHANGE_PASSWORD: "change_password",
  CHANGE_EMAIL: "change_user_email",
  SAVE_EMAIL: "save_user_email",
  TOGGLE_ACCOUNT_VISIBILITY: "toggle_private_status",
  TOGGLE_FOLLOWING_PERMISSION: "toggle_following_permission",
  DELETE_DEACTIVATE_ACCCOUNT: "delete_deactivate_account",
  NOTIFICATION_SETTING_LIST_STATUS: "notification_setting_list",
  UPDATE_SETTING_LIST: "update_setting_list",
  SYNC_CONTACTS: "sync_contacts",
  BLOCK_ACCOUNT_LIST: "block_account_list",
  FOLLOWING: "following",
  FOLLOWERS: "followers",
  VOUCHED_LIST: "vouched_list",
  FOLLOW_USER: "follow_users",
  UNFOLLOW_USER: "unfollow_user",
  BLOCK_USER: "block_user",
  REPORT_USER: "report_user",
  REPORT_VOUCH: "report_vouch",
  SHARE_VOUCH: "share_vouch",
  CONTACT_US: "contact_us",
  VOUCH_SUGGESTION_LIST: "vouch_suggestion_list",
  FOLLOW_REQUEST_LIST: "follow_request_list",
  ACCEPT_DECLINE_FOLLOW_REQUEST: "accept_decline_follow_request",
  ADD_VOUCH: "add_vouch",
  DELETE_SUGGESTION: "delete_suggestion",
  SEARCH_PRODUCT_ADVERTISING: "search_product_advertising",
  SEARCH: "search",
  SEARCH_FEED_BY_TAG: "search_feed_by_tag",
  SERP_API: "serp_api",
  NOTIFICATIONS: "notifications",
  DEVICE_TOKEN: "device_token",
  GET_FEED: "get_feed",
  LOGOUT: "logout",
  UPLOAD_FB_AVTAR: "upload_fb_avatar",
  PRIVACY_POLICY: "privacy-policy",
  TERMS_CONDITIONS: "terms-conditions",
  COMMUNITY_GUIDELINES: "community-guidelines",
  NOTIFICATION_UNREAD_COUNT: "notification_unread_count",
  FB_FRIEND_LIST: "fb-friends",
  MANDATORY_UPDATE: "mandatory_update",
  ADD_VOUCH_VOUCH: 'add_vouch_vouch',
};

export const REQUEST_TYPE = {
  post: "POST",
  get: "GET",
  multipart: "mutipart",
  delete: "DELETE",
  put: "PUT",
};

export const STORAGE_KEYS = {
  USER_PROFILE: "userProfile",
  USER_TOKEN: "userToken",
  FCM_TOKEN: "fcm_token",
  FIRST_TIME_LOGGIN: "firstTimeLogin",
  SAVE_LOGIN: "save_login",
  SOCIAL_LOGIN_APPLE: "social_login_apple",
  SOCIAL_LOGIN_FACEBOOK: "social_login_facebook",
};


export const STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  RESOURCE_NOT_FOUND: 404,
  SESSION_EXPIRED: 401,
};
