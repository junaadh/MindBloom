import JournalScreen from "@/components/JournalScreen";
const JOURNAL_ENTRIES = [
  {
    id: "today-1",
    date: "Today",
    day: "Thursday",
    extendedDate: "July 17, 2025",
    time: "10:32 AM",
    mood: "Grateful",
    content: "I’m feeling grateful for the great things in life today.",
    icon: "📝",
    summary:
      "Feeling thankful and reflective about the positive aspects of life.",
    detailed:
      "I’m feeling grateful for the great things in life today. It's important to pause and appreciate what I have.",
  },
  {
    id: "yesterday-1",
    date: "Yesterday",
    day: "Wednesday",
    extendedDate: "July 16, 2025",
    time: "20:45 PM",
    mood: "Celebrating a small victory",
    content:
      "I presented a business pitch in front of a huge crowd. Everything went well.",
    icon: "🎉",
    summary: "Successfully delivered a pitch, boosting confidence and joy.",
    detailed:
      "I presented a business pitch in front of a huge crowd. Everything went well. I was nervous but pushed through and I'm proud of myself.",
  },
  {
    id: "yesterday-2",
    date: "Yesterday",
    day: "Wednesday",
    extendedDate: "July 16, 2025",
    time: "16:15 PM",
    mood: "Energized",
    content: "I had a great workout and feeling energized.",
    icon: "💪",
    summary: "Energized after a fulfilling workout session.",
    detailed:
      "I had a great workout and feeling energized. It reminded me how movement clears my mind and fuels my motivation.",
  },
];


// const JOURNAL_ENTRIES = [
//   {
//     id: "today-1",
//     date: "Today",
//     day: "Thursday",
//     extendedDate: "July 17, 2025",
//     time: "10:32 AM",
//     mood: "Grateful",
//     content: "I’m feeling grateful for the great things in life today.",
//     icon: "📝",
//     summary:
//       "Feeling thankful and reflective about the positive aspects of life.",
//     detailed:
//       "I’m feeling grateful for the great things in life today. It's important to pause and appreciate what I have.",
//   },
//   {
//     id: "yesterday-1",
//     date: "Yesterday",
//     day: "Wednesday",
//     extendedDate: "July 16, 2025",
//     time: "20:45 PM",
//     mood: "Celebrating a small victory",
//     content:
//       "I presented a business pitch in front of a huge crowd. Everything went well.",
//     icon: "🎉",
//     summary: "Successfully delivered a pitch, boosting confidence and joy.",
//     detailed:
//       "I presented a business pitch in front of a huge crowd. Everything went well. I was nervous but pushed through and I'm proud of myself.",
//   },
//   {
//     id: "yesterday-2",
//     date: "Yesterday",
//     day: "Wednesday",
//     extendedDate: "July 16, 2025",
//     time: "16:15 PM",
//     mood: "Energized",
//     content: "I had a great workout and feeling energized.",
//     icon: "💪",
//     summary: "Energized after a fulfilling workout session.",
//     detailed:
//       "I had a great workout and feeling energized. It reminded me how movement clears my mind and fuels my motivation.",
//   },
// ];

export default function Home() {
  return <JournalScreen />;
}
