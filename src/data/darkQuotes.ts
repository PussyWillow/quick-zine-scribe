
export interface DarkQuote {
  id: string;
  text: string;
  author: string;
  category: 'existential' | 'creative-rebellion' | 'writing-darkness' | 'midnight-motivation';
  mood: 'gothic' | 'noir' | 'cyberpunk' | 'occult' | 'grunge';
}

export const darkQuotes: DarkQuote[] = [
  // Existential/Gothic
  {
    id: 'poe-1',
    text: 'All that we see or seem is but a dream within a dream.',
    author: 'Edgar Allan Poe',
    category: 'existential',
    mood: 'gothic'
  },
  {
    id: 'lovecraft-1',
    text: 'The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.',
    author: 'H.P. Lovecraft',
    category: 'existential',
    mood: 'occult'
  },
  {
    id: 'nietzsche-1',
    text: 'And if you gaze long into an abyss, the abyss also gazes into you.',
    author: 'Friedrich Nietzsche',
    category: 'existential',
    mood: 'gothic'
  },
  {
    id: 'wilde-1',
    text: 'We are all in the gutter, but some of us are looking at the stars.',
    author: 'Oscar Wilde',
    category: 'existential',
    mood: 'noir'
  },
  
  // Writing from Darkness
  {
    id: 'king-1',
    text: 'Monsters are real, and ghosts are real too. They live inside us, and sometimes, they win.',
    author: 'Stephen King',
    category: 'writing-darkness',
    mood: 'gothic'
  },
  {
    id: 'kafka-1',
    text: 'A book must be the axe for the frozen sea inside us.',
    author: 'Franz Kafka',
    category: 'writing-darkness',
    mood: 'existential'
  },
  {
    id: 'gothic-writer',
    text: 'Write your pain into beauty, your darkness into light.',
    author: 'Anonymous',
    category: 'writing-darkness',
    mood: 'gothic'
  },
  {
    id: 'hemingway-1',
    text: 'Write hard and clear about what hurts.',
    author: 'Ernest Hemingway',
    category: 'writing-darkness',
    mood: 'noir'
  },

  // Creative Rebellion
  {
    id: 'gibson-1',
    text: 'The future is already here — it\'s just not evenly distributed.',
    author: 'William Gibson',
    category: 'creative-rebellion',
    mood: 'cyberpunk'
  },
  {
    id: 'blake-1',
    text: 'The road of excess leads to the palace of wisdom.',
    author: 'William Blake',
    category: 'creative-rebellion',
    mood: 'gothic'
  },
  {
    id: 'rebellion-1',
    text: 'Create dangerously, for people who read dangerously.',
    author: 'Edwidge Danticat',
    category: 'creative-rebellion',
    mood: 'grunge'
  },
  {
    id: 'punk-wisdom',
    text: 'Art should comfort the disturbed and disturb the comfortable.',
    author: 'Cesar A. Cruz',
    category: 'creative-rebellion',
    mood: 'grunge'
  },

  // Midnight Motivation
  {
    id: 'midnight-1',
    text: 'The darkest hour is just before dawn.',
    author: 'Thomas Fuller',
    category: 'midnight-motivation',
    mood: 'gothic'
  },
  {
    id: 'midnight-2',
    text: 'In the depth of winter, I finally learned that there was in me an invincible summer.',
    author: 'Albert Camus',
    category: 'midnight-motivation',
    mood: 'existential'
  },
  {
    id: 'night-writing',
    text: 'Night is the mother of thoughts.',
    author: 'John Florio',
    category: 'midnight-motivation',
    mood: 'noir'
  },
  {
    id: 'dark-creation',
    text: 'Sometimes you need to embrace the darkness to create the light.',
    author: 'Anonymous',
    category: 'midnight-motivation',
    mood: 'gothic'
  },
  {
    id: 'cyber-future',
    text: 'The street finds its own uses for things.',
    author: 'William Gibson',
    category: 'creative-rebellion',
    mood: 'cyberpunk'
  },
  {
    id: 'gothic-beauty',
    text: 'There is a luxury in self-reproach. When we blame ourselves, we feel no one else has a right to blame us.',
    author: 'Oscar Wilde',
    category: 'existential',
    mood: 'gothic'
  }
];

export const getQuotesByMood = (mood: string): DarkQuote[] => {
  return darkQuotes.filter(quote => quote.mood === mood);
};

export const getRandomDarkQuote = (mood?: string): DarkQuote => {
  const filteredQuotes = mood ? getQuotesByMood(mood) : darkQuotes;
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
};
