let contactDetailsList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactDetailsList = getContactDetailsFromLocalStorage();
    document.querySelector(".contact-count").textContent = contactDetailsList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Fullname</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th>";
    let innerHtml = `${headerHtml}`;
    for (const contact of contactDetailsList) {
        innerHtml = `${innerHtml}
    <tr><td></td>
    <td>${contact._name}</td>
    <td>${contact._address}</td>
    <td>${contact._city}</td>
    <td>${contact._state}</td>
    <td>${contact._zip}</td>
    <td>${contact._phone}</td>
    <td>
    <img id="${contact._id}" onclick="remove(this)" alt="delete"
        src="../assets/icons/delete-black-18dp.svg">
    <img id="${contact._id}" onclick="update(this)" alt="edit"  
        src="../assets/icons/create-black-18dp.svg">
    </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getContactDetailsFromLocalStorage = () => {
    return localStorage.getItem('ContactList') ?
        JSON.parse(localStorage.getItem('ContactList')) : [];
}
const remove = (node) => {
    let contact = contactDetailsList.find(contactobj => contactobj._id == node.id);
    if (!contact)
        return;
    const index = contactDetailsList.map(contactobj => contactobj._id).indexOf(contact._id);
    contactDetailsList.splice(index, 1);
    localStorage.setItem('ContactList', JSON.stringify(contactDetailsList));
    document.querySelector('.contact-count').textContent = contactDetailsList.length;
    createInnerHtml();
}
const update = (node) => {
    let contact = contactDetailsList.find(contactObj => contactObj._id == node.id);
    if (!contact)
        return;
    localStorage.setItem('editEmp', JSON.stringify(contact))
    window.location.replace(site_properties.add_contact_page);
}