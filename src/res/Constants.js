/**
* @description:This is constants file
* @author:Aman Sharma
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Aman Sharma
* @modified_on:25/06/2021
*/

export default {

    regex: {
        email: /^(([^<>()\[\]\\.,;:-\s@"]+(\.[^<>()\[\]\\.,;:-\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        alphabet: /^[A-Z. ]+$/i,
        password:  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
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
    s3Bucket: {
        keyPrefix: 'prefix - /',
        bucket: 'wealth-concert-image-bucket-prod',
        accessKey: 'AKIA5YUNER7W4EKKY546',
        secretKey: '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'
    }

}