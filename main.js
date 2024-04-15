import products from "./data.js"

const cardsRow = document.querySelector(".cards-row")
const tBody = document.querySelector("tbody")
const clearAll = document.querySelector(".clear-basket")


products.forEach((product) => {

    cardsRow.innerHTML += rendercards(product)
    delFun()
    basketFun()
});

window.addEventListener("load", () => {
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
})

function rendercards(product) {

    return `
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card">
                <img class="card-img-top" height="240" src="${product.imgSrc}" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title" >${product.name}</h5>
                    <h5>${product.discountPercentage > 0 ? `<del class="text-secondary">${product.salePrice}</del> ${Number(product.salePrice - (product.salePrice * product.discountPercentage / 100)).toFixed(2)}` : product.salePrice}</h5>
                    <button href="#" class="btn btn-outline-primary basket-btn"  data-id=${product.id} data-name=${product.name}>Basket</button>
                    <button href="#"  class="btn btn-outline-danger delete-btn" data-id=${product.id}>Delete</button>
                    <h2>${product.id}</h2>
                </div>
            </div>
        </div>
    `;
}


function delFun() {
    const deleteBtns = document.querySelectorAll(".delete-btn")
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', function (e) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const idx = products.findIndex((x) => x.id == e.target.dataset.id);
                    products.splice(idx, 1);
                    e.target.closest('.col-sm-12').remove();
                    const localBakset = JSON.parse(localStorage.getItem("basket"))
                    localBakset.splice(idx, 1)
                    localStorage.setItem('basket', JSON.stringify(localBakset))
                    renderBasketTableHTML(localBakset, products)
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                    });
                }
            });
        })
    })
}


function basketFun() {
    const basketBtns = document.querySelectorAll('.basket-btn')
    basketBtns.forEach((basketBtn) => {
        basketBtn.addEventListener('click', function (e) {
            increaseFun(e)
        })
    })
}


const basketArr = JSON.parse(localStorage.getItem('basket'))
basketArr && renderBasketTableHTML(basketArr, products)
function renderBasketTableHTML(basketArr, productArr) {
    tBody.innerHTML = ''
    basketArr.forEach(basketItem => {
        const currentProd = productArr.find((x) => x.id == basketItem.id)
        tBody.innerHTML += `
    <tr>
        <th scope="row">${currentProd.id}</th>
        <td>${currentProd.name}</td>
        <td> <img src="${currentProd.imgSrc}" width="100" height="100" alt=""></td>
        <td>${Number((currentProd.salePrice - (currentProd.salePrice * currentProd.discountPercentage / 100)) * basketItem.count).toFixed(2)}</td>
        <td><i>${basketItem.count}</i></td>
        <td><button class="btn btn-outline-warning increase-btn"><i class="fa-solid fa-plus" data-id=${currentProd.id} data-name=${currentProd.name}></i></button></td>
        <td><button class="btn btn-outline-warning decrease-btn"><i class="fa-solid fa-minus" data-id=${currentProd.id} data-name=${currentProd.name}></i></button></td>
        <td><button class="btn btn-outline-danger  "><i class="fa-solid fa-trash del-btn" data-id=${currentProd.id} ></i></button></td>
    </tr>
`
    })

    const increaseBtns = document.querySelectorAll(".fa-plus")
    const decreaseBtns = document.querySelectorAll(".fa-minus")
    const delBtns = document.querySelectorAll(".fa-trash")
    increaseBtns.forEach((increaseBtn) => {
        increaseBtn.addEventListener('click', (e) => {
            increaseFun(e)

        })
    })
    decreaseBtns.forEach((decreaseBtn) => {
        decreaseBtn.addEventListener('click', (e) => {
            decrease(e)
        })
    })

    delBtns.forEach((delBtn)=>{
        delBtn.addEventListener('click',(e)=>{
            deleteItem(e)
        })
    })
}


function increaseFun(e) {
    const localBasketArr = JSON.parse(localStorage.getItem('basket'));
    const currentProdID = e.target.dataset.id
    const foundDublicate = localBasketArr.find((x) => x.id == currentProdID)
    if (foundDublicate) {
        foundDublicate.count++
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${e.target.getAttribute('data-name')} count increased`,
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        localBasketArr.push({ id: e.target.dataset.id, count: 1 });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${e.target.getAttribute('data-name')} added`,
            showConfirmButton: false,
            timer: 1500
        });
    }
    localStorage.setItem('basket', JSON.stringify(localBasketArr))
    renderBasketTableHTML(localBasketArr, products)
}




function decrease(e) {
    const localBasketArr = JSON.parse(localStorage.getItem('basket'));
    const currentProdID = e.target.dataset.id;
    const foundDuplicate = localBasketArr.find((x) => x.id == currentProdID);
    const decreaseButton = e.target.closest('.btn');

    if (foundDuplicate) {
        if (foundDuplicate.count == 1) {
            decreaseButton.disabled = true;
            decreaseButton.classList.remove('btn-outline-warning');
            decreaseButton.classList.add('btn-outline-danger');
        } else {
            foundDuplicate.count--;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${e.target.getAttribute('data-name')} count decreased`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    localStorage.setItem('basket', JSON.stringify(localBasketArr));
    renderBasketTableHTML(localBasketArr, products);
}

function deleteItem(e) {
    const localBasketArr = JSON.parse(localStorage.getItem('basket'));
    const currentProdID = e.target.dataset.id;
    const idx = localBasketArr.findIndex((x) => x.id == currentProdID);
   
        localBasketArr.splice(idx, 1);
        localStorage.setItem('basket', JSON.stringify(localBasketArr));
        renderBasketTableHTML(localBasketArr, products);
    
}

clearAll.addEventListener('click', () => {
    tBody.innerHTML = "";
    localStorage.setItem('basket', JSON.stringify([]));
});



clearAll.addEventListener('click', () => {
    tBody.innerHTML = ""
    localStorage.setItem('basket', JSON.stringify([]))
})

