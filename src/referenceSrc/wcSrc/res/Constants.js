/**
* @description:This is constants file
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:20/05/2021
*/

export default {

    regex: {
         email: /^(([^<>()\[\]\\.,;:-\s@"]+(\.[^<>()\[\]\\.,;:-\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         alphabet: /^[A-Z. ]+$/i,
         password:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/
    },
    common: {
         noInternetError: 'Please check your internet connection',
    },
    storage_keys: {
         USER_PROFILE: "userProfile",
         USER_TOKEN: 'userToken',
         USER_EMAIL_VERIFIED: "userEmailVerified",
         FCM_TOKEN: "fcm_token",
    },
    prodS3Bucket: {
         keyPrefix: 'prefix - /',
         bucket: 'wealth-concert-image-bucket-prod',
         accessKey: 'AKIA5YUNER7W4EKKY546',
        secretKey: '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'
    },
    devS3Bucket: {
         keyPrefix: 'prefix - /',
         bucket: 'wealth-concert-image-bucket',
         accessKey: 'AKIAUJGT6HVJMUWOPK2I',
         secretKey: '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'
    },
    pubNub: {
         subscribeKey: "sub-c-6c96a5ba-c49f-11eb-9292-4e51a9db8267",
         publishKey: "pub-c-1fefa3fd-fb71-4ca6-849c-b6b38fe404c4",
    },
    notificationRedirection: {
         groupInvitationListing: '1001',
         groupListing: '1002',
         groupDetails: '1003',
         groupChat: '1006',
         personalChat: '1007'

    },
    chat: {
         personal_chat: 'PERSONAL_CHAT',
         group_chat: 'GROUP_CHAT'

    },
    updateNavigationURL: {
         appStoreURL: 'https://www.apple.com/in/app-store/',
         playStoreURL: 'https://play.google.com/store?utm_source=apac_med&utm_medium=hasem&utm_content=Aug1621&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Aug1621-Text_Search_BKWS-BKWS%7cONSEM_kwid_43700058914955321_creativeid_480977427755_device_c&gclid=CjwKCAjwy7CKBhBMEiwA0Eb7ahXPV5ZaZhlc6QSQy788G8VBRQyp9FICcPPkbEDnzLth0vPNnyNN3xoCQUAQAvD_BwE&gclsrc=aw.ds'
    }

}