const { widget } = figma;
const { 
  AutoLayout, 
  Text, 
  Input,
  useSyncedState,
  useEffect
} = widget;

interface Note {
  id: string;
  text: string;
  color: string;
  timestamp: number;
}

const COLORS = [
  { name: "Blue", bg: "#E3F2FF", border: "#0D99FF" },
  { name: "Purple", bg: "#F3E5FF", border: "#9333EA" },
  { name: "Pink", bg: "#FFE5F3", border: "#EC4899" },
  { name: "Yellow", bg: "#FFF9E5", border: "#F59E0B" },
  { name: "Green", bg: "#E5FFE9", border: "#10B981" },
];

function Widget() {
  const [notes, setNotes] = useSyncedState<Note[]>("notes", []);
  const [newNoteText, setNewNoteText] = useSyncedState<string>("newNoteText", "");
  const [selectedColor, setSelectedColor] = useSyncedState<number>("selectedColor", 0);

  // Load fonts on mount
  useEffect(() => {
    figma.loadFontAsync({ family: "Inter", style: "Regular" });
  });

  const addNote = () => {
    if (!newNoteText.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      color: COLORS[selectedColor].name,
      timestamp: Date.now()
    };
    
    setNotes([note, ...notes]);
    setNewNoteText("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getColorScheme = (colorName: string) => {
    return COLORS.find(c => c.name === colorName) || COLORS[0];
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={16}
      padding={20}
      fill="#FFFFFF"
      cornerRadius={12}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 4 },
        blur: 12,
      }}
      width={400}
    >
      {/* Header */}
      <AutoLayout
        direction="vertical"
        spacing={8}
        width="fill-parent"
      >
        <Text
          fontSize={24}
          fontWeight={700}
          fill="#000000"
        >
          📝 Quick Notes
        </Text>
        <Text
          fontSize={12}
          fill="#666666"
        >
          Add quick notes that stay on your canvas
        </Text>
      </AutoLayout>

      {/* New Note Input */}
      <AutoLayout
        direction="vertical"
        spacing={12}
        padding={16}
        fill="#F5F5F5"
        stroke="#eeeeee"
        strokeWidth={1}
        cornerRadius={8}
        width="fill-parent"
      >
        <Input
          value={newNoteText}
          placeholder="Add a quick note"
          onTextEditEnd={(e) => setNewNoteText(e.characters)}
          fontSize={14}
          fill="#000000"
          width="fill-parent"
          fontFamily="Inter"
          fontWeight={400}
          placeholderProps={{
            fontFamily: "Inter",
            fontWeight: 400,
          }}
          inputFrameProps={{
            fill: "#FFFFFF",
            stroke: "#eeeeee",
            strokeWidth: 1,
            cornerRadius: 6,
            padding: { vertical: 10, horizontal: 12 },
          }}
          inputBehavior="multiline"
        />

        {/* Color Picker */}
        <AutoLayout
          direction="horizontal"
          spacing={8}
          width="fill-parent"
        >
          <Text fontSize={12} fill="#666666">Color:</Text>
          {COLORS.map((color, index) => (
            <AutoLayout
              key={color.name}
              onClick={() => setSelectedColor(index)}
              padding={4}
              cornerRadius={4}
              fill={selectedColor === index ? "#E5E5E5" : "#FFFFFF"}
              hoverStyle={{
                fill: "#F0F0F0"
              }}
            >
                <AutoLayout
                  width={20}
                  height={20}
                  cornerRadius={10}
                  fill={color.bg}
                  stroke={color.border}
                  strokeWidth={2}
                />
            </AutoLayout>
          ))}
        </AutoLayout>

        {/* Add Button */}
        <AutoLayout
          onClick={addNote}
          fill={newNoteText.trim() ? "#0D99FF" : "#CCCCCC"}
          cornerRadius={6}
          padding={{ vertical: 10, horizontal: 16 }}
          horizontalAlignItems="center"
          width="fill-parent"
          hoverStyle={newNoteText.trim() ? {
            fill: "#0B7FD9"
          } : undefined}
        >
          <Text
            fontSize={14}
            fontWeight={600}
            fill="#FFFFFF"
          >
            ➕ Add Note
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Notes List */}
      {notes.length > 0 ? (
        <AutoLayout
          direction="vertical"
          spacing={12}
          width="fill-parent"
        >
          <Text fontSize={12} fill="#666666" fontWeight={600}>
            YOUR NOTES ({notes.length})
          </Text>
          
          <AutoLayout
            direction="vertical"
            spacing={10}
            width="fill-parent"
          >
            {notes.map((note) => {
              const colors = getColorScheme(note.color);
              return (
              <AutoLayout
                key={note.id}
                direction="vertical"
                spacing={8}
                padding={12}
                fill={colors.bg}
                cornerRadius={8}
                width="fill-parent"
                stroke={colors.border}
                strokeWidth={2}
              >
                  {/* Note Content */}
                  <Text
                    fontSize={13}
                    fill="#000000"
                    width="fill-parent"
                  >
                    {note.text}
                  </Text>

                  {/* Note Footer */}
                  <AutoLayout
                    direction="horizontal"
                    spacing="auto"
                    width="fill-parent"
                    verticalAlignItems="center"
                  >
                    <Text fontSize={10} fill="#666666">
                      {formatTime(note.timestamp)}
                    </Text>

                    {/* Delete Button */}
                    <AutoLayout
                      onClick={() => deleteNote(note.id)}
                      padding={{ vertical: 4, horizontal: 8 }}
                      cornerRadius={4}
                      fill="#F24822"
                      hoverStyle={{
                        fill: "#D63D1A"
                      }}
                    >
                      <Text fontSize={10} fill="#FFFFFF" fontWeight={600}>
                        🗑 Delete
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
              );
            })}
          </AutoLayout>
        </AutoLayout>
      ) : (
        <AutoLayout
          padding={30}
          horizontalAlignItems="center"
          width="fill-parent"
        >
          <Text
            fontSize={13}
            fill="#999999"
            horizontalAlignText="center"
          >
            No notes yet. Add your first note above! 👆
          </Text>
        </AutoLayout>
      )}

      {/* Footer */}
      <AutoLayout
        direction="horizontal"
        spacing={8}
        horizontalAlignItems="center"
        width="fill-parent"
      >
        <Text fontSize={10} fill="#999999">
          💡 Tip: Move this widget around to organize your notes
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
