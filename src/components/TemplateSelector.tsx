
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Template {
  id: string;
  name: string;
  category: 'newsletter' | 'zine' | 'creative';
  title: string;
  subtitle: string;
  content: string;
  suggestedTheme: string;
  description: string;
  isHidden?: boolean;
}

export const templates: Template[] = [
  // Newsletter Templates
  {
    id: 'weekly-update',
    name: 'Weekly Update',
    category: 'newsletter',
    title: 'Weekly Update',
    subtitle: 'Stay informed with our latest news',
    suggestedTheme: 'modern',
    description: 'Perfect for team or community updates',
    content: `# This Week's Highlights

Welcome to our weekly roundup! Here's what's been happening:

## 🎯 Key Achievements
- Major milestone reached in project development
- Successfully launched new feature beta
- Positive feedback from early users

## 📈 By the Numbers
- **50%** increase in user engagement
- **25** new team collaborations
- **100+** pieces of feedback collected

## 🔮 Looking Ahead
Next week we're focusing on:
- Finalizing the new user interface
- Expanding our community outreach
- Planning the next major release

## 💬 Community Spotlight
*"This update format makes it so easy to stay in the loop!"* - Sarah M.

---

Thanks for reading! Share your thoughts and suggestions with us.`
  },
  {
    id: 'company-newsletter',
    name: 'Company Newsletter',
    category: 'newsletter',
    title: 'Company Newsletter',
    subtitle: 'Monthly insights and updates',
    suggestedTheme: 'classic',
    description: 'Professional company communication',
    content: `# Welcome to Our Monthly Newsletter

Dear Team and Stakeholders,

## 🏢 From the Executive Team
This month has been marked by significant growth and exciting developments. We're proud to share our progress and upcoming initiatives.

## 📊 Performance Highlights
### Financial Overview
- Revenue growth: **15%** quarter-over-quarter
- New partnerships: **8** strategic alliances
- Market expansion: **3** new regions

### Team Growth
- New hires: **12** talented professionals
- Training programs: **5** skills development initiatives
- Employee satisfaction: **92%** positive feedback

## 🎯 Strategic Initiatives
### Current Projects
1. **Digital Transformation**: Modernizing our core systems
2. **Sustainability Program**: Reducing environmental impact
3. **Community Engagement**: Strengthening local partnerships

## 🌟 Employee Spotlight
Congratulations to **Maria Rodriguez** from Marketing for her outstanding campaign that increased brand awareness by 40%!

## 📅 Upcoming Events
- **All-Hands Meeting**: March 15th
- **Quarterly Review**: March 30th
- **Team Building Event**: April 5th

---

*Questions or suggestions? Reach out to communications@company.com*`
  },
  {
    id: 'community-digest',
    name: 'Community Digest',
    category: 'newsletter',
    title: 'Community Digest',
    subtitle: 'Connecting our community',
    suggestedTheme: 'nature',
    description: 'Warm and welcoming community updates',
    content: `# Community Digest

Hello wonderful community! 

## 🌱 Growing Together
Our community continues to flourish with new members, exciting projects, and meaningful connections.

## 👥 New Faces
Please welcome our newest community members:
- **Alex Chen** - UX Designer from Seattle
- **Priya Patel** - Content Creator from Austin  
- **Marcus Johnson** - Developer from Denver

## 🎨 Community Creations
### Featured Projects
- **"Urban Gardens"** photography series by Lisa Zhang
- **"Code for Good"** hackathon organized by DevTogether
- **"Mindful Mondays"** wellness series by Sarah Williams

## 📚 Learning & Growth
### Recent Workshops
- Introduction to Digital Art (28 participants)
- Sustainable Living Practices (35 participants)
- Career Transitions Support Group (15 participants)

## 🗓️ Upcoming Events
- **Community Potluck**: Saturday, March 18th
- **Skill Share Session**: Wednesday, March 22nd
- **Volunteer Day**: Saturday, March 25th

## 💝 Community Support
Special thanks to our volunteers who make everything possible. Your dedication creates the warm, supportive environment we all love.

---

*Have news to share? Email us at hello@community.org*`
  },
  {
    id: 'cult-digest',
    name: 'Cult Digest',
    category: 'newsletter',
    title: 'The Inner Circle',
    subtitle: 'Sacred updates for devoted members',
    suggestedTheme: 'gothic',
    description: 'Mysterious community updates with dark humor',
    content: `# The Inner Circle - Monthly Devotion Report

Greetings, Devoted Ones,

## 🔮 This Month's Sacred Achievements
Our collective has achieved unprecedented levels of dedication and enlightenment:

### Ritual Performance Metrics
- **Morning Chanting**: 97% attendance rate (target: 95%)
- **Midnight Gatherings**: 23 successful ceremonies
- **Devotion Scores**: Average 8.7/10 (up from last month's 8.2)

## 👁️ New Initiates
We welcome these fresh souls to our sacred brotherhood:
- **Brother Raven** - Former accountant, excellent at ritual bookkeeping
- **Sister Moonlight** - Brings homemade cookies to every gathering
- **The One They Call Steve** - Really committed, great parking karma

## 📊 Enlightenment Analytics
### Personal Growth Indicators
- **Transcendence levels**: Up 15% across all members
- **Existential dread**: Successfully channeled into productive activities
- **Coffee consumption**: 847 cups (ceremonial grade only)

## 🕯️ Upcoming Sacred Events
- **Full Moon Potluck**: March 20th (bring something to share)
- **Annual Hooded Robe Fitting**: March 25th
- **Casual Friday**: March 29th (business casual robes permitted)

## 💀 The Leader's Corner
*"Remember, devoted ones: the path to enlightenment is paved with good intentions and excellent snacks. Also, please don't forget to pay your monthly dues."*

## 🗓️ Ritual Calendar
- **Monday**: Mysterious humming practice (2-3 PM)
- **Wednesday**: Group meditation and tax preparation
- **Friday**: Sacred pizza night and movie discussion

---

*Questions about your spiritual journey? Contact us at definitely-not-a-cult@email.com*

**P.S.** - Remember, we're definitely not a cult. We're a "spiritual community with very specific membership requirements."`
  },
  // Zine Templates
  {
    id: 'art-culture-zine',
    name: 'Art & Culture Zine',
    category: 'zine',
    title: 'ARTSCENE',
    subtitle: 'Underground culture & creative expressions',
    suggestedTheme: 'cyberpunk',
    description: 'Edgy arts and culture publication',
    content: `# WELCOME TO THE UNDERGROUND

*Where art meets rebellion and creativity knows no boundaries*

## 🎨 FEATURED ARTIST SPOTLIGHT

### Breaking Boundaries: Digital Collage Revolution
This month we dive deep into the world of digital collage artists who are redefining contemporary art through technology and imagination.

**Interview with Maya Thompson**, whose latest series "Fractured Realities" challenges our perception of digital vs. physical art.

*"I don't see technology as separate from traditional art—it's just another brush in my toolkit."*

## 🎭 SCENE REPORT

### Underground Gallery Openings
- **Neon Dreams Collective** - Opening March 15th
- **Raw Space Gallery** - "Unfiltered" exhibition
- **The Warehouse** - Monthly emerging artist showcase

### Music & Performance
The experimental music scene is exploding with new sounds:
- **Synth Rebellion** at Underground Coffee, March 18th
- **Poetry Slam Revolution** every Thursday at The Dive
- **Interactive Art Performance** by Digital Natives Collective

## 📖 CREATIVE WRITING

### "Fragments of Tomorrow"
*A short story by emerging writer Jordan Hayes*

The city hummed with electric energy as she walked through streets painted with holographic graffiti...

## 🗣️ COMMUNITY VOICES

*"This zine gives voice to artists who are creating the culture of tomorrow."* - Alex Rivera, Mixed Media Artist

---

**Submit your work**: artscene.submissions@email.com
**Support local art**: Buy from featured artists`
  },
  {
    id: 'personal-blog',
    name: 'Personal Blog',
    category: 'zine',
    title: 'Life Unfiltered',
    subtitle: 'Thoughts, stories & everything in between',
    suggestedTheme: 'dreamy',
    description: 'Personal storytelling and reflections',
    content: `# Finding Magic in the Ordinary

*Sometimes the most profound moments happen in the quiet spaces between our busy lives.*

## 🌅 Morning Reflections

I've been thinking a lot lately about how we rush through our days, always chasing the next thing, the next achievement, the next milestone. But what if the real magic is happening right now, in this moment?

### The Coffee Shop Revelation
Yesterday, sitting in my favorite corner of the local coffee shop, I watched an elderly man teach his grandson how to fold a paper airplane. The concentration on the boy's face, the patience in the grandfather's voice—it was such a simple moment, yet it contained everything beautiful about human connection.

## 📚 Currently Reading
**"The Art of Noticing"** by Rob Walker has been reshaping how I see the world around me. It's not about grand gestures or dramatic changes—it's about paying attention to the details we usually miss.

### Three Things I Noticed Today:
1. The way sunlight filters through my kitchen window at 3 PM
2. How my neighbor always waters her plants while humming
3. The sound of children laughing in the distance during my evening walk

## 🎨 Creative Projects

I've started a new photography project called "Everyday Extraordinary"—capturing the beauty in mundane moments. Here's what I've learned so far:

- **Slow down**: The best shots happen when you're not rushing
- **Look closer**: There's always another layer to discover
- **Feel first**: Technical skills matter, but emotion matters more

## 💭 Random Thoughts

Sometimes I wonder if we're all just walking around with the same fears and hopes, pretending we're the only ones who feel this way. Maybe vulnerability is actually our superpower.

---

*What magic have you noticed in your ordinary moments? I'd love to hear your stories.*`
  },
  {
    id: 'music-review',
    name: 'Music Review',
    category: 'zine',
    title: 'SOUNDWAVES',
    subtitle: 'Independent music reviews & discoveries',
    suggestedTheme: 'retro',
    description: 'Music criticism and discovery',
    content: `# ALBUM REVIEW: "Midnight Frequencies"

## ⭐⭐⭐⭐⭐ ESSENTIAL LISTENING

**Artist**: The Velvet Circuits  
**Release Date**: March 2024  
**Genre**: Synth-pop / Electronic  
**Label**: Independent

### The Verdict
"Midnight Frequencies" is a masterclass in atmospheric electronic music that manages to be both nostalgic and futuristic.

## 🎵 TRACK-BY-TRACK BREAKDOWN

### 1. "Static Dreams"
Opens with haunting synthesizer arpeggios that immediately transport you to a neon-lit cityscape. The production is crisp without being clinical.

### 2. "Digital Heart" ⭐ STANDOUT TRACK
This is where the album truly comes alive. The interplay between analog warmth and digital precision creates something magical.

### 3. "Frequency Drift"
An instrumental piece that serves as the album's emotional center. Seven minutes of pure sonic exploration.

## 🎧 PRODUCTION NOTES
Producer Sarah Kim has created a sonic landscape that feels both intimate and expansive. The use of vintage analog synthesizers alongside modern digital processing creates a unique texture.

### Technical Highlights:
- **Dynamic Range**: Excellent use of space and silence
- **Mix Balance**: Each element has room to breathe
- **Sound Design**: Creative use of field recordings and found sounds

## 🌟 CULTURAL CONTEXT
This album arrives at a perfect time when electronic music is experiencing a renaissance. The Velvet Circuits join artists like Purity Ring and HEALTH in pushing the boundaries of synth-pop.

## 📈 SIMILAR ARTISTS
If you enjoy this, check out:
- **Chromatics** - "Kill for Love"
- **FM Attack** - "Dreamatic"
- **Power Trip** - "Far Side Virtual"

---

**Final Thoughts**: "Midnight Frequencies" proves that independent electronic music is thriving. Essential for fans of the genre.

**Where to Listen**: Available on all streaming platforms and limited vinyl through the band's website.`
  },
  {
    id: 'travel-journal',
    name: 'Travel Journal',
    category: 'creative',
    title: 'Wanderlust Chronicles',
    subtitle: 'Stories from the road less traveled',
    suggestedTheme: 'nature',
    description: 'Adventure and travel storytelling',
    content: `# Adventures in the Unknown

*Sometimes the best journeys happen when you stop following the map*

## 🗺️ Current Location: Somewhere in Northern Scotland

Day 12 of what was supposed to be a "quick weekend getaway" has turned into something entirely unexpected.

### How I Got Here
It started with a missed train connection in Edinburgh. Instead of waiting 4 hours for the next one, I decided to rent a car and drive north. No destination in mind, just following roads that looked interesting.

### The Cottage Discovery
Three days ago, I stumbled upon a stone cottage that's been converted into the most charming café. The owner, Margaret, makes the best scones I've ever tasted and serves tea in mismatched vintage cups.

*"Travel isn't about the places you go, it's about the people you meet along the way."* - Margaret, while refilling my teacup for the third time.

## 🥾 Today's Adventure

### The Highland Walk
- **Distance**: 8 miles through heather-covered hills
- **Weather**: Dramatic clouds and intermittent sunshine
- **Wildlife spotted**: Red deer, highland cattle, and countless sheep
- **Most memorable moment**: Sharing lunch with a local shepherd who told stories about his grandfather

### Unexpected Discovery
Found ruins of an old castle perched on a cliff overlooking a loch. No tourist signs, no gift shop—just centuries-old stones and the sound of wind through empty windows.

## 📸 Photo Notes
The light here changes every five minutes. Dramatic clouds create constantly shifting shadows across the landscape. My camera can't capture the vastness, but I keep trying.

### Best Shots of the Week:
1. Morning mist rising from the loch
2. An old man feeding gulls at the harbor
3. Wild horses silhouetted against the sunset
4. Margaret's cat sleeping in a sunbeam

## 🍽️ Local Flavors

### Must-Try Discoveries:
- **Cullen Skink**: A hearty smoked haddock soup
- **Tablet**: Scottish confection that's like fudge's sweeter cousin
- **Local whisky**: Each distillery tells the story of its region
- **Fresh seafood**: Straight from boat to plate

## 🤔 Reflections

Travel has taught me that the best adventures can't be planned. They happen in the spaces between destinations, in conversations with strangers, in moments when you stop trying to control the journey and let it unfold.

### Lessons from the Road:
- Say yes to invitations from locals
- Always pack layers (Scottish weather is wonderfully unpredictable)
- The most beautiful places often don't have names on maps
- Kindness is a universal language

## 📅 What's Next?

Margaret mentioned a music festival happening in a nearby village this weekend. Traditional Scottish music, local food, and dancing until dawn. 

My original itinerary would have had me back in London by now, but sometimes the best plan is no plan at all.

---

*"Not all those who wander are lost."* - J.R.R. Tolkien

**Next Update**: From wherever the road takes me next!`
  },
  {
    id: 'time-travel-journal',
    name: 'Time Travel Journal',
    category: 'creative',
    title: 'Temporal Chronicles',
    subtitle: 'Adventures across space and time',
    suggestedTheme: 'cyberpunk',
    description: 'Whimsical sci-fi time travel adventures',
    isHidden: true,
    content: `# Temporal Chronicles: Entry #847

*Note to future self: Stop leaving the time machine keys in Ancient Rome*

## ⏰ Current Timeline: Victorian London, 1887

Day 23 of my "quick weekend trip" to see the first Jack the Ripper headlines. The temporal displacement device is acting up again—I think I got some steam-punk debris in the flux capacitor.

### How I Got Stuck Here
It all started when I decided to witness the construction of the Eiffel Tower (1889). Took a wrong turn at the Renaissance, ended up in Medieval plague times, overcorrected to avoid the Black Death, and landed smack in the middle of foggy London.

### Victorian Observations
- **Coffee**: Terrible. They haven't invented good coffee yet.
- **Fashion**: Impractical but dramatic. I'm rocking a top hat.
- **Technology**: Steam everything. I fit right in with my malfunctioning time machine.
- **Entertainment**: Went to see Oscar Wilde perform. He's funnier in person.

*"Time travel is like visiting relatives—you never stay as long as planned."* - Me, probably

## 🕰️ Today's Temporal Adventure

### The Great Mistake of 1887
- **Accidentally introduced**: The concept of "selfies" to Victorian photographers
- **Weather**: Perpetually foggy (as expected)
- **Local spotted**: Sherlock Holmes (maybe?) discussing something suspicious with Watson
- **Most embarrassing moment**: Asked for WiFi password at a tavern

### Unexpected Historical Discovery
Turns out Charles Dickens had a secret time travel journal too. Found it in a used bookshop. Apparently, he got the idea for "A Christmas Carol" after accidentally visiting three different timelines in one night.

## 📸 Temporal Photo Log
Note: Victorian cameras take forever, but the sepia tone is authentic:

### Best Shots of This Century:
1. Street lamps being lit by hand at dusk
2. Horse-drawn carriages in morning fog
3. A very confused Victorian gentleman examining my digital watch
4. Me in a top hat looking appropriately confused

## 🍽️ Period-Appropriate Cuisine

### What I've Survived So Far:
- **Mutton**: Everything is mutton
- **Ale**: Safer than the water
- **Bread**: Dense enough to use as building material
- **Tea**: Actually quite good, though they're very particular about it

## 🤔 Temporal Reflections

Time travel has taught me that people are fundamentally the same across eras—we all worry about the future, complain about the present, and romanticize the past. The irony is not lost on me.

### Lessons Across Time:
- Pack multiple types of currency
- Learn basic medical knowledge (antibiotics haven't been invented yet)
- Always bring a universal translator (still working on this one)
- The past smells worse than you think

## 📅 What's Next in the Timeline?

Planning to hop forward to the 1920s—jazz age, prohibition, and the beginning of good cocktails. If I can get the temporal displacement device working properly.

Found a note from my future self: "Don't trust the guy with the monocle in 1923." Not sure what that means yet, but I'm taking notes.

---

*"Time isn't a river—it's more like a very confused pretzel."* - Time Traveler's Handbook, Chapter 47

**Next Temporal Update**: From whenever/wherever I end up next!

**P.S.** - If you're reading this in the future (which you are, unless you're also time traveling), remember: don't change anything major. The butterfly effect is real, and I already accidentally invented the high-five 200 years too early.`
  },
  // Creative Templates
  {
    id: 'poetry-collection',
    name: 'Poetry Collection',
    category: 'creative',
    title: 'Fragments of Light',
    subtitle: 'A collection of moments captured in verse',
    suggestedTheme: 'minimalist',
    description: 'Elegant poetry presentation',
    content: `# Fragments of Light
*A collection of moments captured in verse*

---

## Morning Coffee

Steam rises from porcelain,
carrying whispered promises
of a day not yet written.

I hold warmth between my palms,
watching sunlight paint shadows
across yesterday's newspaper.

Some rituals are small prayers—
this cup, this quiet moment,
this breath before the world wakes.

---

## City Rain

Umbrellas bloom like flowers
on sidewalks slick with silver.
Each drop a tiny percussion
in the symphony of rush hour.

Windows fog with human breath,
strangers becoming silhouettes
moving through watercolor streets.

I love how rain makes the city
soft around the edges,
washing away the sharp lines
of our separate lives.

---

## Late Night Thoughts

2 AM and the house sighs
settling into its bones.
I write by lamplight,
chasing words that flutter
like moths against the glass.

Some thoughts only surface
in the deep quiet hours
when the world stops performing
and shows its tender face.

---

## Garden Meditation

Dirt under fingernails,
seeds placed like small hopes
in earth that promises
nothing but possibility.

I am learning patience
from tomatoes and sunflowers,
how growth happens quietly,
roots reaching down before
anything reaches up.

---

## Evening Walk

The dog and I trace familiar paths
while streetlights flicker on
like someone lighting candles
across the neighborhood.

In windows we pass:
families gathering for dinner,
children doing homework,
someone washing dishes
in warm yellow light.

Each house holds a story
I'll never know completely,
and somehow that makes
the world feel both
mysterious and connected.

---

*"Poetry is not a luxury. It is a vital necessity of our existence."* - Audre Lorde`
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [clockClickCount, setClockClickCount] = useState(0);
  const [showTimeTravelJournal, setShowTimeTravelJournal] = useState(false);

  // Reset click count after 2 seconds of inactivity
  useEffect(() => {
    if (clockClickCount > 0) {
      const timer = setTimeout(() => {
        setClockClickCount(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [clockClickCount]);

  const handleClockClick = () => {
    const newCount = clockClickCount + 1;
    setClockClickCount(newCount);
    
    if (newCount >= 3) {
      setShowTimeTravelJournal(true);
      setClockClickCount(0);
    }
  };

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'newsletter', name: 'Newsletter' },
    { id: 'zine', name: 'Zine' },
    { id: 'creative', name: 'Creative' }
  ];

  const allTemplates = showTimeTravelJournal 
    ? templates 
    : templates.filter(t => !t.isHidden);

  const filteredTemplates = selectedCategory === 'all' 
    ? allTemplates 
    : allTemplates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-600">
          <FileText className="inline w-4 h-4 mr-1" />
          Templates
        </label>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const randomTemplate = allTemplates[Math.floor(Math.random() * allTemplates.length)];
            onSelectTemplate(randomTemplate);
          }}
          className="text-xs"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Random
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1 flex-wrap">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Template List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-md p-3 hover:border-blue-300 cursor-pointer transition-colors group"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {template.name}
                  </h4>
                  {template.id === 'travel-journal' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClockClick();
                      }}
                      className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                      title="⏰"
                    >
                      <Clock className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
                    {template.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    Suggested: {template.suggestedTheme}
                  </span>
                </div>
              </div>
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-2 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
