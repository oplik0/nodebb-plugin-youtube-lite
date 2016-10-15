'use strict';
var winston = require('winston');

process.on('uncaughtException', function (err) {
    winston.error('Encountered error while running test suite: ' + err.message);
});

var expect = require("chai").expect;

var youtubeLite = require("../library");

describe( 'Durations', function(){
    describe( 'invalid duration', function(){
        it( 'shouldn\'t crash', function(){
            youtubeLite.parseDuration('hj4hj');
        });
        
    });    
    
    describe('valid durations: ', function(){
        [
            ['PT3H2M31S', '3:02:31'],
            ['P1DT3M', '24:03:00'],
            ['P1D', '24:00:00'],
            ['P', '00:00'],
            ['PT1H', '1:00:00'],
            ['PT1M', '01:00'],
            ['PT1S', '00:01']
        ].every( function( d ){
            var duration = youtubeLite.parseDuration( d[0] );
            
            it('should parse ' + d[0] + ' into ' + d[1], function(){
                expect( duration ).to.exist;
                expect( duration ).not.to.be.NaN;
                expect( youtubeLite.timeToString( duration ) ).to.equal( d[1] );
            });
            return true;
       });
    });
});
