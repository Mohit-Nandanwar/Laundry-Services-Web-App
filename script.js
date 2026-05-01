let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

function removeItem(name) {
  let index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    total -= cart[index].price;
    cart.splice(index, 1);
    renderCart();
  }
}

function renderCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
  document.getElementById('total').textContent = total;
}

// Booking Form with EmailJS
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Prepare cart details
  let orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join(", ");
  if (orderDetails === "") orderDetails = "No items selected";

  // EmailJS integration
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: name,
    from_email: email,
    phone: phone,
    order: orderDetails,
    total_amount: total
  }, "YOUR_PUBLIC_KEY")
    .then(function (response) {
      document.getElementById('confirmation').textContent =
        "✅ Thank you for booking the service! We will get back to you soon.";
      document.getElementById('bookingForm').reset();
      cart = [];
      total = 0;
      renderCart();
    }, function (error) {
      document.getElementById('confirmation').textContent =
        " Oops! Something went wrong. Please try again.";
    });
});

// Responsive Navbar Toggle
document.getElementById('hamburger').addEventListener('click', function () {
  const navLinks = document.getElementById('navLinks');
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
  }
});
