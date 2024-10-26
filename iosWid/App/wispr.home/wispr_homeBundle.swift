//
//  wispr_homeBundle.swift
//  wispr.home
//
//  Created by Faisal Alalaiwat on 23.10.24.
//

import WidgetKit
import SwiftUI

@main
struct wispr_homeBundle: WidgetBundle {
    var body: some Widget {
        wispr_home()
        wispr_homeControl()
        wispr_homeLiveActivity()
    }
}
