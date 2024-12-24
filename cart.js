$(document).ready(function () {
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        $('#cart-count').text(itemCount);
    }

    function displayCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        $('#cart-items').empty();

        if (cart.length === 0) {
            $('#cart-items').html('<p>Your cart is empty.</p>');
            updateCartCount();
            return;
        }

        let table = $('<table></table>');
        let header = `
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        `;
        table.append(header);

        let grandTotal = 0;

        cart.forEach((item, index) => {
            let total = item.price * item.quantity;
            grandTotal += total;

            let row = `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" width="100"></td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </td>
                    <td>$${total.toFixed(2)}</td>
                    <td><button class="remove-item" data-index="${index}">Remove</button></td>
                </tr>
            `;
            table.append(row);
        });

        let totalRow = `
            <tr>
                <td colspan="4" style="text-align: right;"><strong>Grand Total:</strong></td>
                <td colspan="3"><strong>$${grandTotal.toFixed(2)}</strong></td>
            </tr>
        `;
        table.append(totalRow);

        $('#cart-items').append(table);
        updateCartCount();
    }

    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('show');
    }

    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
    }

    $(document).on('click', '.increase-qty', function () {
        let index = $(this).data('index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    });

    $(document).on('click', '.decrease-qty', function () {
        let index = $(this).data('index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        } else {
            showModal('checkout-modal');
            $('#confirm-clear-cart').data('action', {
                type: 'remove',
                index: index
            });
        }
    });

    $(document).on('click', '.remove-item', function () {
        let index = $(this).data('index');
        showModal('custom-modal');
        $('#confirm-clear-cart').data('action', {
            type: 'remove',
            index: index
        });
    });

    $('#clear-cart').click(function () {
        showModal('custom-modal');
        $('#confirm-clear-cart').data('action', {
            type: 'clear'
        });
    });

    $('#confirm-clear-cart').click(function () {
        let action = $(this).data('action');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (action.type === 'remove') {
            cart.splice(action.index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        } else if (action.type === 'clear') {
            localStorage.removeItem('cart');
            displayCart();
        }

        hideModal('custom-modal');
    });

    $('#cancel-clear-cart').click(function () {
        hideModal('custom-modal');
    });

    $('#checkout-cart').click(function () {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Your cart is empty. Add items before checking out.');
            return;
        }
        showModal('checkout-modal');
    });

    $('#confirm-checkout').click(function () {
        localStorage.removeItem('cart');
        displayCart();
        hideModal('checkout-modal');
        showModal('success-modal');
    });

    $('#cancel-checkout').click(function () {
        hideModal('checkout-modal');
    });

    $('#close-success-modal').click(function () {
        hideModal('success-modal');
    });

    displayCart();
});