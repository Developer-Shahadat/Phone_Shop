const loadPhone = async (search,isShowAll) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data 
    // console.log(phones);
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
    console.log(phones);

    // 1. get container to selete tag
    const phoneContainer = document.getElementById('phone-container')

    // delete past search and new add item 
    phoneContainer.textContent = ''

    // show all btn if 12 item this btn ok... else under 12 thn btn hidden
    const showAllBtn = document.getElementById('show-all-btn');
    if( phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    } else{
        showAllBtn.classList.add('hidden');
    }

  

    // display show 12 phone  if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


    phones.forEach( phone =>{
        // console.log(phone);

        // 2. create element a div 
        const phoneCard  = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl mt-4`;

        // 3. add innerHTML or Inner Text
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-end">
            <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary mr-24">Show Details</button>
            </div>
        </div>
        `;

        // 4. append this item
        phoneContainer.appendChild(phoneCard);

    })
    toggleSpinner(false)
}

// search Data
const handleClick  = (isShowAll) => {
    toggleSpinner(true)
   const searchField  = document.getElementById('search-field')
   const searchText = searchField.value;
//    console.log(searchText);
   loadPhone(searchText,isShowAll);
}
// loadPhone();

// Loading Spinner 
const toggleSpinner = (isLoading) =>{
    const spinner = document.getElementById("spinner");
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden')
    }
}

// Show All Item
const handleShowAll = () =>{
    handleClick(true)
}

// Show details modal :
const handleShowDetails = async (id) =>{
    // console.log(id);
    // load signle dynamic data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

// show the modal of btn
const showPhoneDetails = (phoneDetails) =>{
    console.log(phoneDetails);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phoneDetails.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML =`
    <img class = " mx-20 lg:mx-36 mt-3" src="${phoneDetails.image}"/>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">Brand :</span> ${phoneDetails.brand}</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">Release Date :</span> ${phoneDetails.releaseDate || 'coming soon'
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700" >Model :</span> ${phoneDetails.slug}</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">Storage :</span> ${phoneDetails.mainFeatures?.storage
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700" >Chipset :</span> ${phoneDetails.mainFeatures?.chipSet
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700"> Memory :</span> ${phoneDetails.mainFeatures?.memory
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">Display :</span> ${phoneDetails.mainFeatures?.displaySize
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">GPS :</span> ${phoneDetails.others?.GPS || 'No GPS in device available'
    }</p>
    <p class = " mt-3 font-medium"><span class ="font-medium text-purple-700">USB :</span> ${phoneDetails.others?.USB || 'No USB in device available'
    }</p>
    `
    show_details_modal.showModal();
}