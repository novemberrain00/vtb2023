const getData = async (url) => {
     
    const response = await fetch(`http://51.250.111.230/api/v1${url || ''}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let json;

    if (response.ok) { 
        json = await response.json();
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }

    return json;
}

const postData = async (url, body) => {
    const response = await fetch(`http://51.250.111.230/api/v1${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
};

const getDistanceBetweenPoints = (coordsArr1, coordsArr2) => {
    const [lat1, lon1] = coordsArr1,
        [lat2, lon2] = coordsArr2;

    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;

}

export { getData, postData, getDistanceBetweenPoints };