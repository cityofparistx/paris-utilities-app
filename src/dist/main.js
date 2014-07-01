map = L.map('map', {
    center: new L.LatLng(33.66099, -95.556742),
    zoom: 12,
    minZoom: 10,
    inertia: true,
    attributionControl: false,
	zoomAnimation: true,
	fadeAnimation: true
});

//L.esri.basemapLayer('Gray').addTo(map);
//var ggl = new L.Google();
//map.addLayer(ggl);

var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "Red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

/*
    Feature Layers: Water Utilities
    Data Service: ArcGIS Online
*/

//Water Mains
var waterMainLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/water/FeatureServer/9', {
    minZoom: 17,
    maxZoom: 20,
    style: { color: "Blue" }
});


//Water Hydrants
var waterHydrantLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/water/FeatureServer/2', {
    minZoom: 16,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) {  
            hydrantStyle = geojsonMarkerOptions;
            hydrantStyle.fillColor = "Red";
            return L.circleMarker(latlng, hydrantStyle);
        }
});


//Water System Valves
var waterValveLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/water/FeatureServer/4', {
    minZoom: 19,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) { 
            valveStyle = geojsonMarkerOptions;
            valveStyle.fillColor = "Blue";
            return L.circleMarker(latlng, valveStyle);
        }
});

//Water Fittings
var waterFittingLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/water/FeatureServer/5', {
    minZoom: 20,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) { 
            wfittingStyle = geojsonMarkerOptions;
            wfittingStyle.fillColor = "Purple";     
            return L.circleMarker(latlng, wfittingStyle);
        }
});

//Water Meters
var waterMeterLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/water/FeatureServer/3', {
    minZoom: 19,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) {
            meterStyle = geojsonMarkerOptions;
            meterStyle.fillColor = "Green";
            return L.circleMarker(latlng, meterStyle);
        }
});

/*
    Feature Layers: Sewer Utilities
    Data Service: ArcGIS Online
*/

//Sewer Gravity Mains
var sewerGravityMainLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/10', {
    minZoom: 17,
    maxZoom: 20,
    style: { color: "Green" }
});

//Sewer Force Main
var sewerForceMainLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/8', {
    minZoom: 17,
    maxZoom: 20,
    style: { color: "Red" }
});

//Sewer Lift Stations
var sewerLiftStationLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/4', {
    minZoom: 12,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) {  
            liftStationStyle = geojsonMarkerOptions;
            liftStationStyle.fillColor = "Gray";
            return L.circleMarker(latlng, liftStationStyle);
        }
});

//Sewer Fittings
var sewerFittingLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/3', {
    minZoom: 20,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) {  
            sfittingStyle = geojsonMarkerOptions;
            sfittingStyle.fillColor = "Purple";
            return L.circleMarker(latlng, sfittingStyle);
        }
});

//Sewer Cleanout
var sewerCleanoutLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/1', {
    minZoom: 17,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) {  
            cleanoutStyle = geojsonMarkerOptions;
            cleanoutStyle.fillColor = "Orange";
            return L.circleMarker(latlng, cleanoutStyle);
        }
});

//Sewer Manholes
var sewerManholeLayer = L.esri.featureLayer('http://services2.arcgis.com/YXGc5lG6eRCB6XBL/arcgis/rest/services/sewer/FeatureServer/5', {
    minZoom: 17,
    maxZoom: 20,
    pointToLayer: function (feature, latlng) { 
            manholeStyle = geojsonMarkerOptions;
            manholeStyle.fillColor = "Yellow";
            return L.circleMarker(latlng, manholeStyle);
        }
});

/*
    Group Layers and Map Controls
*/

var waterLayerGroup = new L.layerGroup();
waterLayerGroup.addLayer(waterMainLayer);
waterLayerGroup.addLayer(waterHydrantLayer);
waterLayerGroup.addLayer(waterFittingLayer);
waterLayerGroup.addLayer(waterValveLayer);
waterLayerGroup.addLayer(waterMeterLayer);

var sewerLayerGroup = new L.layerGroup();
sewerLayerGroup.addLayer(sewerGravityMainLayer);
sewerLayerGroup.addLayer(sewerForceMainLayer);
sewerLayerGroup.addLayer(sewerLiftStationLayer);
sewerLayerGroup.addLayer(sewerFittingLayer);
sewerLayerGroup.addLayer(sewerCleanoutLayer);
sewerLayerGroup.addLayer(sewerManholeLayer);

var mapControl = L.control.layers();
mapControl.addOverlay(waterLayerGroup, "Water");
mapControl.addOverlay(sewerLayerGroup, "Sewer");
mapControl.addTo(map);

/*
 Important Note:
 To properly remove the cache version of Esri feature layers
 at specific zoom layers, they must manually be removed and added
 to the map.
*/
map.on('zoomend', function(e) {
    if (map.getZoom() <= 15) {
        waterLayerGroup.removeLayer(waterHydrantLayer);
        waterLayerGroup.addLayer(waterHydrantLayer);
        
    }
    if (map.getZoom() <= 16) {
        sewerLayerGroup.removeLayer(sewerCleanoutLayer);
        sewerLayerGroup.addLayer(sewerCleanoutLayer);
        
        sewerLayerGroup.removeLayer(sewerManholeLayer);
        sewerLayerGroup.addLayer(sewerManholeLayer);
        
        waterLayerGroup.removeLayer(waterMainLayer);
        waterLayerGroup.addLayer(waterMainLayer);
    
        sewerLayerGroup.removeLayer(sewerGravityMainLayer);
        sewerLayerGroup.addLayer(sewerGravityMainLayer);
        
        sewerLayerGroup.removeLayer(sewerForceMainLayer);
        sewerLayerGroup.addLayer(sewerForceMainLayer);

    }
    if (map.getZoom() <= 18) {
        waterLayerGroup.removeLayer(waterValveLayer);
        waterLayerGroup.addLayer(waterValveLayer);
        
        waterLayerGroup.removeLayer(waterMeterLayer);
        waterLayerGroup.addLayer(waterMeterLayer);
    }
    if (map.getZoom() <= 19) {
        waterLayerGroup.removeLayer(waterFittingLayer);
        waterLayerGroup.addLayer(waterFittingLayer);
        
        sewerLayerGroup.removeLayer(sewerFittingLayer);
        sewerLayerGroup.addLayer(sewerFittingLayer);
    }
});
