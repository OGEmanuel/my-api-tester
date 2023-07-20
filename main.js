import axios from 'axios';
import prettyBytes from 'pretty-bytes';

const paramsSelector = document.getElementById('params-selector');
const headerSelector = document.getElementById('header-selector');
const bodySelector = document.getElementById('body-selector');
const paramsTable = document.getElementById('query');
const headersTable = document.getElementById('headers');
const bodyTable = document.getElementById('body');
const addRow = document.querySelectorAll('#add-row');
const methodInput = document.getElementById('method');
const dropdownOptions = document.querySelector('.dropdown-options');
const dropdownContainer = document.querySelector('.dropdown');
const options = dropdownOptions.querySelectorAll('p');
const form = document.querySelector('form');
const urlInput = document.getElementById('url-input');
const queryParams = document.getElementById('query');
const queryParamsContainer = queryParams.querySelector('.data-entry-box');
const headers = document.getElementById('headers');
const headersContainer = headers.querySelector('.data-entry-box');
const body = document.getElementById('body');
const bodyContainer = body.querySelector('.data-entry-box');
const responseBody = document.getElementById('response-body-selector');
const responseHeader = document.getElementById('response-header-selector');
const displayBody = document.getElementById('display-body');
const displayHeader = document.getElementById('display-header');

axios.interceptors.request.use(request => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});

const updateEndTime = response => {
  response.customData = response.customData || {};
  response.customData.time =
    new Date().getTime() - response.config.customData.startTime;
  return response;
};

axios.interceptors.response.use(updateEndTime, e => {
  return Promise.reject(updateEndTime(e.response));
});

const updateResponseEditor = data => {
  const str = JSON.stringify(data, null, 4);

  const obj = JSON.parse(str);

  displayBody.textContent = JSON.stringify(obj, null, 2);
};

const submitHandler = e => {
  e.preventDefault();
  document.querySelector('.animation').style.backgroundColor = '#ff6c37';
  if (urlInput.value === '') {
    urlInput.style.borderColor = '#F79A8E';
    document.querySelector('.animation').style.backgroundColor = 'transparent';
    return;
  }

  axios({
    url: urlInput.value,
    method: methodInput.value,
    params: valuesToObjects(queryParamsContainer),
    headers: valuesToObjects(headersContainer),
    data: valuesToObjects(bodyContainer),
  })
    .catch(e => e)
    .then(response => {
      updateResponseDetails(response);
      updateResponseEditor(response.data);
      updateResponseHeaders(response.headers);
      document.getElementById('response-tab').classList.remove('hidden');
      document.getElementById('response-placeholder').classList.add('hidden');
      document.querySelector('.animation').style.backgroundColor =
        'transparent';
      console.log(response);
    });
};

const updateResponseDetails = response => {
  if (response.status === 200) {
    document.querySelector('#status').textContent = response.status + ' OK';
  } else if (response.status === 404) {
    document.querySelector('#status').textContent =
      response.status + ' Not Found';
  } else {
    document.querySelector('#status').textContent = response.status;
  }

  document.querySelector('#time').textContent =
    response.customData.time + ' ms';
  document.querySelector('#size').textContent = prettyBytes(
    JSON.stringify(response.data).length +
      JSON.stringify(response.headers).length
  );
};

const updateResponseHeaders = headers => {
  displayHeader.innerHTML = '';
  Object.entries(headers).forEach(([key, value]) => {
    const keyElement = document.createElement('div');
    keyElement.textContent = key;
    displayHeader.append(keyElement);
    const valueElement = document.createElement('div');
    valueElement.textContent = value;
    displayHeader.append(valueElement);
  });
};

const valuesToObjects = input => {
  const valuePairs = input.querySelectorAll('.data-entry-input');
  return [...valuePairs].reduce((data, pair) => {
    const key = pair.querySelector('#data-entry-key').value;
    const value = pair.querySelector('#data-entry-value').value;

    if (key === '') return data;
    return { ...data, [key]: value };
  }, {});
};

form.addEventListener('submit', submitHandler);

const changeBorderColorOnBlur = () => {
  urlInput.style.borderColor = '#ffffff21';
};

urlInput.addEventListener('blur', changeBorderColorOnBlur);

const changeBorderColor = () => {
  urlInput.style.borderColor = '#097bed';
};

urlInput.addEventListener('focus', changeBorderColor);

urlInput.addEventListener('keyup', changeBorderColor);

let selectedValue = 'GET';

const changeTextColor = () => {
  // Color changes for input text
  if (methodInput.value === 'GET') {
    methodInput.style.color = '#6bdd9a';
  } else if (methodInput.value === 'POST') {
    methodInput.style.color = '#ffe47e';
  } else if (methodInput.value === 'PUT') {
    methodInput.style.color = '#74aef6';
  } else if (methodInput.value === 'PATCH') {
    methodInput.style.color = '#c0a8e1';
  } else if (methodInput.value === 'DELETE') {
    methodInput.style.color = '#f79a8e';
  } else if (methodInput.value === 'HEAD') {
    methodInput.style.color = '#6bdd9a';
  } else if (methodInput.value === 'OPTIONS') {
    methodInput.style.color = '#f15eb0';
  }
};

methodInput.addEventListener('keyup', changeTextColor);

for (let i = 0; i < options.length; i++) {
  // Loop through dropdown children (p tags and listen for click events on anyone of them)
  const selectMethod = () => {
    selectedValue = options[i].textContent;
    methodInput.value = selectedValue;
    changeTextColor();
    dropdownContainer.style.display = 'none';
  };

  options[i].addEventListener('click', selectMethod);
}

const onFocus = () => {
  dropdownContainer.style.display = 'block';
  // Check if the input value is empty (or just whitespace)
  if (methodInput.value.trim() === '') {
    // Change the value to a default value when focused
    methodInput.value = selectedValue;
    changeTextColor();
  }
};

// Listen for focus event
methodInput.addEventListener('focus', onFocus);

const onBlur = () => {
  // Give time allowance for event to register before display none
  setTimeout(() => {
    dropdownContainer.style.display = 'none';
  }, 200);
  // If the input is left empty when blurred, revert to the original value
  if (methodInput.value.trim() === '') {
    methodInput.value = selectedValue;
    changeTextColor();
  }
};

// Listen for blur event
methodInput.addEventListener('blur', onBlur);

// Delete row function
const deleteAddedRows = newRow => {
  const clicked = newRow.querySelector('#delete-row');

  const deleteOnClick = e => {
    const element = e.target.closest('.data-entry-input');
    element.remove();
  };

  clicked.addEventListener('click', deleteOnClick);
};

// Add New row function
const addNewRow = e => {
  const parent = e.target.closest('.data-entry-box');
  const newRow = document.createElement('div');
  newRow.classList.add('data-entry-input');
  newRow.innerHTML = `
      <input type="text" placeholder="Key" id="data-entry-key" />
      <input type="text" placeholder="Value" id="data-entry-value" />
      <input type="text" placeholder="Description" />
      <button id="delete-row" data-hover="Delete Row">
        <i class="fa-regular fa-trash-can" style="color: #f0f2f5"></i>
      </button>
    `;

  parent.insertBefore(newRow, e.target.parentNode);

  deleteAddedRows(newRow);
};

for (let i = 0; i < addRow.length; i++) {
  addRow[i].addEventListener('click', addNewRow);
}

// Switch to query params tab
const onClickParams = () => {
  paramsSelector.classList.add('selected');
  headerSelector.classList.remove('selected');
  bodySelector.classList.remove('selected');

  paramsTable.classList.remove('hidden');
  headersTable.classList.add('hidden');
  bodyTable.classList.add('hidden');
};

paramsSelector.addEventListener('click', onClickParams);

// Switch to header tab
const onClickHeader = () => {
  paramsSelector.classList.remove('selected');
  headerSelector.classList.add('selected');
  bodySelector.classList.remove('selected');

  paramsTable.classList.add('hidden');
  headersTable.classList.remove('hidden');
  bodyTable.classList.add('hidden');
};

headerSelector.addEventListener('click', onClickHeader);

// Switch to body tab
const onClickBody = () => {
  paramsSelector.classList.remove('selected');
  headerSelector.classList.remove('selected');
  bodySelector.classList.add('selected');

  paramsTable.classList.add('hidden');
  headersTable.classList.add('hidden');
  bodyTable.classList.remove('hidden');
};

bodySelector.addEventListener('click', onClickBody);

const onSwitchtoResponseBodytab = () => {
  responseBody.classList.add('selected');
  responseHeader.classList.remove('selected');

  displayBody.classList.remove('hidden');
  displayHeader.classList.add('hidden');
  displayHeader.classList.remove('grid');
};

responseBody.addEventListener('click', onSwitchtoResponseBodytab);

const onSwitchtoResponseHeadertab = () => {
  responseBody.classList.remove('selected');
  responseHeader.classList.add('selected');

  displayBody.classList.add('hidden');
  displayHeader.classList.remove('hidden');
  displayHeader.classList.add('grid');
};

responseHeader.addEventListener('click', onSwitchtoResponseHeadertab);
