import { PrismaClient, Cart } from "@prisma/client";
import ICartService from "./ICart.service";
export class CartService implements ICartService {
  private prisma = new PrismaClient();

  async addProductToCart(
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    return await this.prisma.cart.create({
      data: {
        userId: customerId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  async getCartByUserId(customerId: number): Promise<Cart[]> {
    return await this.prisma.cart.findMany({
      where: {
        userId: customerId,
      },
      include: {
        product: true,
      },
    });
  }

  async removeProductFromCart(
    customerId: number,
    productId: number
  ): Promise<boolean> {
    const deleteResult = await this.prisma.cart.deleteMany({
      where: {
        userId: customerId,
        productId: productId,
      },
    });
    return deleteResult.count > 0;
  }

  async updateProductQuantity(
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<Cart | null> {
    const cartItem = await this.prisma.cart.findFirst({
      where: {
        userId: customerId,
        productId: productId,
      },
    });

    if (cartItem) {
      return await this.prisma.cart.update({
        where: {
          cartId: cartItem.cartId,
        },
        data: {
          quantity: quantity,
        },
      });
    }
    return null;
  }

  async clearCart(customerId: number): Promise<boolean> {
    const deleteResult = await this.prisma.cart.deleteMany({
      where: {
        userId: customerId,
      },
    });
    return deleteResult.count > 0;
  }

  async calculateCartTotal(customerId: number): Promise<number> {
    const cartItems = await this.getCartByUserId(customerId);
    return cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
  }
}
