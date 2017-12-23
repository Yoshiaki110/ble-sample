require('date-utils');
function datetimeStr() {
  var now = new Date();
  return now.toFormat('YYYYMMDDHH24MISS');
}
function dateStr() {
  var now = new Date();
  return now.toFormat('YYYYMMDD');
}
function timeStr() {
  var now = new Date();
  return now.toFormat('HH24MI');
}

var noble = require('noble');
noble.on('stateChange', function(state) {
  console.log('stateChange ' + state);
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  var d = { 'id' : peripheral.id, 'name' : peripheral.advertisement.localName, 'rssi' : peripheral.rssi };
  console.log(d);
  if (peripheral.advertisement.localName == 'nut') {
    console.log('find nut!!');
    peripheral.connect(function(error) {
      console.log('connected to peripheral: ' + peripheral.uuid);
      peripheral.discoverServices(['ff00'], function(error, services) {
        var deviceInformationService = services[0];
        console.log('discovered device information service');
        deviceInformationService.discoverCharacteristics(['ff01'], function(error, characteristics) {
          var manufacturerNameCharacteristic = characteristics[0];
          console.log('discovered manufacturer name characteristic');
        });
      });
    });
  }
});

noble.on('warning', function(message) {
  console.log('warning ' + message);
});

noble.on('scanStart', function() {
  console.log('scanStart');
});

noble.on('scanStop', function() {
  console.log('scanStop');
});

function stop() {
  noble.stopScanning();
  console.log(datetimeStr());
  setTimeout(start, 10000);
}
function start() {
  noble.startScanning();
  setTimeout(stop, 50000*2);
}

setTimeout(stop, 50000*2);


