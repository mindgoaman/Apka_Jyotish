import {
    onboarding1,
    onboarding2,
    onboarding3,
    onboarding4
} from '../../utils/images'
import { localization } from '../../utils/localization'

export function onboardingData() {
    const onBoardingItems = [
        { 'title': localization.onboarding_title1, 'desc': localization.onboarding_desc1, 'image': onboarding1 },
        { 'title': localization.onboarding_title2, 'desc': localization.onboarding_desc2, 'image': onboarding2 },
        { 'title': localization.onboarding_title3, 'desc': localization.onboarding_desc3, 'image': onboarding3 },
        { 'title': localization.onboarding_title4, 'desc': localization.onboarding_desc4, 'image': onboarding4 }]
    return onBoardingItems
}