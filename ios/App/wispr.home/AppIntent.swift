//
//  AppIntent.swift
//  wispr.home
//
//  Created by Faisal Alalaiwat on 23.10.24.
//

import WidgetKit
import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource { "lol" }
    static var description: IntentDescription { "lol" }

    // An example configurable parameter.
    @Parameter(title: "Favorite Emoji", default: "😃")
    var favoriteEmoji: String
}
