import WidgetKit
import SwiftUI
import Foundation

// MARK: - Data Models

struct DataModel: Codable {
    let dateInfo: DateInfo
    let todoItems: [TodoItem]
    let eventItems: [EventItem]
}

struct DateInfo: Codable {
    let dateString: String
    let dayOfWeek: String
    // Add other properties if needed
}

struct TodoItem: Codable, Identifiable {
    let id: Int
    let text: String
    let completed: Bool
    let editing: Bool
    let isChild: Bool
}

struct EventItem: Codable, Identifiable {
    let id: String
    let title: String
    let desc: String
    let startDate: Int
    let endDate: Int
}

// MARK: - Timeline Provider

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        let placeholderDataModel = DataModel(
            dateInfo: DateInfo(dateString: "01/01/1970", dayOfWeek: "Thursday"),
            todoItems: [],
            eventItems: []
        )
        return SimpleEntry(date: Date(), dataModel: placeholderDataModel)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> Void) {
        let entry = loadEntry()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
        let entry = loadEntry()
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
    }

    private func loadEntry() -> SimpleEntry {
        let dataModel = readDataFromSharedDefaults() ?? DataModel(
            dateInfo: DateInfo(dateString: "N/A", dayOfWeek: "N/A"),
            todoItems: [],
            eventItems: []
        )
        return SimpleEntry(date: Date(), dataModel: dataModel)
    }

    private func readDataFromSharedDefaults() -> DataModel? {
        let sharedDefaults = UserDefaults(suiteName: "group.punk") // Ensure this matches your App Group identifier
        if let jsonString = sharedDefaults?.string(forKey: "demo") {
            if let jsonData = jsonString.data(using: .utf8) {
                do {
                    let decoder = JSONDecoder()
                    let dataModel = try decoder.decode(DataModel.self, from: jsonData)
                    print(dataModel);
                    return dataModel
                } catch {
                    print("Error decoding JSON data: \(error)")
                }
            }
        }
        return nil
    }
}

// MARK: - Timeline Entry

struct SimpleEntry: TimelineEntry {
    let date: Date
    let dataModel: DataModel
}

// MARK: - Widget View

struct WidgetEntryView: View {
    var entry: Provider.Entry
    init(entry: Provider.Entry) {
        self.entry = entry

        // Print all font family names and font names
        //for family in UIFont.familyNames {
          //  print("Family: \(family)")
            //let names = UIFont.fontNames(forFamilyName: family)
            //print("Font names: \(names)")
//        }
    }
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .center) {
                Image("AppIcon")
                                      .resizable()
                                      .aspectRatio(contentMode: .fit)
                                      .frame(width: 30, height: 30) // Adjust size as needed
                Spacer()
                Text("\(entry.dataModel.dateInfo.dayOfWeek) : \(entry.dataModel.dateInfo.dateString)")
                    .font(.custom("GohuFontUni11NFM", size: 16))
            }
            
            HStack(alignment: .center) {
                Line()
                  .stroke(style: StrokeStyle(lineWidth: 1, dash: [3]))
                  .frame(height: 1)
            }
            .padding(.vertical, 5)

            // Event Items
            if !entry.dataModel.eventItems.isEmpty {
                VStack(alignment: .center) {
                    ForEach(entry.dataModel.eventItems.prefix(4)) { event in
                        HStack(alignment: .center ) {
                            Text("󰇝 \(event.title)")
                                .font(Font.custom("GohuFontUni11NFM", size: 14))
                                .foregroundColor(.white)
                            Spacer()
                            
                            Text("| \(formatTime(event.startDate)) - \(formatTime(event.endDate))")
                                .font(Font.custom("GohuFontUni11NFM", size: 14))
                                .foregroundColor(.white)
                        }
                        .padding(.vertical, 2)
                    }
                }
                .padding(.vertical, 5)
            }

            // Todo Items
            if !entry.dataModel.todoItems.isEmpty {
                VStack(alignment: .center) {
                    ForEach(entry.dataModel.todoItems.prefix(7)) { todo in
                        if (!todo.completed) {
                            let text = "  " + todo.text
                            HStack(alignment:.center) {
                                Text(text)
                                    .font(.custom("GohuFontUni11NFM", size: 14))
                                    .foregroundColor(.white)
                                    .strikethrough(todo.completed, color: .white)
                                Spacer()
                            }
                            .padding(.vertical, 0.5)
                        }
                    }
                    ForEach(entry.dataModel.todoItems.prefix(7)) { todo in
                        if (todo.completed) {
                            let text =  "  " + todo.text
                            HStack(alignment:.center) {
                                Text(text)
                                    .font(.custom("GohuFontUni11NFM", size: 14))
                                    .foregroundColor(.gray)
                                Spacer()
                            }
                            .padding(.vertical, 0.5)
                        }
                    }
                }
                .padding(.top, 5)
            }

            Spacer()
        }
        .foregroundColor(.white)
        .containerBackground(for: .widget) {
            Color.black
        }
        .background(Color.black)
    }

    // Helper function to format time
    func formatTime(_ timestamp: Int) -> String {
        let date = Date(timeIntervalSince1970: TimeInterval(timestamp))
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

struct Line: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: 0, y: 0))
        path.addLine(to: CGPoint(x: rect.width, y: 0))
        return path
    }
}
// MARK: - Widget Configuration

struct wispr_home: Widget {
    let kind: String = "items"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Today's Items")
        .description("Show today's events and todos")
    }
}

// MARK: - Preview Provider

struct MyJSONWidget_Previews: PreviewProvider {
    static var previews: some View {
        let sampleDataModel = DataModel(
            dateInfo: DateInfo(dateString: "10/24/2023", dayOfWeek: "Tuesday"),
            todoItems: [
                TodoItem(id: 1, text: "Finish report", completed: false,
                         editing: false,isChild: false ),
                TodoItem(id: 2, text: "Call Alice", completed: true, editing:
                            false, isChild: false)
            ],
            eventItems: [
                EventItem(id: "event1", title: "Meeting with Bob", desc: "Discuss project status", startDate: Int(Date().timeIntervalSince1970), endDate: Int(Date().addingTimeInterval(3600).timeIntervalSince1970))
            ]
        )
        
        WidgetEntryView(entry: SimpleEntry(date: Date(), dataModel: sampleDataModel))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
