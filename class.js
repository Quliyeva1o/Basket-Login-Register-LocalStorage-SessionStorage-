export default class Product {
    static id = 0;
    
    constructor(name,imgSrc, costPrice, salePrice, discountPercentage) {
        this.id = Product.id++;
        this.costPrice = costPrice;
        this.name = name;
        this.imgSrc = imgSrc;
        
        if (salePrice > salePrice - (salePrice * discountPercentage / 100) - costPrice) {
            this.salePrice = salePrice;
        } else {
            throw new Error('Sale price cannot be less than cost price with applied discount.');
        }

        if (discountPercentage >= 0 && discountPercentage <= 100) {
            this.discountPercentage = discountPercentage;
        } else {
            throw new Error('Discount percentage should be between 0-100.');
        }
    }

    calcProfit() {
        const profit = this.salePrice - (this.salePrice * this.discountPercentage / 100) - this.costPrice;
        return profit;
    }
}
