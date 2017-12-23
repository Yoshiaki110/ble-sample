var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('Found device with local name: ' + peripheral.advertisement.localName);
//  if (peripheral.advertisement.localName == 'CC2650 SensorTag') {
  if (peripheral.advertisement.localName == 'nut') {
    peripheral.connect(function(error) {
      console.log('connected to peripheral with local name: ' + peripheral.advertisement.localName);
      console.log('connected to peripheral: ' + peripheral.uuid);
      peripheral.discoverServices(null, function(error, services) {
        console.log('discovered the following services: ' + peripheral.advertisement.localName);
        for (var i in services) {
          console.log('  ' + i + ' uuid: ' + services[i].uuid);
        }
        peripheral.disconnect(function(error) {
         console.log('disconnected from peripheral: ' + peripheral.uuid);
        });
      });
    });
  }
});

