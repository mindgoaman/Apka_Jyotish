import getDirections from "react-native-google-maps-directions";
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";
import { GetDistanceService } from "../services/GetDistanceService";
import { localization } from "./localization";
import { GET_DISTANCE_GOOGLE_DISTANCE_MATRIX_API } from "../utils/apiconfig";

var currentLat = 0;
var currentLong = 0;

const getCurrentlatLong = () => {
  //Checking for the permission just after component loaded
  if (Platform.OS === "ios") {
    callLocation();
  } else {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location"
          }
        );
        if (
          granted === true ||
          granted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          //To Check, If Permission is granted
          callLocation();
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        // console.log("err", err)
      }
    }
    requestLocationPermission();
  }
};

const callLocation = () => {
  Geolocation.getCurrentPosition(
    //Will give you the current location
    position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);
      currentLat = currentLatitude;
      currentLong = currentLongitude;
    },
    error => console.log(error),
    Platform.OS === "android"
      ? {}
      : { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
  );
};

const getPropertyDirections = (sourceLat, sourceLong, destLat, destLong) => {
  const data = {
    source: {
      latitude: parseFloat(sourceLat),
      longitude: parseFloat(sourceLong)
    },
    destination: {
      latitude: parseFloat(destLat),
      longitude: parseFloat(destLong)
    },
    params: [
      {
        key: "travelmode",
        value: "driving"
      }
    ]
  };
  getDirections(data);
};

const getPropertyDirectionsWithDest = (destLat, destLong) => {
  const data = {
    source: {
      latitude: parseFloat(currentLat),
      longitude: parseFloat(currentLong)
    },
    destination: {
      latitude: parseFloat(destLat),
      longitude: parseFloat(destLong)
    },
    params: [
      {
        key: "travelmode",
        value: "driving"
      }
    ]
  };
  getDirections(data);
};

const getAllPropertiesDirections = items => {
  var waypointsDict = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].latitude != "" && items[i].longitude != "") {
      const distance = distanceInKmBetweenEarthCoordinates(
        parseFloat(currentLat),
        parseFloat(currentLong),
        parseFloat(items[i].latitude),
        parseFloat(items[i].longitude)
      );

      waypointsDict.push({
        latitude: parseFloat(items[i].latitude),
        longitude: parseFloat(items[i].longitude),
        distance: parseFloat(distance)
      });
    }
  }

  let sortedArr = sortArray(waypointsDict);
  var distanceKeyRemovedArr = removeKeyFromArrayObj(sortedArr);

  const largestLat = parseFloat(
    distanceKeyRemovedArr[distanceKeyRemovedArr.length - 1].latitude
  );
  const largestLong = parseFloat(
    distanceKeyRemovedArr[distanceKeyRemovedArr.length - 1].longitude
  );

  const lastRemovedArr = distanceKeyRemovedArr.splice(
    0,
    distanceKeyRemovedArr.length - 1
  );

  const data = {
    source: {
      latitude: parseFloat(currentLat),
      longitude: parseFloat(currentLong)
    },
    destination: {
      latitude: largestLat,
      longitude: largestLong
    },
    params: [
      {
        key: "travelmode",
        value: "driving"
      }
    ],
    waypoints: lastRemovedArr
  };
  getDirections(data);
};

// Distance Matrix API 
export function getDistanceFromCurrentLocation(lat2, lon2) {
  let BaseLocation = `${currentLat},${currentLong}`;
  let TargetLocation = `${lat2},${lon2}`;

  let params = `origins=${BaseLocation}&destinations=${TargetLocation}&key=${localization.GOOGLE_PLACES_API_KEY}`;
   alert(params)
  let finalApiURL = `${GET_DISTANCE_GOOGLE_DISTANCE_MATRIX_API}${encodeURI(
    params
  )}`;
  
  return fetch(finalApiURL)
    .then(response => response.json())
    .then(responseData => {
      if (responseData.status == "OK") {
        for (var i = 0; i < 1; i++) {
          for (var j = 0; j < 1; j++) {
            if (responseData.rows[0].elements[j].status == "OK") {
              var distanceKm = responseData.rows[i].elements[j].distance.text;
              return distanceKm;
            } else {
              //  console.log(destination + ' is not reachable by land from ' + origin);
              return `${calculateDistanceFromCurrentLocation(lat2, lon2)}`;
            }
          }
        }
      } else if (responseData.status == "ZERO_RESULTS") {
        return `${calculateDistanceFromCurrentLocation(lat2, lon2)}`;
      }
    })
    .catch(error => {
      console.error(error);
      return "none";
    });
}

export function removeKeyFromArrayObj(data) {
  var newDict = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    delete item["distance"];
    newDict.push(item);
  }
  return newDict;
}

export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (parseFloat(earthRadiusKm * c)*.62).toFixed(2);
  // return Math.round(earthRadiusKm*c*62)
}

export function calculateDistanceFromCurrentLocation(lat2, lon2) {
  console.log(currentLat, currentLong, lat2, lon2)
  var earthRadiusKm = 6371;
  var dLat = degreesToRadians(parseFloat(lat2) - parseFloat(currentLat));
  var dLon = degreesToRadians(parseFloat(lon2) - parseFloat(currentLong));

  lat1 = degreesToRadians(parseFloat(currentLat));
  lat2 = degreesToRadians(parseFloat(lat2));

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // return parseFloat(earthRadiusKm * c)*.62.toFixed(2);
  return (parseFloat(earthRadiusKm * c)*.62).toFixed(2);
  // return Math.round(earthRadiusKm*c*62)
}
// parseFloat("123.456").toFixed(2);
export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function sortArray(waypointsDict) {
  waypointsDict.sort(function(a, b) {
    return a.distance - b.distance;
  });
  return waypointsDict;
}

export {
  getPropertyDirections,
  getCurrentlatLong,
  callLocation,
  getPropertyDirectionsWithDest,
  getAllPropertiesDirections
};




