
ymaps.ready(init);
function init() {
    var geolocation = ymaps.geolocation, myMap = new ymaps.Map("map", {
        center: [53.902287, 27.561824],
        zoom: 12
    }, {
            searchControlProvider: 'yandex#search'
        });
    var i;   
    for (i = 0; i < l1.length; ++i) {
        pl = new ymaps.Placemark([l1[i],l2[i]], {
            balloonContentHeader:" "+ lname[i],
            balloonContentFooter: "<a href='./shop/info?x=" + l1[i] + "&y=" + l2[i]+"'>"+ ladr[i]+"</a>",
            hintContent: " "+lname[i]
        }); 

        myMap.geoObjects.add(pl);
    }
    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
    });
}