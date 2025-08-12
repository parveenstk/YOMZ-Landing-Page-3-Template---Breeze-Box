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
        title: "1 PERSON - (1 BAG)",
        packDesc: "YOMZ Original - 1 Person Pack",
        regularPrice: 79.99,
        couponApplied: "SAVE40",
        totalPrice: 47.99,
        savedAmount: 32
    },

    "2-people": {
        imgPath: "images/bags/desktop-bag-2.png",
        title: "2 PEOPLE - (2 BAGS)",
        packDesc: "YOMZ Original - 2 People Pack",
        regularPrice: 159.98,
        couponApplied: "SAVE43",
        totalPrice: 91.20,
        savedAmount: 68.78
    },

    "3-people": {
        imgPath: "images/bags/desktop-bag-3.png",
        title: "3 PEOPLE - (3 BAGS)",
        packDesc: "YOMZ Original - 3 People Pack",
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
    <div id="inner-cart-section" class="right">
              <div class="right-top">
                <h4 class="your-cart">Your Cart</h4>
                <!-- <p class="color-red">New & Improved 2025 Model</p> -->
                <div class="star-happyCustomer">
                  <img src="images/rating-star.png" alt="rating-star" class="img-fluid">
                  <h5>Join 21,191+ Happy Customers </h5>
                </div>
                <p class="mt-1">${packData.packDesc}</p>
                <div class="products-image">
                  <img src=${packData.imgPath} class="img-fluid">
                </div>
                <div class="item-heading d-flex justify-content-between total-amount">
                  <span>Item</span><span>Amount</span>
                </div>
                <div class="item-heading d-flex justify-content-between mb-2">
                  <span class="exblod">${packData.title}</span><span>$${packData.totalPrice.toFixed(2)}</span>
                  <!-- <span class="exblod">1 PERSON</span><span>$47.99</span> -->
                </div>
                <p>Shipping and tax will be settled upon checkout confirmation</p>
                <div class="checkout-items--subtotal-price d-flex justify-content-between w-100">
                  <div class="checkout-items--subtotal-left">
                    <p class="charge">
                      Coupon Applied:
                      <b class="coupon">${packData.couponApplied}</b>
                    </p>
                  </div>
                  <div class="checkout-items--subtotal-right">
                    <p class="price text-right">
                      <span id="discount-amount" class="org discounted-price exblod">-$${packData.savedAmount.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div class="total-price text-end">
                  <p>Grand Total: <strong>$${packData.totalPrice.toFixed(2)}</strong></p>
                </div>
              </div>
              <div class="col d-flex align-items-start days-section">
                <div class="icon-square flex-shrink-0 me-3">
                  <img src="images/90days.png" class="img-fluid">
                </div>
                <div>
                  <p>
                    90 Day Money-Back Guarantee: Feel safe knowing you are protected with a 90 day guarantee. Simply
                    send the item(s) back in the original packaging to receive a full refund or replacement, less S&H.
                  </p>
                </div>
              </div>
            </div>`

    parentDiv.innerHTML = html;
};
