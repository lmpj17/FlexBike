//
//  CBPeripheral+BTSExtensions.h
//  BluetoothSerial Cordova Plugin
//
//  (c) 2103-2015 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#import <objc/runtime.h>
#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

@interface CBPeripheral(com_megster_bluetoothserial_extension)

@property (nonatomic, retain) NSString *btsAdvertising;
@property (nonatomic, retain) NSNumber *btsAdvertisementRSSI;

-(void)bts_setAdvertisementData:(NSDictionary *)advertisementData RSSI:(NSNumber*)rssi;

@end
