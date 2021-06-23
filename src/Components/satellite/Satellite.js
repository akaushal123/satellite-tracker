import satellite from 'satellite.js';

export const Satellite = (tleLine1, tleLine2, time) => {

    // Initialize a satellite record
    let satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    //  Propagate satellite using time since epoch (in minutes).
    let positionAndVelocity = satellite.sgp4(satrec, time);

    // The position_velocity result is a key-value pair of ECI coordinates.
    // These are the base results from which all other coordinates are derived.
    let positionEci = positionAndVelocity.position;
    let velocityEci = positionAndVelocity.velocity;

    // Set the Observer at 122.03 West by 36.96 North, in RADIANS
    let observerGd = {
        longitude: satellite.degreesToRadians(-122.0308),
        latitude: satellite.degreesToRadians(36.9613422),
        height: 0.370
    };

// You will need GMST for some of the coordinate transforms.
// http://en.wikipedia.org/wiki/Sidereal_time#Definition
    let gmst = satellite.gstime(new Date());

// You can get ECF, Geodetic, Look Angles, and Doppler Factor.
    let positionEcf   = satellite.eciToEcf(positionEci, gmst),
        observerEcf   = satellite.geodeticToEcf(observerGd),
        positionGd    = satellite.eciToGeodetic(positionEci, gmst),
        lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf),
        dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);

// The coordinates are all stored in key-value pairs.
// ECI and ECF are accessed by `x`, `y`, `z` properties.
    let satelliteX = positionEci.x,
        satelliteY = positionEci.y,
        satelliteZ = positionEci.z;

// Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
    let azimuth   = lookAngles.azimuth,
        elevation = lookAngles.elevation,
        rangeSat  = lookAngles.rangeSat;

// Geodetic coords are accessed via `longitude`, `latitude`, `height`.
    let longitude = positionGd.longitude,
        latitude  = positionGd.latitude,
        height    = positionGd.height;

//  Convert the RADIANS to DEGREES.
    let longitudeDeg = satellite.degreesLong(longitude),
        latitudeDeg  = satellite.degreesLat(latitude);

}