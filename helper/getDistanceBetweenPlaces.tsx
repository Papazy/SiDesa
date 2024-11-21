export const getDistanceBetweenPlaces = (current : any, destination : any) => {
  const toRadians = (degree : any) => (degree * Math.PI) / 180;
  
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(destination.latitude - current.latitude);
  const dLon = toRadians(destination.longitude - current.longitude);

  const lat1 = toRadians(current.latitude);
  const lat2 = toRadians(destination.latitude);

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 
  return distance;
};
