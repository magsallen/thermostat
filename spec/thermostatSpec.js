// 'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increases the temperature', function(){
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decreases the temperature', function(){
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('should have a minimum temperature of 10 degrees', function(){
    for (var i = 0; i < 10; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('power saving mode should be implemented as default', function(){
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('power saving mode can be turned off', function(){
    thermostat.turnPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('power saving mode can be tured back on', function(){
    thermostat.turnPowerSavingModeOff();
    thermostat.turnPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('power saving mode', function(){
    it('when PSM is on the max temperature is 25 degrees', function(){
      thermostat.turnPowerSavingModeOn();
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
    it('when PSM is off the max temperature is 32 degrees', function(){
      thermostat.turnPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  it('can be reset to the default temperature', function(){
    for (var i = 0; i < 6; i++){
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  describe('displaying energy usage', function(){
    describe('when the temperature is below 18 degrees', function(){
      it('is considered low-usage', function(){
        for (var i = 0; i < 3; i++){
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
    describe('when the temperature is between 18 and 25 degrees', function(){
      it('is considered medium-usage', function(){
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });
    describe('when the temperature is above 25 degrees', function(){
      it('is considered high-usage', function(){
        thermostat.powerSavingMode = false;
        for (var i = 0; i < 6; i++){
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});
