// appending Chile Function 
// appending Chile Function 
function chileAppend(array, parent) {
    parent.innerHTML = '';
    array.forEach(data => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'mx-auto', 'mb-5', 'border-1');
        // console.log(data);
        // Showing data in card 
        cardDiv.innerHTML = `
            <div class="card-body">
                <figure><img class="w-fit" src="${data.image}"/></figure>
                  <h2 class="card-title font-bold">Features</h2>
                  <ul id="feature-list-container">
                  <li>${data.features[0] ?'1. ' + data.features[0] : ''}</li>
                  <li>${data.features[1] ?'2. ' + data.features[1] : ''}</li>
                  <li>${data.features[2] ?'3. ' + data.features[2] : ''}</li>
                  <li>${data.features[3] ?'4. ' + data.features[3] : ''}</li>
                  <li>${data.features[4] ?'5. ' + data.features[4] : ''}</li>
                  </ul>
                  <hr class="border-1 border-black">
                  <h2 class="font-bold text-xl">${data.name}</h2>
                  <div class="flex justify-between items-center">
                    <p>${data.published_in}</p>
                    <label for="my-modal-5"><i onclick="loadModalData('${data.id}')" class="fa-solid fa-arrow-right text-[#EB5757] bg-[#f6d5d5] rounded-full p-4"></i></label>
                  </div>
            </div>
        `;
        parent.appendChild(cardDiv);
        
        toggleSpinner(false);
    });
};