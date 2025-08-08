// Elements
const checkoutContainer = document.getElementById('checkout-container');

// run after all content loaded on browser
document.addEventListener('DOMContentLoaded', function () {
    const bags = document.querySelectorAll('.gumm-bag');

    bags.forEach((bag) => {
        bag.addEventListener('click', function () {
            const bagId = bag.dataset.id;
            console.log('Clicked BagId:', bagId);

            updateCart(bagId);
            show(checkoutContainer);
            selectOnlyOne(bags, bag);
        });
    });
});

// selected pack
const selectOnlyOne = (bags, selectedBag) => {
    bags.forEach(bag => bag.classList.remove('selected-box'));
    selectedBag.classList.add('selected-box');
}

// show checkout section
const show = (elem) => {
    elem.classList.remove('hide');
    checkoutContainer && (window.location.href = './index.html#checkout-container');
};

const selectedPackContent = {
    "1-person": {
        imgPath: "images/bags/desktop-bag-1.png",
        title: "1 PERSON",
        regularPrice: 79.99,
        couponApplied: "SAVE40",
        totalPrice: 47.99,
        savedAmount: 32
    },

    "2-people": {
        imgPath: "images/bags/desktop-bag-2.png",
        title: "2 PEOPLE",
        regularPrice: 159.98,
        couponApplied: "SAVE43",
        totalPrice: "91.20",
        savedAmount: 68.78
    },

    "3-people": {
        imgPath: "images/bags/desktop-bag-3.png",
        title: "3 PEOPLE",
        regularPrice: 239.97,
        couponApplied: "SAVE46",
        totalPrice: 129.58,
        savedAmount: 110.39
    },

};

// updating cart according to the selected pack
const updateCart = (packId) => {
    const packData = selectedPackContent[packId];
    if (!packData) return;

    const parentDiv = document.getElementById('cart-section');
    const html = `
        <div id="inner-cart-section">
            <!-- Cart Upper Part -->
            <div class="products-box row align-items-center">
                <div class="bl-l productsimage col-3">
                    <img src="${packData.imgPath}">
                </div>
                <div class="bl-l productdescription col-6">
                    <h4>${packData.title}</h4>
                    <p>30 Day Supply Each</p>
                </div>
                <div class="bl-l productprice col-3">
                    <p>$${packData.totalPrice}</p>
                </div>
            </div>

            <div class="clearfix checkout-items">
                <div class="row clearfix">
                    <div class="col-md-10 col-sm-10 col-9">
                        <p>Regular Price</p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-3">
                        <p class="text-end">$${packData.regularPrice}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-sm-10 col-9">
                        <p>Coupon Applied: <b>${packData.couponApplied}</b></p>
                    </div>
                    <div class="col-md-2 col-sm-2 col-3">
                        <p class="text-end">-$${packData.savedAmount}</p>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-md-10 col-9">
                        <p>Shipping and tax will be settled upon checkout confirmation</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 col-9 my-auto">
                    <h4><b>Total:</b></h4>
                </div>
                <div class="col-md-2 col-3 my-auto">
                    <h4 class="text-right">
                        <b>$${packData.totalPrice}</b>
                    </h4>
                </div>
            </div>
        </div>
    `;

    parentDiv.innerHTML = html;
};
