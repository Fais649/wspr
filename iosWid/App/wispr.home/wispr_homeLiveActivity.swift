//
//  wispr_homeLiveActivity.swift
//  wispr.home
//
//  Created by Faisal Alalaiwat on 23.10.24.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct wispr_homeAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct wispr_homeLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: wispr_homeAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension wispr_homeAttributes {
    fileprivate static var preview: wispr_homeAttributes {
        wispr_homeAttributes(name: "World")
    }
}

extension wispr_homeAttributes.ContentState {
    fileprivate static var smiley: wispr_homeAttributes.ContentState {
        wispr_homeAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: wispr_homeAttributes.ContentState {
         wispr_homeAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: wispr_homeAttributes.preview) {
   wispr_homeLiveActivity()
} contentStates: {
    wispr_homeAttributes.ContentState.smiley
    wispr_homeAttributes.ContentState.starEyes
}
