
let menu_list = document.getElementById("menu-list");
let orders_list = document.getElementById("orders-list");
let sum = document.getElementById("sum");
let items_count = document.getElementById("items-count");

const renderMenuItem = (product) => {
  return `<div class="food-card" data-product='${JSON.stringify(product)}' onclick="onclickCard(event)">
    <img class="food-img" src="${product.img}" />
    <div>
      <div>${product.title}</div>
      <div>${product.price} som</div>
    </div>
  </div>`;
};

const renderOrderItem = (orderItem) => {
  
  return `<div class="order-item" id="order-item">
      <div>${orderItem.title}</div>
      <div>${orderItem.count} portion</div>
      <div>${orderItem.price} soms</div>           
      
      <div class="out">table<span id="table-number-${orderItem.id}"></span></div>
      <div> 
        <input type="number" class="a-12" placeholder="№   table">
        <button class="btno" onclick="go(${orderItem.id})" data-cancel='${JSON.stringify(
        orderItem
      )}'>OK</button>
      </div>
      <div id="del" onclick="onDelete(event)" data-cancel='${JSON.stringify(
        orderItem)}'>
        <button class="btn-img"></button>
       </div> 
  </div>`;  
};

// document.querySelector("button").onclick = go;

//         function go(orderItemId) {
            
//             let root = document.querySelector('.a-12').value;
//             let input1 = document.createElement('input1')
//             input1 = root
//             document.querySelector(".out").innerHTML = "table" +" " + input1 ;            
//         };

        function go(orderItemId) {
          const tableNumberInput = document.getElementById(`table-input-${orderItemId}`).value;
          const tableNumberSpan = document.getElementById(`table-number-${orderItemId}`);
          tableNumberSpan.innerText = tableNumberInput || 'N/A';
        }

const renderMenuList = (List) => {
  let items = [];
  List.map((item, index) => {
    items.push(renderMenuItem(item));
  });
  menu_list.innerHTML = items.join("");
};

const renderOrders = (order_basket) => {
  let items = [];
  order_basket.map((item, index) => {
    items.push(renderOrderItem(item));
  });
  orders_list.innerHTML = items.join("");
};

const onclickCard = (event) => {
  let card = JSON.parse(event.currentTarget.dataset.product);
  let currentIndex = order_basket.findIndex((el) => el.id == card.id);
  if (currentIndex == -1) {
    order_basket.push({
      ...card,
      count: 1,
    });
  } else {
    order_basket[currentIndex].count++;
    order_basket[currentIndex].price += card.price;
  }
  renderOrders(order_basket);
  onSolve();
  allItems();
  general();
};

const onDelete = (event) => {
  let ord = JSON.parse(event.currentTarget.dataset.cancel);
  let currentIndex = order_basket.findIndex((el) => el.id == ord.id);
  let items_price = menu_items.find((el) => el.id == ord.id).price;
  if (ord.count > 1) {
    order_basket[currentIndex].count--;
    order_basket[currentIndex].price -= items_price;
    renderOrders(order_basket);
  } else {
    order_basket.splice(currentIndex, 1);
    renderOrders(order_basket);
  }
  onSolve();
  allItems();
  general();
};

const onSolve = () => {
  sum = order_basket.reduce((it, { price }) => it + price, 0);
};

const allItems = () => {
  let all = document.getElementById("items-count");
  all.innerHTML = order_basket.reduce((it, { count }) => it + count, 0);
};

const general = () => {
  let summary = document.getElementById("sum");
  summary.innerHTML = order_basket.reduce((it, { price }) => it + price, 0);
};

let btn = document.getElementById("btn");

const clear = (event) => {
  let can = document.getElementById("orders-list");
  let sum = document.getElementById("sum");
  sum.innerHTML = 0;
  let all = document.getElementById("items-count");
  all.innerHTML = 0;
  console.log(can);
  can.remove();
};

btn.addEventListener("click", clear);

renderMenuList(menu_items);

