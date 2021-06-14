jQuery(document).ready(function(){
    //ajax call for the api
    $.ajax({
        url: "https://60b7de68b54b0a0017c02d91.mockapi.io/products",
        type: "GET",
        dataType: "JSON",
        success: function(obj){
            //console.log(obj);
            for(var i=0; i<obj.length; i++){
                $("#products").append("<div class=col-md-4><div class=card>"+
                                    "<img src="+obj[i].product_image+" class=card-img-top alt=desc>"+
                                    "<div class=card-body>"+
                                        "<h2 class=card-title>"+obj[i].product_name+"</h2>"
                                        +"<p>$ "+obj[i].product_price+"</p>"+
                                        "<button class='btn btn-primary mr-4 addToCart' data-product_id='"+obj[i].id+"'>Add to cart</button>"+
                                        "<button class='btn btn-info seeMore' data-product_id='"+obj[i].id+"' data-toggle=modal data-target=#seeMoreModal>See more</button>"
                                    +"</div>"
                                    +"</div></div>")
            }

            var cartItem = false;
            var totalPrice = 0;
            $(".addToCart").click(function(){
                $("#total").empty()
                let id = $(this).attr('data-product_id')
                if(!cartItem){
                    $("#cartList").append(
                        "<div class=row>"+
                            "<div class=col-md-9>"+
                                "<h2>You cart item<h2>"+
                            "</div>"+
                            "<div class=col-md-3>"+
                                "<h3>Total:$ <span id=total></span></h3>"+
                            "</div>"+
                        "</div>"
                    )
                    cartItem = true;
                }


                $.ajax({
                    url: "https://60b7de68b54b0a0017c02d91.mockapi.io/products/"+id,
                    type: "GET",
                    dataType: "JSON",
                    success: function(obj){
                        $("#cartItem").append("<div id='product"+obj.id+"' class=row>"+
                                                "<div class=col-md-3><p>"+obj.product_name+"</p></div>"+
                                                "<div class=col-md-3><p><span class=font-weight-bold>Material: </span>"+obj.product_material+"</p></div>"+
                                                "<div class=col-md-3><p><span class=font-weight-bold>Price: </span>"+obj.product_price+"</p></div>"+
                                                "<div class=col-md-3><button data-product_id='"+obj.id+"' data-product_price='"+obj.product_price+"' class='btn btn-danger removeFromCart'>Remove from cart</button></div>"
                                            +"</div>")
                        totalPrice += parseFloat(obj.product_price)
                        $("#total").append(totalPrice)

                        $(".removeFromCart").click(function(){
                            $("#total").empty()
                           var id = $(this).attr('data-product_id')
                           $('#product'+id).remove() 

                           var price = parseInt($(this).attr('data-product_price'))
                           var total = parseInt($("#total").text())
                           total = total-price 
                           $("#total").append(total) 
                        })
                    }
                })
            })

            //open modal for seeing More details for the product
            $(".seeMore").click(function(){
                $(".modal-title").empty()
                $(".modal-body").empty()
                let id = $(this).attr('data-product_id')
                //console.log(id);
                $.ajax({
                    url: "https://60b7de68b54b0a0017c02d91.mockapi.io/products/"+id,
                    type: "GET",
                    dataType: "JSON",
                    success: function(obj){
                        $(".modal-title").append(obj.product_name)
                        $(".modal-body").append("<p>"+obj.product_description+"</p>"+
                                                "<p><span class=font-weight-bold>Material: </span>"+obj.product_material+"</p>"
                                                )
                    }
                })
            })
        }
    })
})