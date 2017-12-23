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
      peripheral.discoverServices(['ff00'], function(error, services) {
        var deviceInformationService = services[0];
        console.log('discovered device information service');
        deviceInformationService.discoverCharacteristics(null, function(error, characteristics) {
//        deviceInformationService.discoverCharacteristics(['01ff'], function(error, characteristics) { // なんかうまくいかない
          console.log('discovered the following characteristics:');
          for (var i in characteristics) {
            console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
            var manufacturerNameCharacteristic = characteristics[i];
            manufacturerNameCharacteristic.read(function(error, data) {
              console.log('  manufacture name is: ' + Buffer(data).toString("hex"));
            });
          }
//          peripheral.disconnect(function(error) {
//           console.log('disconnected from peripheral: ' + peripheral.uuid);
//          });
        });
      });
    });
  }
});

