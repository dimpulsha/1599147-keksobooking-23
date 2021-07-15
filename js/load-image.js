const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ROOM_IMAGE_WIDTH = '70';
const ROOM_IMAGE_HEIGHT = '70';
const ROOM_IMAGE_ALT_TEXT = 'Фотография жилья';


const avatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const roomImageContainer = document.querySelector('.ad-form__photo-container');
const roomImagesInput = roomImageContainer.querySelector('#images');
const roomImagesDivTemplate = roomImageContainer.querySelector('.ad-form__photo');

const checkFileName = (file) => {
  const fileName = file.name.toLowerCase();
  return (FILE_TYPES.some((it) => fileName.endsWith(it)));
};

const createRoomPreviewImage = () => {
  const imageElement = document.createElement('img');
  imageElement.setAttribute('width', ROOM_IMAGE_WIDTH);
  imageElement.setAttribute('height', ROOM_IMAGE_HEIGHT);
  imageElement.setAttribute('alt', ROOM_IMAGE_ALT_TEXT);
  return imageElement;
};

avatar.addEventListener('change', () => {
  const avatarFile = avatar.files[0];
  if (checkFileName(avatarFile)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.setAttribute('src', reader.result);
    });
    reader.readAsDataURL(avatarFile);
  }
});

roomImagesInput.addEventListener('change', () => {
  const roomImageFile = roomImagesInput.files[0];

  if (checkFileName(roomImageFile)) {
    const roomImageElement = createRoomPreviewImage();
    const imageDiv = roomImagesDivTemplate.cloneNode(true);
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      roomImageElement.setAttribute('src', reader.result);
      imageDiv.appendChild(roomImageElement);
      roomImageContainer.insertBefore(imageDiv, roomImagesDivTemplate);
    });
    reader.readAsDataURL(roomImageFile);

  }
});
