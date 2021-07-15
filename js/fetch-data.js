const API_URL = 'https://23.javascript.pages.academy/keksobooking';

const loadData = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => { onSuccess(data); });
      } else { onError(); }
    })
    .catch(() => { onError(); });
};

const postData = (onSuccess, onError, bodyData) => {
  fetch(API_URL, {
    method: 'POST',
    body: bodyData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => { onError(); });
};

export { loadData, postData };
