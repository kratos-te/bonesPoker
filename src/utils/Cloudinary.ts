const CLOUD_NAME = "bones-poker";
const FOLDER_POKER_CARDS = "poker-cards";

function getCloudinaryUrl(publicId: string, folder: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/${folder}/${publicId}`;
}

export function getCloudinaryPokerCard(publicId: string): string {
  // return getCloudinaryUrl(publicId, FOLDER_POKER_CARDS);
  return `/img/cards/${publicId}.png`;
}
