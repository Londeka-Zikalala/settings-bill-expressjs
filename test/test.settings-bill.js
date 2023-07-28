describe('The bill with settings factory function', function(){
    it('should set the call cost', function(){
        let callSettingsBill = billWithSettings();
           
        assert.equal(callSettingsBill.setCallCost(1.85), 1.85);
        assert.equal(callSettingsBill.setCallCost(2.00),2.00);
    })
    it('should set the sms cost', function(){
        let smsSettingsBill = billWithSettings();
        assert.equal(smsSettingsBill.setSmsCost(0.85),0.85);
        assert.equal(smsSettingsBill.setSmsCost(1.70),1.70);
    })
    
    it('should get the sms cost and the call cost', function(){
        let smsAndCallSettingsBill= billWithSettings();
        smsAndCallSettingsBill.setCallCost(2);
        smsAndCallSettingsBill.setSmsCost(0.85);
        assert.equal(smsAndCallSettingsBill.getCallCost(), 2);
        assert.equal(smsAndCallSettingsBill.getSmsCost(),0.85);
    })
    it('should set the warning and critical level values', function(){
    let criticalAndWarningLevelsSettings = billWithSettings();
    assert.equal(criticalAndWarningLevelsSettings.setWarningLevel(15), 15)
    assert.equal(criticalAndWarningLevelsSettings.setCriticalLevel(25), 25)
    })
    
    
    })
    
    describe('use the Values', function(){
        it('should add all the call costs', function(){
            let callTotalSettingsBill = billWithSettings();
            callTotalSettingsBill.setCriticalLevel(15);
            callTotalSettingsBill.setCallCost(2.50);
            callTotalSettingsBill.makeACall()
            callTotalSettingsBill.makeACall()
            callTotalSettingsBill.makeACall();
        
            assert.equal(callTotalSettingsBill.getCallCostTotal(), 7.5)
        
        })
    
        it('should add all the sms costs', function(){
            let smsTotalSettingsBill = billWithSettings();
            smsTotalSettingsBill.setCriticalLevel(10);
            smsTotalSettingsBill.setSmsCost(0.85);
            smsTotalSettingsBill.sendAnSms();
            smsTotalSettingsBill.sendAnSms();
            smsTotalSettingsBill.sendAnSms();
    
            assert.equal(smsTotalSettingsBill.getSmsCostTotal(), 2.55)
        })
    
        it('should get the the total cost for smses and calls', function(){
            let totalCostSettingsBill = billWithSettings();
            totalCostSettingsBill.setCriticalLevel(20);
            totalCostSettingsBill.setSmsCost(0.85);
            totalCostSettingsBill.setCallCost(2.75);
            totalCostSettingsBill.makeACall();
            totalCostSettingsBill.makeACall();
            totalCostSettingsBill.makeACall();
            totalCostSettingsBill.sendAnSms();
            totalCostSettingsBill.sendAnSms();  
            totalCostSettingsBill.sendAnSms();
            totalCostSettingsBill.sendAnSms();
    
            assert.equal(totalCostSettingsBill.getTotalCost(), 11.65)
          })
    })
    
    describe('Critical and warning level tests', function(){
        it('should return the class name of "warning" when the cost total reaches the warning level value',
        function(){
            let warningLevelSettingsBill = billWithSettings();
            warningLevelSettingsBill.setWarningLevel(15);
            warningLevelSettingsBill.setCriticalLevel(20);
            warningLevelSettingsBill.setCallCost(2.75);
            warningLevelSettingsBill.setSmsCost(0.85);     
            warningLevelSettingsBill.makeACall();
            warningLevelSettingsBill.makeACall();
            warningLevelSettingsBill.makeACall();
            warningLevelSettingsBill.sendAnSms();
            warningLevelSettingsBill.sendAnSms();  
            warningLevelSettingsBill.sendAnSms();
            warningLevelSettingsBill.sendAnSms();
            warningLevelSettingsBill.makeACall();
            warningLevelSettingsBill.sendAnSms();
        
            
    
            assert.equal(warningLevelSettingsBill.getTotalCost(), 15.25)
            assert.equal(warningLevelSettingsBill.totalClassName(), 'warning')
        })
    
        it('should return the class name of "critical" when the cost total reaches the critical level value', function(){
            let criticalLevelSettingsBill = billWithSettings();
            criticalLevelSettingsBill.setWarningLevel(15)
            criticalLevelSettingsBill.setCriticalLevel(20)
            criticalLevelSettingsBill.setCallCost(2.75);
            criticalLevelSettingsBill.setSmsCost(0.85);
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();  
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            
    
            assert.equal(criticalLevelSettingsBill.getTotalCost(), 21.6)
            assert.equal(criticalLevelSettingsBill.totalClassName(), 'danger')
        })
        it('should stop adding the calls once the critical level is reached', function(){
            let criticalLevelSettingsBill = billWithSettings();
            criticalLevelSettingsBill.setCriticalLevel(25.2)
            criticalLevelSettingsBill.setCallCost(2.75);
            criticalLevelSettingsBill.setSmsCost(0.85);
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();  
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            
    
            assert.equal(criticalLevelSettingsBill.getTotalCost(), 25.2)
            assert.equal(criticalLevelSettingsBill.totalClassName(), 'danger')
        })
        it('should continue adding the sms and call total costs after the critical level has been increased', function(){
             let criticalLevelSettingsBill = billWithSettings();
            criticalLevelSettingsBill.setCriticalLevel(25.2)
            criticalLevelSettingsBill.setCallCost(2.75);
            criticalLevelSettingsBill.setSmsCost(0.85);
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();  
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            
    
            assert.equal(criticalLevelSettingsBill.getTotalCost(), 25.2);
            assert.equal(criticalLevelSettingsBill.totalClassName(), 'danger');
    
            criticalLevelSettingsBill.setCriticalLevel(30);
            criticalLevelSettingsBill.sendAnSms();
            criticalLevelSettingsBill.makeACall();
            criticalLevelSettingsBill.sendAnSms();
            
    
            assert.equal(criticalLevelSettingsBill.getTotalCost(), 29.65);
          
    
        })
    })