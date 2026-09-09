const urls = [
  'https://www.youtube.com/shorts/wn7i39rNblw?feature=share',
  'https://youtube.com/shorts/wn7i39rNblw',
  'https://youtu.be/wn7i39rNblw',
  'https://www.youtube.com/watch?v=wn7i39rNblw',
  'https://m.youtube.com/shorts/wn7i39rNblw',
  'wn7i39rNblw'
];
const getYouTubeId = (url) => {
  if (!url) return '';
  if (url.length === 11) return url;
  const match = url.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  return (match && match[1]) ? match[1] : url;
};
urls.forEach(u => console.log(u, '->', getYouTubeId(u)));
