
export const archetypeDataset = [
  // Absurd
  "Chief Negotiator of Mismatched Socks",
  "Professional Whisperer to Abandoned Shopping Carts",
  "Senior Analyst of Forgotten Wi-Fi Networks",
  "Director of Unfinished Text Messages",
  "Curator of Things That Fall Behind Radiators",
  "Ambassador to the Republic of Lost Pens",
  
  // Cute
  "Keeper of First Smiles",
  "Archivist of Sleepy Cat Photos",
  "Guardian of Birthday Wishes",
  "Collector of Grandmother's Recipes",
  "Shepherd of Paper Airplane Dreams",
  "Librarian of Bedtime Stories",
  
  // Mundane
  "Assistant Manager of Monday Morning Sighs",
  "Coordinator of Elevator Small Talk",
  "Specialist in Grocery List Archaeology",
  "Supervisor of Laundry Procrastination",
  "Analyst of Microwave Beeping Patterns",
  "Administrator of Coffee Shop Queue Psychology",
  
  // Tragic
  "Chronicler of Almost-Loves",
  "Keeper of Last Words Unsaid",
  "Archivist of Empty Photo Frames",
  "Guardian of Childhood Homes Now Demolished",
  "Collector of Unreturned Phone Calls",
  "Historian of Dreams That Didn't Survive Morning",
  
  // Mixed emotions
  "Cartographer of 3AM Thoughts",
  "Curator of Songs That Make You Cry in Supermarkets",
  "Interpreter of Rain Against Windows",
  "Documentarian of Strangers' Laughter",
  "Keeper of Messages Never Sent",
  "Ambassador to the Land of What-Ifs"
];

export const getRandomArchetype = (): string => {
  return archetypeDataset[Math.floor(Math.random() * archetypeDataset.length)];
};

export const getArchetypesByMood = (mood: 'absurd' | 'cute' | 'mundane' | 'tragic') => {
  const ranges = {
    absurd: [0, 6],
    cute: [6, 12],
    mundane: [12, 18],
    tragic: [18, 24]
  };
  
  const [start, end] = ranges[mood];
  return archetypeDataset.slice(start, end);
};
