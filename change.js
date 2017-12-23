var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    console.log('connected to peripheral: ' + peripheral.advertisement.localName);
    if (peripheral.advertisement.localName == 'nut') {
      console.log('NUT NUT');
    }
    /*
    peripheral.discoverServices(['1802'], function(error, services) {
      var immediateAlertService = services[0];
      console.log('discovered Immediate Alert service');

      immediateAlertService.discoverCharacteristics(['2a06'], function(error, characteristics) {
        var alertLevelCharacteristic = characteristics[0];
        console.log('discovered Alert Level characteristic');

        // true if for write without response
        alertLevelCharacteristic.write(new Buffer([0x01]), true, function(error) {
          console.log('set alert level to mid (1)');
        });
      });
    });
    */
  });
});

