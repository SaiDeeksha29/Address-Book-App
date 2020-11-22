let contactObj = new Contact();
let isUpdate = false;
window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector(".text-error");
    let nameRegex = RegExp("^([A-Z]{1}[A-Za-z]{2,}[ ]?){1,}$");
    validateEntry(name, nameRegex, textError);

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector(".phone-error");
    let phoneRegex = RegExp("^[+]?([0-9]{2})?[1-9]{1}[0-9]{9}$");
    validateEntry(phone, phoneRegex, phoneError);

    const address = document.querySelector('#address');
    const addressError = document.querySelector(".address-error");
    let addressRegex = RegExp("^([A-Za-z0-9/,-]{3,}[ ]?)+$");
    validateEntry(address, addressRegex, addressError);

    function validateEntry(entry, regex, errorField) {
        entry.addEventListener('input', function() {
            if (regex.test(entry.value) || entry.value.length == 0)
                errorField.textContent = "";
            else
                errorField.textContent = "Invalid entry";
        });
    }
    checkForUpdate();
});
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}
const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}
const setContactObject = () => {
    contactObj._name = getInputValueById('#name');
    contactObj._phone = getInputValueById('#phone');
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
}
const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if (contactList == null) {
        contactList = [];
    }
    if (contactList) {
        let contactData = contactList.find(data => data._id == contactObj._id);
        if (!contactData) {
            contactList.push(createNewContactData());
        } else {
            const index = contactList.map(data => data._id).indexOf(contactData._id);
            contactList.splice(index, 1, createNewContactData(contactData._id));
        }
    } else {
        contactList = [createNewContactData()];
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}
const cancel = () => {
    window.location.replace(site_properties.home_page);
}
const checkForUpdate = () => {
    const contactJSON = localStorage.getItem('editEmp');
    isUpdate = contactJSON ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(contactJSON);
    setForm();
}

const createNewContactData = (id) => {
    let contactData = new Contact();
    if (!id) contactData.id = createNewContactId();
    else contactData.id = id;
    setContactData(contactData);
    return contactData;
}

const createNewContactId = () => {
    let contactID = localStorage.getItem("AddressBookID");
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem("AddressBookID", contactID);
    return contactID;
}

const setContactData = (contactData) => {
    contactData.name = contactObj._name;
    contactData.phone = contactObj._phone;
    contactData.address = contactObj._address;
    contactData.city = contactObj._city;
    contactData.state = contactObj._state;
    contactData.zip = contactObj._zip;
    alert(contactData.toString());
}

const setForm = () => {
    setValue('#name', contactObj._name);
    setValue('#phone', contactObj._phone);
    setValue('#address', contactObj._address);
    setValue('#city', contactObj._city);
    setValue('#state', contactObj._state);
    setValue('#zip', contactObj._zip);
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) item.checked = true;
    });
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

let site_properties = {
    home_page: "../pages/home.html",
    add_contact_page: "../pages/addressBook.html"
};