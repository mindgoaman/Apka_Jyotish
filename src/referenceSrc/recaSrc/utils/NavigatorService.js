import { NavigationActions } from 'react-navigation';
let _navigator;

function setTopLevelNavigator(navigatorRef){
    _navigator = navigatorRef;
}

function navigate(routeName,) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
        })
    );
}

function toggleMenu() {
}

function updateuserDetailsMenu(image, name) {

}

export default {
  navigate,
  setTopLevelNavigator,
  toggleMenu,
  updateuserDetailsMenu
};