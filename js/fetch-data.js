const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';


const getData = function (onSuccess, onError) {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => onSuccess(data));
      } else { onError(); }
    })
    .catch(() => { onError(); });
};

export { getData };


