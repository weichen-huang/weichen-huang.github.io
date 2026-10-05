import morning from '../../photos/morning.jpg'
import midday from '../../photos/midday.jpg'
import evening from '../../photos/evening.jpg'
import night from '../../photos/night.jpg'
import midnight from '../../photos/midnight.jpg'
import nyc from '../../photos/nyc.jpg'
import nyc2 from '../../photos/nyc2.jpg'
import gatech from '../../photos/gatech.jpg'

export const scenes = [
  {
    id: 'morning',
    copyPosition: { x: 50, y: 61 },
    label: 'Morning',
    image: morning,
    alt: 'Soft morning light over a heather-covered hillside'
  },
  {
    id: 'midday',
    copyPosition: { x: 50, y: 62 },
    label: 'Midday',
    image: midday,
    alt: 'Sunlight through green leaves beneath a clear blue sky'
  },
  {
    id: 'evening',
    copyPosition: { x: 50, y: 63 },
    label: 'Evening',
    image: evening,
    alt: 'A garden path overlooking rolling hills at sunset'
  },
  {
    id: 'night',
    copyPosition: { x: 50, y: 68 },
    label: 'Night',
    image: night,
    alt: 'An orange horizon fading into blue above distant mountains'
  },
  {
    id: 'midnight',
    copyPosition: { x: 50, y: 53 },
    label: 'Midnight',
    image: midnight,
    alt: 'Stars framed by trees in a dark night sky'
  }
]
export const galleryPhotos = [
  { ...scenes[2], caption: 'Italian countryside at WEOI 2025.' },
  { ...scenes[0], caption: 'Lost in the Wicklow Mountains.' },
  { ...scenes[1], caption: 'Guess where this is.' },
  { ...scenes[3], caption: 'Outskirts of Pisa.' },
  { ...scenes[4], caption: "Phones can't take great nighttime photos :(" },
  {
    id: 'nyc',
    caption: 'The Big Apple.',
    label: 'Central Park, New York',
    image: nyc,
    alt: 'New York buildings reflected across a lake in Central Park'
  },
  {
    id: 'nyc2',
    caption: 'Central Park',
    label: 'An afternoon in Central Park',
    image: nyc2,
    alt: 'A stone bridge over a lake surrounded by green trees'
  },
  {
    id: 'gatech',
    caption: 'A buzzing night.',
    label: 'Georgia Tech, after sunset',
    image: gatech,
    alt: 'The moon rising over Georgia Tech beneath a pink sky'
  }
]
