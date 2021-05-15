
ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [53.902287, 27.561824],
        zoom: 7
    });
    myPlacemark = new ymaps.Placemark([53.890080, 27.557074], {
        balloonContentHeader: 'ff',
        balloonContentBody: "Содержимое <em>балуна</em> метки",
        balloonContentFooter: "Подвал",
        hintContent: "Хинт метки"
    });

    myMap.geoObjects.add(myPlacemark);
}
