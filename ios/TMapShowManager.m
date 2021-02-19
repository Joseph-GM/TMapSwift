//
//  TMapShowManager.m
//  TMapSwift
//
//  Created by Joseph Kim on 2021/01/14.
//

#import <Foundation/Foundation.h>

#import "React/RCTViewManager.h"
@interface RCT_EXTERN_MODULE(TMapShowManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(zoom, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(clatitude, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(clongitude, NSNumber)
@end
