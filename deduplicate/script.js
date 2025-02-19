const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1' },
  { id: 2, src: 'https://images.unsplash.com/photo-2' },
  { id: 3, src: 'https://images.unsplash.com/photo-3' },
  { id: 4, src: 'https://images.unsplash.com/photo-4' },
  { id: 5, src: 'https://images.unsplash.com/photo-5' },
  { id: 6, src: 'https://images.unsplash.com/photo-6' },
  { id: 7, src: 'https://images.unsplash.com/photo-7' },
  { id: 8, src: 'https://images.unsplash.com/photo-8' },
  { id: 7, src: 'https://images.unsplash.com/photo-9' },
  { id: 7, src: 'https://images.unsplash.com/photo-10' },
  { id: 8, src: 'https://images.unsplash.com/photo-11' },
  { id: 8, src: 'https://images.unsplash.com/photo-12' },
  { id: 8, src: 'https://images.unsplash.com/photo-13' },
  { id: 2, src: 'https://images.unsplash.com/photo-14' },
];

// using new Map() + Map.set()
// function filterDuplicates(photos) {

//   const photoMap = new Map();

//   photos.forEach((photo) => {
//     photoMap.set(photo.id, photo)
//   })

//   const photoMapValues = photoMap.values();

//   const uniquePhotos = Array.from(photoMapValues);

//   return uniquePhotos;
// }

// using new Map() + .map()
function filterDuplicates(photos) {
  const arrayOfKeyValues = photos.map((photo) => [photo.id, photo]);

  const photoMap = new Map(arrayOfKeyValues);

  const photoMapValues = photoMap.values();

  const uniquePhotos = Array.from(photoMapValues);

  return uniquePhotos;
}

// using new Map() 1-liner
const filterDuplicates = (photos) =>
  Array.from(new Map(photos.map((photo) => [photo.id, photo])).values());

const result = filterDuplicates(photos);
console.log(result);
