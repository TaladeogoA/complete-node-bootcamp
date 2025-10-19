module.exports = (template, product) => {
    let output = template.replace(/{%PRODUCT-NAME%}/g, product.productName);
    output = output.replace(/{%PRODUCT-IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCT-PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT-ID%}/g, product.id);
    output = output.replace(/{%PRODUCT-FROM%}/g, product.from);
    output = output.replace(/{%PRODUCT-NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCT-QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT-DESCRIPTION%}/g, product.description);

    if (!product.organic) {
        output = output.replace(/{%PRODUCT-NOT-ORGANIC%}/g, 'not-organic');
    }
    return output;
}