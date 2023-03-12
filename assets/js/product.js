var product_btn = document.getElementById('get_product');
var products_div = document.getElementById('products');

product_btn.addEventListener('click',async (e) => {
    e.preventDefault();
    var res = await fetch('/products/products');
    var data = await res.json();
     for (var i = 0;i<data.length; i++){
        var div_row = document.createElement('div')
        div_row.setAttribute('class','row rounded-5 my-3');
        div_row.style.backgroundColor = "lightgrey";


        var div_col_1 = document.createElement('div');
        div_col_1.setAttribute('class','col-4 pt-3');
        var product_name = document.createElement('p');
        product_name.innerHTML = "Product name: " + data[i]["product_name"];
        var quantity = document.createElement('p');
        quantity.innerHTML = "Quantity: " + data[i]["Quantity"];
        div_col_1.appendChild(product_name);
        div_col_1.appendChild(quantity);
        div_row.appendChild(div_col_1);

        var div_col_2 = document.createElement('div');
        div_col_2.setAttribute('class','col-4 pt-4');

        var update_btn = document.createElement('button');
        update_btn.setAttribute('class','btn btn-success');
        update_btn.setAttribute('id',`${data[i]['_id']}`);
        update_btn.innerHTML= "Update Quantity";

        update_btn.addEventListener('click',async (e) => {
            
            var id = e.target.getAttribute('id');
            var res = await fetch(`/products/${id}/update_quantity/?number=${200}`,{method : 'POST'});
            var data = await res.json();
            console.log(data);
        })


        div_col_2.appendChild(update_btn);

        div_row.appendChild(div_col_2);



        var div_col_3 = document.createElement('div');
        div_col_3.setAttribute('class','col-4 pt-4');

        var delete_btn = document.createElement('button');
        delete_btn.setAttribute('class','btn btn-danger');
        delete_btn.setAttribute('id',`${data[i]['_id']}`);
        delete_btn.innerHTML = "Delete Product";
        delete_btn.addEventListener('click',async (e) => {
            var id = e.target.getAttribute('id');
           var res = await fetch(`/products/${id}`,{method : 'DELETE'});
           var data = await res.json();
           console.log(data);
           window.location.href = '/users/profile';
        })
        div_col_3.appendChild(delete_btn);

        div_row.appendChild(div_col_3);


        products_div.appendChild(div_row);





        
     }
 
    
  
})