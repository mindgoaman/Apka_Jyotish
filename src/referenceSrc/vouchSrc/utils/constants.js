import * as strings from "./strings";
import { OnBoardingModel, BottomBarModel, TabBarModel } from "../model/index";
import * as images from "../utils/images";
import * as Svg from "./svg";

export const ONBOARDING_ARRAY = [
  new OnBoardingModel(
    "Remember the things you'd like to try",
    "Make try lists for restaurants, books, gear, services, entertainment and more.",
    images.splash1
  ),
  new OnBoardingModel(
    "Send & receive vouch suggestions",
    "Let your friends know what you vouch for, or get suggestions from them.",
    images.splash2
  ),
  new OnBoardingModel(
    "Create your Try List",
    "Keep all suggestions and items you want to try in one place, organized by type.",
    images.splash3
  ),
  new OnBoardingModel(
    "Easily order items on Amazon",
    "Vouch connects your Try List and Feed to Amazon, seamlessly.",
    images.splash4
  ),
];

export const STATUS_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  RESOURCE_NOT_FOUND: 404,
  SESSION_EXPIRED: 401,
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

export const BOTTOM_TAB_BOTTON_ITEM = [
  {
    title: "Gallery",
    index: 1,
    unSelected: Svg.LibraryIcon,
    selected: Svg.SelectedLibraryIcon,
  },
  {
    title: "Camera",
    index: 2,
    unSelected: Svg.PhotoIcon,
    selected: Svg.SelectedPhotoIcon,
  },
  {
    title: "T Text",
    index: 3,
    unSelected: Svg.TextIcon,
    selected: Svg.SelectedTextIcon,
  },
  {
    title: "Amazon",
    index: 4,
    unSelected: Svg.AmazonIcon,
    selected: Svg.SelectedAmazonIcon,
  },
  {
    title: "Google",
    index: 5,
    unSelected: Svg.GoogleIcon,
    selected: Svg.SelectedGoogleIcon,
  },
];


export const ADD_VOUCH_CATEGORY_ITEM = [
  {
    title: "Media",
    index: 1,
    unSelected: images.iconFunUnselected,
    selected: Svg.SelectedMediaIcon,
  },
  {
    title: "Services",
    index: 2,
    unSelected: images.iconServicesUnselected,
    selected: Svg.SelectedServicesIcon,
  },
  {
    title: "Food",
    index: 3,
    unSelected: images.iconFoodUnselected,
    selected:  Svg.SelectedFoodIcon,
  },
  {
    title: "Products",
    index: 4,
    unSelected: images.iconGearUnselected,
    selected:  Svg.SelectedProductsIcon,
  },
];

export const TOP_COLOR_CODE_LIST = [
  "#ff2d00",
  "#ffe700",
  "#beff00",
  "#01d1dc",
  "#7b01dc",
  "#dc01b6",
  "#ff0000",
  "#000000",
];
export const BOTTOM_COLOR_CODE_LIST = [
  "#ff9c00",
  "#ff9800",
  "#00ffb3",
  "#004895",
  "#1b0095",
  "#760095",
  "#ff0175",
  "#707070",
];
export const GRADIENT_TEXT_COLOR_LIST = [
  "#ffff",
  "#000",
  "#000",
  "#ffff",
  "#ffff",
  "#ffff",
  "#ffff",
  "#ffff",
];

export const NotificationsData = [
  {
    title: "Push Notifications",

    data: [
      {
        name: "Pause all notifications",
        settingId: 0,
      },
      {
        name: "Another user started following you",
        settingId: 1,
      },
      {
        name: "A user requests to follow you",
        settingId: 2,
      },
      {
        name: "A Vouch is recommended for you",
        settingId: 3,
      },
      {
        name: "Your follow request is accepted",
        settingId: 4,
      },
      {
        name: "Another user adds one of your Vouches to try",
        settingId: 5,
      },
      {
        name: "Another user now also Vouches for your Vouch",
        settingId: 6,
      },
      {
        name: "A user comments on your Vouch",
        settingId: 7,
      },
      {
        name: "Your invitee has joined Vouch",
        settingId: 8,
      },
      {
        name: "Your Facebook friend joined Vouch",
        settingId: 9,
      },
    ],
  },
  {
    title: "Other Notifications",
    data: [{ name: "Receive email notifications", settingId: 10 }],
  },
];

export const TabBarItems = [
  new TabBarModel({
    selected: Svg.SelectedVouchIcon,
    unselected: Svg.VouchIcon,
    unselectedBlack: Svg.ProfileTabAll,
    title: "All",
  }),
  new TabBarModel({
    selected: Svg.SelectedMediaIcon,
    unselected: Svg.MediaIcon,
    unselectedBlack: Svg.MediaBlackIcon,
    title: "Media",
  }),
  new TabBarModel({
    selected: Svg.SelectedServicesIcon,
    unselected: Svg.ServicesIcon,
    unselectedBlack: Svg.ServicesBlackIcon,
    title: "Services",
  }),
  new TabBarModel({
    selected: Svg.SelectedFoodIcon,
    unselected: Svg.FoodIcon,
    unselectedBlack: Svg.FoodBlackIcon,
    title: "Food",
  }),
  new TabBarModel({
    selected: Svg.SelectedProductsIcon,
    unselected: Svg.ProductsIcon,
    unselectedBlack: Svg.ProductsBlackIcon,
    title: "Products",
  }),
];

export const BottomTabData = [
  new BottomBarModel({
    text:
      "This is your feed where you will see what the people you follow are vouching for.",
    stepNo: 1,
    name: "feed",
    icon: Svg.SelectedFeedIcon,
  }),
  new BottomBarModel({
    text: "Search for people, things they vouch for, or hashtags.",
    stepNo: 2,
    name: "search",
    icon: Svg.SearchIcon,
  }),

  new BottomBarModel({
    text: "Everything that you vouch for will be kept in your profile.",
    stepNo: 8,
    name: "vouches",
    icon: Svg.ProfileIcon,
  }),
  new BottomBarModel({
    text: "All Items you want to try will be kept here.",
    stepNo: 5,
    name: "try list",
    icon: Svg.TryListIcon,
  }),
  new BottomBarModel({
    text:
      "When friends send you suggestions, you will see it in the alerts, as well as other updates.",
    stepNo: 3,
    name: "alerts",
    icon: Svg.AlertIcon,
  }),
];

export const ProfileButtons = (followStatus, blockStatus) => {
  if (followStatus === 3 || followStatus === 2) {
    return [
      {
        title: "Unfollow",
      },
      {
        title: "Report",
      },
      {
        title: blockStatus ? "Unblock" : "Block",
      },
    ];
  } else {
    return [
      {
        title: "Report",
      },
      {
        title: blockStatus ? "Unblock" : "Block",
      },
    ];
  }
};

export const FeedButtons = [
  {
    title: "Share with user...",
  },
  {
    title: "Share to...",
  },
];

export const SettingScreenData = [
  {
    title: "Account",
    data: [
      { name: "Change Password", route: "ChangePassword" },
      { name: "Change Email", route: "ChangeEmail" },
      { name: "Change Username", route: "UserNameChange" },
      { name: "Find Facebook Friends", route: "FindFacebookFriends" },
      { name: "Find Contacts", route: "FindContacts" },
      { name: "Notifications", route: "Notifications" },
      { name: "Deactivate / Delete Account", route: "DeactivateDeleteAccount" },
    ],
  },
  {
    title: "Privacy",
    data: [
      { name: "Account Visibility", route: "AccountVisibility" },
      { name: "Blocked Accounts", route: "BlockedAccounts" },
    ],
  },
  {
    title: "Legal & Policies",
    data: [
      { name: "Terms of Use", route: "TermsOfUse" },
      { name: "Privacy Policy", route: "PrivacyPolicy" },
      { name: "Community Guidelines", route: "CommunityGuidelines" },
      { name: "Contact Us", route: "ContactUs" },
    ],
  },
];

export const charactersLimit = {
  DESCRIPTION_MAX_LIMIT: 5000,
};

// export const SearchRequest = {
//   query: new String(""), //Searched query String
//   tag: new Number(0), //Is # in query string , If yes then 1 otherwise 0
//   thid: new Number(1), // Header type ()
//   hid: new Number(1),
//   cid: new Number(0),
// };

export const SearchSubHeader = [
  {
    title: "Everyone",
    hid: 1,
    cid: 1,
  },
  {
    title: "Following",
    hid: 2,
    cid: 1,
  },
  {
    title: "Only mine",
    hid: 3,
    cid: 1,
  },
];

export const SearchRequest = [
  {
    title: "Vouches",
    tag: 0,
    thid: 1,
    hid: 1,
    cid: 1,
    subHeader: SearchSubHeader,
  },
  { title: "People", tag: 0, thid: 2 },
  { title: "Tags", tag: 0, thid: 3 },
];


// export const NOTIFICATION_TYPE =[
//   ,
//     FOLLOWING
// ​,
//     FOLLOW_REQUEST
// ​,
//     ACCEPTED_FOLLOW_REQUEST
// ​,
//     JOINED_INVITEE
// ​,
//     RECOMMENDED
// ​,
//     VOUCH_TO_TRY
// ​,
//     VOUCHES_VOUCH
// ​,
//     VOUCH_COMMENT

// ]


export const CMSURLS = {
  termsOfUse: "https://demo.newmediaguru.co/vouch_dev/api/terms-conditions",
  privacyPolicy: "https://demo.newmediaguru.co/vouch_dev/api/privacy-policy",
  communityGuidelines:
    "https://demo.newmediaguru.co/vouch_dev/api/community-guidelines",
}; 